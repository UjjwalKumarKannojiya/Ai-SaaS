import { GoogleGenAI } from "@google/genai";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { getAuthToken, getCurrentUser } from "@/lib/auth";
import { createVideoRecord, StrapiError } from "@/lib/strapi";

export const maxDuration = 300;

const VIDEO_MODEL = "veo-3.1-generate-preview"

type GoogleVideoAspectRatio = "16:9" | "9:16";
type GoogleVideoDuration = 4 | 6 | 8;

const ASPECT_RATIOS: GoogleVideoAspectRatio[] = ["16:9", "9:16"];
const DURATIONS: GoogleVideoDuration[] = [4, 6, 8];
const POLL_INTERVAL_MS = 10_000;
const MAX_POLLS = 25;

function parseAspectRatio(value: unknown): GoogleVideoAspectRatio {
  if (typeof value === "string" && ASPECT_RATIOS.includes(value as GoogleVideoAspectRatio)) {
    return value as GoogleVideoAspectRatio;
  }
  return "16:9";
}

function parseDuration(value: unknown): GoogleVideoDuration {
  if (typeof value === "number" && DURATIONS.includes(value as GoogleVideoDuration)) {
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
  const fileName = `${crypto.randomUUID()}.mp4`;
  const publicPath = `/generated-videos/${fileName}`;
  const outputDir = join(process.cwd(), "public", "generated-videos");
  const outputPath = join(outputDir, fileName);

  await mkdir(outputDir, { recursive: true });
  await ai.files.download({ file, downloadPath: outputPath });

  return publicPath;
}


export async function POST(request: Request) {
    const jwt = await getAuthToken();
    const user = await getCurrentUser();

    if(!jwt || !user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();

    const aspectRatio = parseAspectRatio(body.aspectRatio);
    const duration = parseDuration(body.duration);

    try {
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500 });
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
        });

        let operation = await ai.models.generateVideos({
            model: VIDEO_MODEL,
            prompt: body.prompt,
            config: {
                numberOfVideos: 1,
                aspectRatio,
                durationSeconds: duration,
            }
        });

        for(let poll = 0; !operation.done && poll < MAX_POLLS; poll++) {
            await delay(POLL_INTERVAL_MS);
            operation = await ai.operations.getVideosOperation({operation});
        }

        if(!operation.done) {
            return new Response(JSON.stringify({ error: "Video generation timed out" }), { status: 500 });
        }

        if(operation.error) {
            return new Response(JSON.stringify({ error: "Video generation failed", details: operation.error }), { status: 500 });
        }

        const generatedVideo = operation.response?.generatedVideos?.[0].video;

        if(!generatedVideo) {
            return new Response(JSON.stringify({ error: "No video generated" }), { status: 500 });
        }

        const videoUrl = await saveGeneratedVideo(ai, generatedVideo);
        const record = await createVideoRecord(jwt, {
            prompt: body.prompt,
            videoUrl
        });

        return Response.json({
            model: VIDEO_MODEL,
            documentId: record.documentId,
            prompt: record.prompt,
            videoUrl: record.videoUrl,
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return new Response(JSON.stringify({ error: "Failed to generate video", details: errorMessage }), { status: 500 });
    }
}
