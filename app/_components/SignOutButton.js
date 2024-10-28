import { signOutAction } from "../_lib/actions";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="py-3 px-3 transition-colors flex items-center gap-2 w-full text-xl text-primary-50 font-semibold hover:bg-transparent hover:text-accent-400">
        <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
