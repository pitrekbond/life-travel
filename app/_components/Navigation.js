import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="text-xl mr-12">
      <ul className="flex gap-20 items-center">
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/map"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <Image
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
                height="30"
                width="30"
                quality={100}
              />
              <span>Map</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="hover:text-accent-400 transition-colors"
            >
              Log in
            </Link>
          )}
        </li>

        {/* SignOutButton on the right */}
        {/* {session && (
          <div className="ml-auto">
            <SignOutButton />
          </div>
        )} */}
      </ul>
    </nav>
  );
}
