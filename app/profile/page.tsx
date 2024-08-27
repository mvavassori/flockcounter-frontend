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
  const user = await response.json();

  console.log(user);

  return (
    <div className="px-4 pb-4 pt-12 w-full">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="space-y-4">
        <div>
          <span className="block text-sm font-medium">Name:</span>
          <span className="block text-sm">{user.name}</span>
        </div>
        <div>
          <span className="block text-sm font-medium">Email:</span>
          <span className="block text-sm">{user.email}</span>
        </div>
        <div>
          <span className="block text-sm font-medium">Role:</span>
          <span className="block text-sm">{user.role}</span>
        </div>
        <div>
          <span className="block text-sm font-medium">
            Subscription Status:
          </span>
          <span className="block text-sm">{user.subscription_status}</span>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
}
