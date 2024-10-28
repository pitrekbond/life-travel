import Logo from "./Logo";
import NavSidebar from "./NavSidebar";
import SignOutButton from "./SignOutButton";

export default function Sidebar({ children }) {
  return (
    <div className="bg-primary-800 w-full flex flex-col items-center gap-8 py-4">
      <Logo />
      <NavSidebar />
      {children}
      <div className="absolute bottom-[16px] left-4">
        <SignOutButton />
      </div>
    </div>
  );
}
