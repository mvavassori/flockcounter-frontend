import CheckoutButton from "@/components/CheckoutButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import TickIcon from "@/components/icons/TickIcon";

async function getCurrentUser(userId: number, token: string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user/${userId}`, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      if (response.status === 401) {
        throw new Error("Unauthorized");
      } else if (response.status === 404) {
        throw new Error("Invalid id");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default async function Pricing() {
  const session = await getServerSession(authOptions);

  if (session?.error === "RefreshAccessTokenError") {
    redirect("/auth/signout");
  }

  const userId = Number(session?.user?.id);
  const email = String(session?.user?.email);
  const accessToken = String(session?.backendTokens.accessToken);

  // If is the user is logged in fetch the user data and check for active subscription
  if (process.env.NODE_ENV === "production" && session?.user) {
    const data = await getCurrentUser(userId, accessToken);
    if (data.user.subscription_status === "active") {
      redirect("/profile"); // Redirects the user to profile if subscription is active
    }
  }

  function getCurrencySymbol() {
    return "€";
  }

  return (
    <div className="w-full px-4 pb-4 pt-12">
      <h1 className="text-2xl font-bold mb-4">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Plan */}
        <div className="bg-white shadow-md rounded p-6 border-2 border-black hover:border-blue-500">
          <h2 className="text-lg font-bold mb-4">Basic</h2>
          <p className="text-sm mb-4">
            Get started with FlockCounter. Perfect for small websites.
          </p>
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold">{getCurrencySymbol()}9</span>
            <span className="ml-1">/month</span>
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
              interval="monthly"
            />
          </div>
        </div>

        {/* Business Plan */}
        <div className="bg-white shadow-md rounded p-6 border-2 border-black hover:border-blue-500">
          <h2 className="text-lg font-bold mb-4">Business</h2>
          <p className="text-sm mb-4">
            Advanced features for growing businesses.
          </p>
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold">{getCurrencySymbol()}19</span>
            <span className="ml-1">/month</span>
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
            />
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white shadow-md rounded p-6 border-2 border-black hover:border-blue-500">
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
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Contact Us
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
