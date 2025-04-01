import type { NextAuthConfig } from "next-auth";

// import NodeMailer from "next-auth/providers/nodemailer";
import GitHub from "next-auth/providers/github";
import Gitee from "@/utils/gitee";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/utils/prisma";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        captcha: { label: "Captcha" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        const { email, captcha } = credentials;

        // 验证码校验
        const result = await fetch(
          `http://localhost:3000/api/auth/verify-captcha`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, captcha }),
          }
        );

        // 解析响应内容
        const data = await result.json();
        console.log("验证结果:", data); // 输出验证结果

        return null;
        // if (!storedCode || captcha !== storedCode) return null;

        // // 查找或创建用户
        // let user = await prisma.user.findUnique({
        //   where: { email: email as string },
        // });

        // if (!user) {
        //   // No user found, so this is their first attempt to login
        //   // Optionally, this is also the place you could do a user registration
        //   throw new Error("Invalid credentials.");
        // }

        // // return user object with their profile data
        // return user;
      },
    }),
    // NodeMailer({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    GitHub,
    Gitee({
      clientId: process.env.AUTH_GITEE_ID,
      clientSecret: process.env.AUTH_GITEE_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
