import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/utils/redis";
import { prisma } from "@/utils/prisma";
import { nodemailer } from "@/utils/nodemailer";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { email, code } = await request.json();

    // 参数校验
    if (!email || !code) {
      return NextResponse.json(
        { error: "邮箱和验证码不能为空" },
        { status: 400 }
      );
    }

    // 验证码校验
    const storedCode = await redis.get(`login-email-captcha:${email}`);
    if (!storedCode)
      return NextResponse.json({ error: "验证码已过期" }, { status: 400 });
    if (code !== storedCode)
      return NextResponse.json({ error: "验证码不正确" }, { status: 400 });

    // 查询/创建用户
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, name: email.split("@")[0] },
      });
    }

    // 清除验证码
    await redis.del(`login-email-captcha:${email}`);

    return NextResponse.json({ ok: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
