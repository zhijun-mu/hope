import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full border-0 shadow-none">
        {" "}
        {/* 移除边框和阴影 */}
        <CardContent className="pt-8 px-6">
          {" "}
          {/* 增加水平内边距 */}
          <div className="text-center space-y-6">
            {" "}
            {/* 增加垂直间距 */}
            <h1 className="text-[120px] font-bold text-primary leading-none">
              404
            </h1>{" "}
            {/* 加大字号 */}
            <div className="space-y-3">
              {" "}
              {/* 调整间距 */}
              <h2 className="text-3xl font-semibold tracking-tight">
                页面未找到
              </h2>{" "}
              {/* 加大字号 */}
              <p className="text-muted-foreground text-lg">
                {" "}
                {/* 加大字号 */}
                您访问的页面可能已被移除或暂时不可用
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pb-8">
          <Button asChild variant="outline">
            <Link href="/" replace>
              返回首页
            </Link>
          </Button>
          <div className="text-sm text-muted-foreground">
            需要帮助？{" "}
            <a
              href="/support"
              className="underline underline-offset-4 hover:text-primary"
            >
              联系支持
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
