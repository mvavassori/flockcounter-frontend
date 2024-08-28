"use client";

import { useCallback, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import UserIcon from "../icons/UserIcon";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

export default function SignInOrProfileButton() {
  // const { data: session } = useSession();
  // console.log("buttonhandler session", session);

  const [session, setSession] = useState<Session | null>(null);
  // Changed the default status to loading
  const [status, setStatus] = useState<string>("loading");

  const pathName = usePathname();

  const retrieveSession = useCallback(async () => {
    try {
      const sessionData = await getSession();
      if (sessionData) {
        setSession(sessionData);
        setStatus("authenticated");
        return;
      }

      setStatus("unauthenticated");
    } catch (error) {
      setStatus("unauthenticated");
      setSession(null);
    }
  }, []);

  useEffect(() => {
    // We only want to retrieve the session when there is no session
    if (!session) {
      retrieveSession();
    }

    // use the pathname to force a re-render when the user navigates to a new page
  }, [retrieveSession, session, pathName]);

  // if (status === "loading") {
  //   return null; // Renders nothing while loading
  // }
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
