"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface CheckoutButtonProps {
  plan: string;
  email: string;
  userId: number;
  token: string;
  interval?: "monthly" | "yearly";
}

interface CheckoutSessionResponse {
  url: string;
}

export default function CheckoutButton({
  plan,
  email,
  userId,
  token: initialToken,
  interval = "monthly",
}: CheckoutButtonProps) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Refresh the session every 15 minutes to avoid access token expiration errors
  useEffect(() => {
    const interval = setInterval(() => {
      if (session) {
        update();
      }
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [session, update]);

  const handleCheckout = async () => {
    if (!session?.user) {
      router.push("/signup");
      return;
    }

    setIsLoading(true);
    try {
      // Always use the latest token from the session
      const currentToken = session?.backendTokens?.accessToken || initialToken;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
          body: JSON.stringify({
            email,
            userId,
            plan,
            interval,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // If unauthorized, refresh the session and try again
          await update();
          throw new Error("Session refreshed, please try again");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const body: CheckoutSessionResponse = await response.json();
      window.location.href = body.url;
    } catch (err) {
      console.error("Error creating checkout session:", err);
      // Only show error to user, don't redirect to profile page
      if (
        err instanceof Error &&
        err.message !== "Session refreshed, please try again"
      ) {
        alert("There was an error processing your checkout. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      onClick={handleCheckout}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Start Now"}
    </button>
  );
}
