import Image from "next/image";

export default () => {
  return (
    <>
      <Image src="/logo.png" alt="logo" width={180} height={180} priority />
    </>
  );
};
