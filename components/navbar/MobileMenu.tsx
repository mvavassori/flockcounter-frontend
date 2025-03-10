"use client";
import { useState } from "react";
import Link from "next/link";
import HamburgerIcon from "../icons/HamburgerIcon";
import CloseIcon from "../icons/CloseIcon";
import { useSession } from "next-auth/react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMobileMenu = () => setIsOpen(!isOpen);
  const closeMobileMenu = () => setIsOpen(false);
  const { status } = useSession();

  const commonLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  const authenticatedLinks = [
    { href: "/websites", label: "Websites" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={closeMobileMenu}
        ></div>
      )}
      <div className="flex w-full">
        <div
          className={`fixed top-0 left-0 bottom-0 w-5/6 max-w-sm bg-white z-20 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="mt-12 flex flex-col items-start p-4">
            {commonLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg block p-2 w-full"
                onClick={toggleMobileMenu}
              >
                {link.label}
              </Link>
            ))}

            {status === "authenticated" ? (
              authenticatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg block p-2 w-full"
                  onClick={toggleMobileMenu}
                >
                  {link.label}
                </Link>
              ))
            ) : (
              <Link
                href="/api/auth/signin"
                className="text-lg block p-2 w-full"
                onClick={toggleMobileMenu}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
        <button onClick={toggleMobileMenu} className="z-30">
          {isOpen ? <CloseIcon width={24} height={24} /> : <HamburgerIcon />}
        </button>
      </div>
    </div>
  );
}
