import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-16">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 px-6 py-3 text-lg rounded-md font-semibold"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
