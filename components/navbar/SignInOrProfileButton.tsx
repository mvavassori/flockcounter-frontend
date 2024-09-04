"use client";
//! WHY DID I MAKE THIS FUCKING CLIENT THING IN THE FIRST PLACE?!
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserIcon from "../icons/UserIcon";

export default function SignInOrProfileButton() {
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <Link href="/profile" className="mr-6 hidden md:block">
          <UserIcon />
        </Link>
      ) : status === "unauthenticated" ? (
        <Link
          href="/api/auth/signin"
          className="hidden md:block mr-4 text-sm hover:bg-blue-600 justify-end bg-blue-500 text-white px-2 py-1 rounded-full"
        >
          Sign In
        </Link>
      ) : null}
    </>
  );
}
