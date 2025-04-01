import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/utils/redis";
import { nodemailer } from "@/utils/nodemailer";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "邮箱不能为空" }, { status: 400 });
  }

  // 生成100000到999999之间的随机整数
  const code = Math.floor(Math.random() * 900000) + 100000;
  redis.setex("email-login-captcha:" + email, 300, code.toString()); // 存储并设置5分钟过期

  await nodemailer.sendMail({
    from: process.env.EMAIL_FROM,
    to: email, // 收件人信息
    subject: "登录验证码", // 邮件主题
    text: `您的验证码是：${code}，有效期为5分钟。`,
  });

  return NextResponse.next();
}
