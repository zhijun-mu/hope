import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/utils/redis";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email } = await request.json();

  // 由于redis.get方法返回的是Promise<string | null>，因此需要使用await关键字来等待Promise的结果
  const code = await redis.get(`login-email-captcha:${email}`);

  return NextResponse.json({ captcha: code });
}
