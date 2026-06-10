import { setAuthCookie } from "@/lib/auth";
import { loginWithStrapi, StrapiError } from "@/lib/strapi";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body?.identifier || !body?.password) {
      return NextResponse.json(
        { error: "Email/username and password are required" },
        { status: 400 }
      );
    }

    const auth = await loginWithStrapi(
      String(body.identifier),
      String(body.password)
    );

    await setAuthCookie(auth.jwt);

    return NextResponse.json({ user: auth.user });
  } catch (error) {
    console.error("Login failed:", error);

    if (error instanceof StrapiError) {
      return NextResponse.json(
        {
          error: error.message,
          details: error.details,
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        error: "Login failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
