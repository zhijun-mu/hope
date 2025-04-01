import { signIn } from "@/utils/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default () => {
  const submitForm = async (formData: FormData) => {
    "use server";

    try {
      await signIn("credentials", formData);
    } catch (error) {
      console.error("登录失败", error);
    }
  };

  return (
    <form action={submitForm}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-1">
          <Input
            name="email"
            type="email"
            placeholder="请输入您的邮箱"
            maxLength={20}
            required
          />
        </div>

        <div className="grid gap-1">
          <div className="flex gap-2">
            <Input
              name="captcha"
              placeholder="请输入6位验证码"
              autoComplete="off"
              autoCorrect="off"
              maxLength={6}
              required
            />
            <Button variant="outline" className="w-32" type="button">
              获取验证码
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full">
          继续
        </Button>
      </div>
    </form>
  );
};
