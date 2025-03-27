import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function GET() {
  try {
    // 发送测试邮件
    await transporter.sendMail({
      from: process.env.SMTP_PASSWORD,
      to: "1478919527@qq.com", // 实际使用时应从请求参数获取
      subject: "邮箱登录验证码",
      html: "<b>您的验证码是：123456</b>",
    });

    return new Response();
  } catch (error) {
    console.error("邮件发送失败:", error);
    return new Response("<h1>发送失败</h1>", {
      status: 500,
      headers: {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
