import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/SignOutButton";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${session?.user.id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.backendTokens.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    return (
      <>
        <p>There was some error fetching the data</p>
        <SignOutButton />
      </>
    );
  }
  const data = await response.json();

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
        <div>
          <span className="block text-sm font-medium">
            Subscription Status:
          </span>
          <span className="text-sm">
            {data.user.subscription_status.charAt(0).toUpperCase() +
              data.user.subscription_status.slice(1).toLowerCase()}{" "}
          </span>
          <span className="text-xs text-gray-700">
            (Renews on:{" "}
            {new Date(data.subscriptionExpiryDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            )
          </span>
        </div>
        <div>
          <span className="block text-sm font-medium">Subscription Plan:</span>
          {data.user.subscription_plan.String === "" ? (
            <span className="block text-sm">No plan available</span>
          ) : (
            <span className="block text-sm">
              {data.user.subscription_plan.String.charAt(0).toUpperCase() +
                data.user.subscription_plan.String.slice(1).toLowerCase()}
            </span>
          )}
        </div>
        <div>
          {/* <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/customer-portal?session_id=${session?.user.id}`;
            }}
          >
            Manage Subscription
          </button> */}
        </div>
        <SignOutButton />
      </div>
    </div>
  );
}
