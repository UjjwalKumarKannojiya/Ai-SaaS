import { getAuthToken, getCurrentUser } from "@/lib/auth";
import { listVideoRecords } from "@/lib/strapi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jwt = await getAuthToken();
    const user = await getCurrentUser();

    if (!jwt || !user) {
      return Response.json(
        { error: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const videos = await listVideoRecords(jwt);

    return Response.json({ videos });
  } catch (error) {
    console.error("Error loading videos:", error);

    return Response.json(
      {
        error: "Failed to load videos",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return Response.json(
    { error: "Use /api/videos/generate to generate videos." },
    { status: 405 }
  );
}
