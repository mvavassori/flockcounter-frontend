"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/api/auth/signin`,
        })
      }
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
}
