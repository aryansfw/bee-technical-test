import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  cookieStore.set("token", data.token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
    sameSite: "lax",
    secure: true,
  });

  return NextResponse.json(data, { status: res.status });
}
