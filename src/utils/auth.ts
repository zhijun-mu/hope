import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/utils/prisma";

import NodeMailer from "next-auth/providers/nodemailer";
import GitHub from "next-auth/providers/github";
import Gitee from "@/utils/gitee";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    NodeMailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GitHub,
    Gitee({
      clientId: process.env.AUTH_GITEE_ID,
      clientSecret: process.env.AUTH_GITEE_SECRET,
    }),
  ],
});
