import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getAuthToken, getCurrentUser } from "@/lib/auth";

import {
  createConversation,
  createMessage,
  getConversation,
  StrapiError,
} from "@/lib/strapi";

const MODEL_ID = "gemini-2.5-flash";
const TITLE_MAX_LENGTH = 60;

const SYSTEM_PROMPTS = {
  chat: "You are a helpful, consice AI Assistant, Reply in plain markdown.",
  code: `You are an expert software engineer and pair programmer. Help with code, debugging, architecture, and tooling.
- Prefer correct, modern practices; name things clearly.
- Use fenced code blocks with a language tag (e.g. \`\`\`ts) for all code.
- Keep explanations concise; expand when the user asks for depth.
- Reply in plain markdown.`,
} as const;

type ChatMode = keyof typeof SYSTEM_PROMPTS;

type ChatRequestBody = {
  messages?: UIMessage[];
  conversationId?: string;
  mode?: ChatMode;
};

function getMessageText(message: UIMessage | undefined) {
  if (!message) return "";
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => ("text" in part ? part.text : ""))
    .join("")
    .trim();
}

export async function POST(request: Request) {
  console.log("[chat] POST request received");

  const jwt = await getAuthToken();
  const user = await getCurrentUser();

  console.log("[chat] Auth check - JWT:", jwt ? "present" : "missing", "User:", user?.id || "missing");

  if (!jwt || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch (error) {
    console.error("[chat] JSON parse error:", error);
    return Response.json({ error: "Invalid json body" }, { status: 400 });
  }

  const mode: ChatMode =
    body.mode === "code" || body.mode === "chat" ? body.mode : "chat";
  const systemPrompt = SYSTEM_PROMPTS[mode];

  const messages = body.messages;

  if (!messages || messages.length === 0) {
    return Response.json({ error: "messages is required." }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];

  if (!lastMessage) {
    return Response.json({ error: "messages is required." }, { status: 400 });
  }

  if (lastMessage.role !== "user") {
    return Response.json(
      { error: "The last message must be from the user." },
      { status: 400 }
    );
  }

  const userText = getMessageText(lastMessage);

  if (!userText) {
    return Response.json({ error: "User message cannot be empty." }, { status: 400 });
  }

  let conversationDocumentId = body.conversationId;

  try {
    console.log("[chat] Conversation ID from request:", conversationDocumentId || "none");

    if (!conversationDocumentId) {
      // No conversation ID provided - create a new conversation
      console.log("[chat] Creating new conversation with title:", userText.slice(0, TITLE_MAX_LENGTH));
      const created = await createConversation(jwt, {
        title: userText.slice(0, TITLE_MAX_LENGTH) || "Untitled",
      });
      conversationDocumentId = created.documentId;
      console.log("[chat] Created conversation:", conversationDocumentId);
    } else {
      // Conversation ID provided - verify it exists
      console.log("[chat] Verifying existing conversation:", conversationDocumentId);
      const existing = await getConversation(jwt, conversationDocumentId);
      if (!existing) {
        console.warn("[chat] Conversation not found:", conversationDocumentId);
        return Response.json(
          { error: "Conversation not found." },
          { status: 404 }
        );
      }
      console.log("[chat] Verified conversation exists");
    }

    // Always save the user message
    console.log("[chat] Saving user message");
    await createMessage(jwt, {
      content: userText,
      role: "user",
      conversationDocumentId,
    });
    console.log("[chat] User message saved");
  } catch (error) {
    console.error("[chat] Error during conversation/message setup:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process conversation";
    return Response.json({ error: errorMessage }, { status: 500 });
  }

  console.log("[chat] Starting stream with conversation:", conversationDocumentId);

  const result = streamText({
    model: google(MODEL_ID),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  result.consumeStream();

  const finalConversationDocumentId = conversationDocumentId;

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    headers: {
      "x-conversation-id": finalConversationDocumentId || "",
    },
    messageMetadata: ({ part }) => {
      if (part.type === "start") {
        console.log("[chat] Message metadata attached for conversation:", finalConversationDocumentId);
        return { conversationId: finalConversationDocumentId };
      }
    },
    onFinish: async ({ responseMessage }) => {
      const assistantText = getMessageText(responseMessage);
      if (!assistantText) {
        console.log("[chat] Empty assistant response, skipping save");
        return;
      }

      try {
        console.log("[chat] Saving assistant message");
        await createMessage(jwt, {
          content: assistantText,
          role: "assistant",
          conversationDocumentId: finalConversationDocumentId!,
        });
        console.log("[chat] Assistant message saved");
      } catch (error) {
        console.error("[chat] Failed to persist assistant message:", error);
      }
    },
  });
}