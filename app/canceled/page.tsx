"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Canceled() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile page after 5 seconds
    const timer = setTimeout(() => {
      router.push("/profile");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full px-4 pb-4 pt-12 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">
          Payment Canceled
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Your payment has been canceled. No changes have been made to your
          account.
        </p>
        <div className="w-16 h-16 mx-auto mb-6">
          <svg
            className="w-full h-full text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-700">
          You will be redirected to your profile page in a few seconds...
        </p>
        <p className="text-xs text-gray-400">
          If you are not redirected, please click{" "}
          <Link href="/profile" className="text-blue-500">
            here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
