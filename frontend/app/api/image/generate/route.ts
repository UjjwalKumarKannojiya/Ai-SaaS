import { InferenceClient } from "@huggingface/inference";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

import { getAuthToken, getCurrentUser } from "@/lib/auth";
import { createImageRecord } from "@/lib/strapi";

export const runtime = "nodejs";

const IMAGE_MODEL = "black-forest-labs/FLUX.1-schnell";

async function saveGeneratedImage(input: Blob | string) {
    const fileName = `${randomUUID()}.png`;
    const publicPath = `/generated-images/${fileName}`;
    const outputDir = join(process.cwd(), "public", "generated-images");

    await mkdir(outputDir, { recursive: true });

    const outputPath = join(outputDir, fileName);

    if (typeof input === "string") {
        const base64 = input.includes(",") ? input.split(",")[1] : input;
        await writeFile(outputPath, Buffer.from(base64, "base64"));
    } else {
        const arrayBuffer = await input.arrayBuffer();
        await writeFile(outputPath, Buffer.from(arrayBuffer));
    }

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
        const prompt = body?.prompt;

        if (!prompt || typeof prompt !== "string") {
            return Response.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.HUGGINGFACE_API_KEY;

        if (!apiKey) {
            return Response.json(
                { error: "HUGGINGFACE_API_KEY is not configured in .env.local" },
                { status: 500 }
            );
        }

        const client = new InferenceClient(apiKey);

        const result = await client.textToImage({
            model: IMAGE_MODEL,
            inputs: prompt,
            parameters: {
                num_inference_steps: 4,
            },
        });

        const imageUrl = await saveGeneratedImage(result as Blob | string);

        const record = await createImageRecord(jwt, {
            prompt,
            imageUrl,
        });

        return Response.json({
            success: true,
            model: IMAGE_MODEL,
            documentId: record.documentId,
            prompt: record.prompt,
            imageUrl: record.imageUrl,
        });
    } catch (error) {
        console.error("Error generating image:", error);

        return Response.json(
            {
                error: "Failed to generate image",
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}