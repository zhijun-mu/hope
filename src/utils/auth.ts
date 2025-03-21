import NextAuth from "next-auth";

import GitHub from "next-auth/providers/github";
import Gitee from "@/utils/gitee";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Gitee({
      clientId: process.env.AUTH_GITEE_ID,
      clientSecret: process.env.AUTH_GITEE_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
