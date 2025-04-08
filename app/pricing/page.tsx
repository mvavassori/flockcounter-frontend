"use client";

import CheckoutButton from "@/components/CheckoutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import TickIcon from "@/components/icons/TickIcon";
import { useState, useEffect } from "react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const { data: session, status, update } = useSession();

  // Redirect if subscription is active
  useEffect(() => {
    const checkSubscription = async () => {
      if (session?.user && process.env.NODE_ENV === "production") {
        try {
          const userId = Number(session.user.id);
          const token = String(session.backendTokens?.accessToken);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                cache: "no-store",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data.user.subscription_status === "active") {
              redirect("/profile");
            }
          }
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      }
    };

    checkSubscription();
  }, [session]);

  // Refresh the session every 15 minutes to avoid access token expiration errors
  useEffect(() => {
    const interval = setInterval(() => {
      if (session) {
        update();
      }
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [session, update]);

  // Show loading state while session is loading
  if (status === "loading") {
    return <div className="flex justify-center p-12">Loading...</div>;
  }

  const userId = Number(session?.user?.id || 0);
  const email = String(session?.user?.email || "");
  const accessToken = String(session?.backendTokens?.accessToken || "");

  function getCurrencySymbol(): string {
    return "€";
  }

  const basicPrice = isYearly ? "59.99" : "5.99";
  const businessPrice = isYearly ? "159.99" : "14.99";
  const billingInterval = isYearly ? "yearly" : "monthly";
  const billingText = isYearly ? "/year" : "/month";

  return (
    <div className="w-full px-4 pb-4 pt-12">
      <h1 className="text-2xl font-bold mb-4 text-center">Pricing</h1>

      {/* Toggle button */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <span className={`px-3 py-1 ${!isYearly ? "font-bold" : ""}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`w-12 h-6 flex items-center rounded-full p-1 ${
              isYearly ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"
            }`}
            aria-label={`Switch to ${isYearly ? "monthly" : "yearly"} billing`}
          >
            <span className="bg-white w-4 h-4 rounded-full" />
          </button>
          <span className={`px-3 py-1 ${isYearly ? "font-bold" : ""}`}>
            Yearly
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Plan */}
        <div className="bg-white shadow-md rounded-sm p-6 border-2 border-black hover:border-blue-500">
          <h2 className="text-lg font-bold mb-4">Basic</h2>
          <p className="text-sm mb-4">
            Get started with FlockCounter. Perfect for small websites.
          </p>
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold">
              {getCurrencySymbol()}
              {basicPrice}
            </span>
            <span className="ml-1">{billingText}</span>
          </div>
          <div className="flex flex-col gap-y-3 mb-6">
            <p className="text-sm flex items-center gap-x-2">
              <TickIcon />
              <span className="font-bold">5</span> websites
            </p>
            <p className="text-sm flex items-center gap-x-2">
              <TickIcon />
              Up to <span className="font-bold">100,000</span> events per month
            </p>
          </div>
          <div className="flex justify-center">
            <CheckoutButton
              plan="basic"
              email={email}
              userId={userId}
              token={accessToken}
              interval={billingInterval}
            />
          </div>
        </div>

        {/* Business Plan */}
        <div className="bg-white shadow-md rounded-sm p-6 border-2 border-black hover:border-blue-500">
          <h2 className="text-lg font-bold mb-4">Business</h2>
          <p className="text-sm mb-4">
            Advanced features for growing businesses.
          </p>
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold">
              {getCurrencySymbol()}
              {businessPrice}
            </span>
            <span className="ml-1">{billingText}</span>
          </div>
          <div className="flex flex-col gap-y-3 mb-6">
            <p className="text-sm flex items-center gap-x-2">
              <TickIcon />
              <span className="font-bold">10</span> websites
            </p>
            <p className="text-sm flex items-center gap-x-2">
              <TickIcon />
              Up to <span className="font-bold">1,000,000</span> events per
              month
            </p>
          </div>
          <div className="flex justify-center">
            <CheckoutButton
              plan="business"
              email={email}
              userId={userId}
              token={accessToken}
              interval={billingInterval}
            />
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white shadow-md rounded-sm p-6 border-2 border-black hover:border-blue-500">
          <h2 className="text-lg font-bold mb-4">Enterprise</h2>
          <p className="text-sm mb-4">
            Custom solutions for large-scale operations.
          </p>
          <div className="flex items-baseline mb-4">
            <p className="text-2xl font-bold">Custom</p>
          </div>
          <div className="flex flex-col gap-y-3 mb-6">
            <p className="text-sm flex items-center gap-x-2">
              <TickIcon />
              <span className="font-bold">Unlimited</span> websites
            </p>
            <p className="text-sm flex items-center gap-x-2">
              <TickIcon />
              <span className="font-bold">Unlimited</span> events
            </p>
          </div>
          <Link href="/contact">
            <div className="flex justify-center">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-sm">
                Contact Us
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
