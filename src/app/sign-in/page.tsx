import ThemeModeToggle from "@/components/theme-mode-toggle";
import { LoginContent } from "@/components/login-content";

export default () => {
  return (
    <>
      <ThemeModeToggle className="fixed top-6 right-6 z-50" />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginContent />
        </div>
      </div>
    </>
  );
};
