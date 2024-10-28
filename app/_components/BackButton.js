"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBackClick = function (e) {
    router.push(`/map/cities`);
    e.preventDefault();
  };

  return (
    <button
      type="button"
      className="border-2 py-2 px-2 rounded-md cursor-pointer font-semibold hover:bg-primary-800 active:bg-primary-800 transition-colors duration-500 w-1/3 mt-6"
      onClick={handleBackClick}
    >
      &larr; Back
    </button>
  );
}
