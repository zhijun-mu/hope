import Image from "next/image";
import { auth } from "@/utils/auth";

export default async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <>
      <Image
        src="/logo.png"
        alt="Hope logo"
        width={180}
        height={180}
        priority
      />

      <div>
        <div>{JSON.stringify(session)}</div>
        <img src={session.user.image || ""} alt="User Avatar" />
      </div>
    </>
  );
};
