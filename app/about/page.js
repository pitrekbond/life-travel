// export const dynamic = "force-static";

import Image from "next/image";
import pic_1 from "@/public/pic-1.jpg";
import pic_2 from "@/public/pic-2.jpg";
import Link from "next/link";
import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "About",
};

export default async function Page() {
  const session = await auth();

  return (
    <div className=" grid  grid-cols-5 gap-x-24 gap-y-32 text-lg items-center py-12 px-20">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Discover the world and share it
        </h1>
        <p className="space-y-8">
          With Life Travel you will never forget any of your trips! Keep them
          all in one place - by using a map on which you can locate them.
          Don&apos;t forget to show it to your friends!
        </p>
      </div>
      <div className="col-span-2">
        <Image
          src={pic_1}
          alt="Photo of Manhattan"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="col-span-2">
        <Image
          src={pic_2}
          placeholder="blur"
          alt="Photo of a beach"
          quality={80}
        />
      </div>
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Easy, free and comfortable
        </h1>
        <div className="space-y-8">
          <p>
            Wherever you were, all it takes is just to click on the map. You can
            write your observations, put the date of your trip and rate the
            place. In order to make everything more organized, you can also see
            which countries you&apos;ve visited and some data about them.
            Everything for free!
          </p>
          {!session?.user ? (
            <Link
              className="inline-block mt-4 bg-accent-400 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-500 transition-all rounded"
              href="/login"
            >
              Log in to explore the world
            </Link>
          ) : (
            <Link
              className="inline-block mt-4 bg-accent-400 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-500 transition-all rounded"
              href="/map"
            >
              Go to the map
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
