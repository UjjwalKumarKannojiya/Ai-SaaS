import React from "react";
import {MessageCircle} from "lucide-react"
import WorkSpaceAIChat from "@/components/workspace/workspace-ai-chat";
function ChatPage() {
  return (
    <WorkSpaceAIChat
      mode="chat"
      title="Chat"
      badge="Powered by Gemini 2.5 Flash"
      placeholder="Send a message…"
      emptyState={{
        icon: (
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageCircle className="size-6" />
          </span>
        ),
        title: "Start a conversation",
        description: "Ask anything — answers stream in as the model thinks.",
      }}
    />
  );
};

export default ChatPage;
