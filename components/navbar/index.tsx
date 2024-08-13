import Link from "next/link";
import MobileMenu from "./MobileMenu";
import ButtonHandler from "./ButtonHandler";

const Navbar = async () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between lg:px-6 p-4 z-50 bg-white border-b-2 border-black">
      <div className="block flex-none md:hidden">
        <MobileMenu />
      </div>
      <div className="flex w-full items-center justify-center md:justify-normal">
        <Link href="/" className="text-xl font-bold">
          <span className="text-slate-500">bare</span>
          <span>-analytics</span>
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
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/about" className="underline-offset-4 hover:underline">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-end md:w-1/3">
        <ButtonHandler />
      </div>
    </nav>
  );
};

export default Navbar;
