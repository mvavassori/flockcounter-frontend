import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChangePassword from "@/components/ChangePassword";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  // Check if there is a session first
  if (!session) {
    redirect("/auth/signin");
  }

  // Check for RefreshAccessTokenError before making the API call
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/auth/signout");
  }

  // Make API request with error handling
  let userData = null;
  let error = null;

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/user/${session.user.id}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${session.backendTokens.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      // Handle specific status codes
      if (response.status === 401) {
        // Unauthorized - token is invalid
        redirect("/auth/signout"); // Force sign-out on invalid token
      }

      // For other errors, get the error message
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    // Only parse JSON if the response is ok
    userData = await response.json();
  } catch (err: Error | any) {
    console.error("Profile fetch error:", err);
    error = err.message || "Failed to load profile data";

    // If the error contains "Invalid token" anywhere, sign out
    if (err.message && err.message.includes("Invalid")) {
      redirect("/auth/signout");
    }
  }

  // Show error state if something went wrong
  if (error || !userData) {
    return (
      <div className="px-4 pb-4 pt-12 w-full">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-sm mb-6">
          <p>Unable to load profile: {error || "Unknown error"}</p>
          <p className="mt-2">Please try signing in again.</p>
        </div>
        <div className="flex justify-end">
          <SignOutButton />
        </div>
      </div>
    );
  }

  const data = userData;

  return (
    <div className="px-4 pb-4 pt-12 w-full">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="space-y-4">
        <div>
          <span className="block text-sm font-medium">Name:</span>
          <span className="block text-sm">{data.user.name}</span>
        </div>
        <div>
          <span className="block text-sm font-medium">Email:</span>
          <span className="block text-sm">{data.user.email}</span>
        </div>
        <div>
          <span className="block text-sm font-medium">Role:</span>
          <span className="block text-sm">
            {data.user.role.charAt(0).toUpperCase() +
              data.user.role.slice(1).toLowerCase()}
          </span>
        </div>
        <ChangePassword />
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium mb-4">Subscription</h3>
          <span className="block text-sm font-medium">
            Subscription Status:
          </span>
          <span className="text-sm">
            {data.user.subscription_status.charAt(0).toUpperCase() +
              data.user.subscription_status.slice(1).toLowerCase()}{" "}
          </span>
          {data.subscriptionExpiryDate && (
            <span className="text-xs text-gray-700">
              (Renews on:{" "}
              {new Date(data.subscriptionExpiryDate).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
              )
            </span>
          )}
        </div>
        <div>
          <span className="block text-sm font-medium">Subscription Plan:</span>
          {!data.user.subscription_plan ||
          data.user.subscription_plan === "" ? (
            <span className="block text-sm">No plan available</span>
          ) : (
            <span className="block text-sm">
              {data.user.subscription_plan.charAt(0).toUpperCase() +
                data.user.subscription_plan.slice(1).toLowerCase()}
            </span>
          )}
        </div>
        <div className="flex justify-between">
          {process.env.NEXT_PUBLIC_ENV === "development" ? (
            <Link
              className="px-4 py-2 bg-blue-500 text-white rounded-sm"
              href={`https://billing.stripe.com/p/login/test_8wMeWSbro7RtfSMaEE?prefilled_email=${session?.user.email}`}
            >
              Manage Subscription
            </Link>
          ) : (
            <Link
              className="px-4 py-2 bg-blue-500 text-white rounded-sm"
              href={`https://billing.stripe.com/p/login/3cs8A5726aeH7C07ss?prefilled_email=${session?.user.email}`}
            >
              Manage Subscription
            </Link>
          )}
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
