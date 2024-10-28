import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo({ color = "text-primary-50" }) {
  return (
    <Link href="/" className="flex items-center gap-3 ">
      <Image
        src={logo}
        quality={100}
        height="70"
        width="70"
        alt="Life Travel logo"
      />

      <span className={`text-xl font-bold ${color}`}>Life Travel</span>
    </Link>
  );
}

export default Logo;
