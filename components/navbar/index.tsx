import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserIcon from "../icons/UserIcon";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const UnauthenticatedNavbar = (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between lg:px-6 p-4 z-50 bg-white border-b-2 border-black">
      <div className="block flex-none md:hidden">
        <MobileMenu />
      </div>
      <div className="flex w-full items-center justify-center md:justify-normal">
        <Link href="/" className="text-xl font-bold">
          <span className="text-slate-500">Flock</span>
          <span>Counter</span>
        </Link>

        <ul className="ml-12 hidden gap-6 text-sm md:flex md:items-center">
          <li>
            <Link
              href="/pricing"
              className="underline-offset-4 hover:underline"
            >
              Pricing
            </Link>
          </li>
          <li>
            {/* make the link open in new page */}
            <Link
              href="https://github.com/mvavassori/flockcounter"
              className="underline-offset-4 hover:underline"
              target="_blank"
            >
              GitHub
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-end md:w-1/3">
        <Link
          href="/profile"
          className="mr-6 hidden md:block text-sm hover:bg-blue-600 justify-end bg-blue-500 text-white px-2 py-1 rounded-full"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );

  const AuthenticatedNavbar = (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between lg:px-6 p-4 z-50 bg-white border-b-2 border-black">
      <div className="block flex-none md:hidden">
        <MobileMenu />
      </div>
      <div className="flex w-full items-center justify-center md:justify-normal">
        <Link href="/" className="text-xl font-bold">
          <span className="text-slate-500">Flock</span>
          <span>Counter</span>
        </Link>

        <ul className="ml-12 hidden gap-6 text-sm md:flex md:items-center">
          <li>
            <Link
              href="/websites"
              className="underline-offset-4 hover:underline"
            >
              Websites
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className="underline-offset-4 hover:underline"
            >
              Plans
            </Link>
          </li>
          <Link
            href="https://github.com/mvavassori/flockcounter"
            className="underline-offset-4 hover:underline"
            target="_blank"
          >
            GitHub
          </Link>
        </ul>
      </div>
      <div className="flex justify-end md:w-1/3">
        <Link href="/profile" className="mr-6 hidden md:block">
          <UserIcon />
        </Link>
      </div>
    </nav>
  );

  return session ? AuthenticatedNavbar : UnauthenticatedNavbar;
};

export default Navbar;
