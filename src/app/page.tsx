import Image from "next/image";
import { auth, signOut } from "@/utils/auth";

const User = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <img src={session.user.image!} alt={session.user.name!} />
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
    </div>
  );
};

export default () => {
  return (
    <>
      <Image src="/logo.png" alt="logo" width={180} height={180} priority />
      <User />
      <button
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        退出登录
      </button>
    </>
  );
};
