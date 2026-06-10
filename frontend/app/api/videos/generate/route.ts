import { GoogleGenAI } from "@google/genai";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

import { getAuthToken, getCurrentUser } from "@/lib/auth";
import { createVideoRecord } from "@/lib/strapi";

export const runtime = "nodejs";
export const maxDuration = 300;

const VIDEO_MODEL = "veo-2.0-generate-001";

type GoogleVideoAspectRatio = "16:9" | "9:16";
type GoogleVideoDuration = 4 | 6 | 8;

const ASPECT_RATIOS: GoogleVideoAspectRatio[] = ["16:9", "9:16"];
const DURATIONS: GoogleVideoDuration[] = [4, 6, 8];

const POLL_INTERVAL_MS = 10_000;
const MAX_POLLS = 25;

function parseAspectRatio(value: unknown): GoogleVideoAspectRatio {
  if (
    typeof value === "string" &&
    ASPECT_RATIOS.includes(value as GoogleVideoAspectRatio)
  ) {
    return value as GoogleVideoAspectRatio;
  }

  return "16:9";
}

function parseDuration(value: unknown): GoogleVideoDuration {
  if (
    typeof value === "number" &&
    DURATIONS.includes(value as GoogleVideoDuration)
  ) {
    return value as GoogleVideoDuration;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (DURATIONS.includes(parsed as GoogleVideoDuration)) {
      return parsed as GoogleVideoDuration;
    }
  }

  return 4;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function saveGeneratedVideo(
  ai: GoogleGenAI,
  file: Parameters<GoogleGenAI["files"]["download"]>[0]["file"]
) {
  const fileName = `${randomUUID()}.mp4`;
  const publicPath = `/generated-videos/${fileName}`;

  const outputDir = join(process.cwd(), "public", "generated-videos");
  const outputPath = join(outputDir, fileName);

  await mkdir(outputDir, { recursive: true });

  await ai.files.download({
    file,
    downloadPath: outputPath,
  });

  return publicPath;
}

export async function POST(request: Request) {
  try {
    const jwt = await getAuthToken();
    const user = await getCurrentUser();

    if (!jwt || !user) {
      return Response.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body?.prompt || typeof body.prompt !== "string") {
      return Response.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error: "GOOGLE_GENERATIVE_AI_API_KEY is not configured in .env.local",
        },
        { status: 500 }
      );
    }

    const aspectRatio = parseAspectRatio(body.aspectRatio);
    const duration = parseDuration(body.duration);

    const ai = new GoogleGenAI({
      apiKey,
    });

    let operation = await ai.models.generateVideos({
      model: VIDEO_MODEL,
      prompt: body.prompt,
      config: {
        numberOfVideos: 1,
        aspectRatio,
        durationSeconds: duration,
      },
    });

    for (let poll = 0; !operation.done && poll < MAX_POLLS; poll++) {
      await delay(POLL_INTERVAL_MS);
      operation = await ai.operations.getVideosOperation({ operation });
    }

    if (!operation.done) {
      return Response.json(
        { error: "Video generation timed out. Please try again." },
        { status: 504 }
      );
    }

    if (operation.error) {
      return Response.json(
        {
          error: "Video generation failed",
          details: operation.error,
        },
        { status: 500 }
      );
    }

    const generatedVideo = operation.response?.generatedVideos?.[0]?.video;

    if (!generatedVideo) {
      return Response.json(
        { error: "No video returned from Google Veo." },
        { status: 500 }
      );
    }

    const videoUrl = await saveGeneratedVideo(ai, generatedVideo);

    const record = await createVideoRecord(jwt, {
      prompt: body.prompt,
      videoUrl,
    });

    return Response.json({
      success: true,
      model: VIDEO_MODEL,
      documentId: record.documentId,
      prompt: record.prompt,
      videoUrl: record.videoUrl,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    console.error("Error generating video:", errorMessage);

    const isBillingError =
      errorMessage.toLowerCase().includes("billing") ||
      errorMessage.includes("FAILED_PRECONDITION") ||
      errorMessage.includes("GCP billing");

    if (isBillingError) {
      return Response.json(
        {
          error: "Google Veo requires Google Cloud billing.",
          details:
            "The model veo-2.0-generate-001 cannot generate videos until GCP billing is enabled for your Google account/project.",
        },
        { status: 402 }
      );
    }

    return Response.json(
      {
        error: "Failed to generate video",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
