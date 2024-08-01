"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import Spinner from "@/components/Spinner";

export default function Logout() {
  useEffect(() => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/api/auth/signin`,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner />
    </div>
  );
}
