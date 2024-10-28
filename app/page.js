// export const dynamic = "force-static";

import Link from "next/link";
import bg from "@/public/bg.jpg";
import Image from "next/image";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        alt="Image of a plane wing in the sky"
        placeholder="blur"
        quality={100}
        className="object-cover object-top"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-7xl text-primary-50 mb-10 tracking-tight font-normal">
          Make your journey unforgettable
        </h1>
        <Link
          href="/about"
          className="bg-accent-400 px-6 py-4 text-primary-800 text-xl hover:bg-accent-500 transition-all rounded font-semibold"
        >
          Let&apos;s start!
        </Link>
      </div>
    </main>
  );
}
