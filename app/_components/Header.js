import { auth } from "../_lib/auth";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SignOutButton from "./SignOutButton";

async function Header() {
  const session = await auth();

  return (
    <header className=" z-20 py-5 px-8 border-b border-primary-900 relative">
      <div className="flex justify-between items-center max-w-7xl mx-auto font-semibold">
        <Logo />
        <Navigation />
      </div>
      {session?.user && (
        <div className="absolute right-[5px] top-[21px]">
          <SignOutButton />
        </div>
      )}
    </header>
  );
}

export default Header;
