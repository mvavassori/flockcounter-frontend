"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

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
  const [shouldRefetch, setShouldRefetch] = useState(false);

  // This needs useCallback as it is passed to handleCheckout and useEffect
  const fetchCheckoutSession = useCallback(
    async (token: string): Promise<CheckoutSessionResponse> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
          throw new Error("Unauthorized");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    [email, userId, plan, interval]
  );

  const handleCheckout = async () => {
    if (!session?.user) {
      router.push("/signup");
      return;
    }

    setIsLoading(true);
    try {
      const body = await fetchCheckoutSession(initialToken);
      window.location.href = body.url;
    } catch (err) {
      if (err instanceof Error && err.message === "Unauthorized") {
        await update();
        setShouldRefetch(true);
      } else {
        console.error("Error creating checkout session:", err);
        // Handle other errors (e.g., show error message to user)
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const retryCheckout = async () => {
      if (shouldRefetch) {
        setIsLoading(true);
        try {
          const newToken = session?.backendTokens?.accessToken;
          if (newToken && newToken !== initialToken) {
            const body = await fetchCheckoutSession(newToken);
            window.location.href = body.url;
          } else {
            throw new Error("Failed to refresh token");
          }
        } catch (err) {
          console.error("Error retrying checkout:", err);
          router.push("/login");
        } finally {
          setIsLoading(false);
          setShouldRefetch(false);
        }
      }
    };

    retryCheckout();
  }, [shouldRefetch, session, initialToken, fetchCheckoutSession, router]);

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
