import Image from "next/image";

export default () => {
  return (
    <div>
      <Image
        src="/logo.png"
        alt="Hope logo"
        width={180}
        height={180}
        priority
      />
    </div>
  );
}
