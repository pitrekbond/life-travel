// export const dynamic = "force-static";

import SignInButton from "../../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access the application&apos;s features
      </h2>
      <SignInButton />
    </div>
  );
}
