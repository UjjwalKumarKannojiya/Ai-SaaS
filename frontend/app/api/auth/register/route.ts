import { setAuthCookie } from "@/lib/auth";
import { registerWithStrapi, StrapiError } from "@/lib/strapi";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body?.username || !body?.email || !body?.password) {
      return NextResponse.json(
        { error: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    const auth = await registerWithStrapi(
      String(body.username),
      String(body.email),
      String(body.password)
    );

    await setAuthCookie(auth.jwt);

    return NextResponse.json({ user: auth.user });
  } catch (error) {
    console.error("Register failed:", error);

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
        error: "Registration failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
