import { signIn, signOut } from "@/utils/auth";

export default () => {
  return (
    <div>
      <div style={{ padding: "20px" }}>
        <span>github</span>
        <div>
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/" });
            }}
          >
            <button type="submit">登录</button>
          </form>
        </div>
        <div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">登出</button>
          </form>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <span>gitee</span>
        <div>
          <form
            action={async () => {
              "use server";
              await signIn("gitee", { redirectTo: "/" });
            }}
          >
            <button type="submit">登录</button>
          </form>
        </div>
        <div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">登出</button>
          </form>
        </div>
      </div>
    </div>
  );
};
