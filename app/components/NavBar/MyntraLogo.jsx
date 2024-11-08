import Image from "next/image";
import myntraLogo from "../../../public/Logo/myntra-logo.svg";
import Link from "next/link";

const MyntraLogo = () => {
  return (
    <Link href="/">
      <Image src={myntraLogo} className="h-10 w-14" alt="Loading" />
    </Link>
  );
};

export default MyntraLogo;
