"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavSidebar() {
  const pathname = usePathname();

  return (
    <nav className=" bg-primary-400 rounded-md">
      <ul className="flex">
        <li
          className={`px-3 py-1 rounded-md  transition-colors font-semibold ${
            pathname.startsWith("/map/cities") ? "bg-primary-950" : ""
          }`}
        >
          <Link href="/map/cities">Cities</Link>
        </li>
        <li
          className={`px-3 py-1 rounded-md transition-colors font-semibold ${
            pathname === "/map/countries" ? "bg-primary-950" : ""
          }`}
        >
          <Link href="/map/countries">Countries</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavSidebar;
