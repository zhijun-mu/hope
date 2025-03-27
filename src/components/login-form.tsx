import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { signIn } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SiGithub, SiGitee } from "@icons-pack/react-simple-icons";

// 服务端动作
async function submitForm(formData: FormData) {
  "use server";
  const email = formData.get("email");
  console.log("提交邮箱:", email);
  await signIn("nodemailer", {
    email: email?.toString() || "",
    redirectTo: "/",
  });
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={submitForm}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Image src="/logo.png" alt="logo" width={72} height={72} />
            <h1 className="text-xl font-bold">欢迎您的到来</h1>
            <div className="text-center text-sm">使用魔术链接登录您的账户</div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Input
                name="email"
                type="email"
                placeholder="请输入您的邮箱"
                maxLength={20}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              继续
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              其他登录方式
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                "use server";
                await signIn("github", { redirectTo: "/" });
              }}
            >
              <SiGithub />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                "use server";
                await signIn("gitee", { redirectTo: "/" });
              }}
            >
              <SiGitee />
              Gitee
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        点击登录， 即表示您同意我们的{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          服务条款
        </Link>{" "}
        和{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          隐私政策
        </Link>
        。
      </div>
    </div>
  );
}
