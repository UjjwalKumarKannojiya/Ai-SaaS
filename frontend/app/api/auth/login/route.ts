import { setAuthCookie } from "@/lib/auth";
import { loginWithStrapi, registerWithStrapi } from "@/lib/strapi";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try {
        const body = await request.json();

        const auth = await loginWithStrapi(
          String(body.identifier ?? ""),
          String(body.password ?? "")
        );
        await setAuthCookie(auth.jwt)

        return NextResponse.json({user:auth.user})
    } catch (error) {
        return NextResponse.json({error:error} , {status:500})
    }
}