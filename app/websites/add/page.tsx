import AddWebsiteForm from "@/components/forms/AddWebsiteForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Limits {
  canAddWebsite: boolean;
  maxWebsites: number;
  plan: string;
  websiteCount: number;
}

async function getUserWebsiteLimits(userId: number, token: string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/limits/${userId}`,
      { headers }
    );

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

export default async function AddWebsite() {
  const session = await getServerSession(authOptions);
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/auth/signout");
  }
  let limits: Limits | null = null;
  let error: string | null = null;
  try {
    limits = await getUserWebsiteLimits(
      Number(session?.user.id),
      session?.backendTokens.accessToken || ""
    );
  } catch (err: Error | any) {
    console.error(err.message);
    error = err.message;
  }

  return (
    <div className="w-full px-4 pb-4 pt-12">
      <h1 className="text-2xl font-bold mb-4">Add a New Website</h1>
      {/* Display message if the user can't add more websites */}
      {limits?.canAddWebsite === false ? (
        <p>You cannot add more websites, upgrade or contact us for more.</p>
      ) : (
        <AddWebsiteForm />
      )}
      <div className="mt-6">
        {/* Show website usage if limits are loaded, otherwise show error message */}
        {limits ? (
          <p>
            You have used {limits.websiteCount} websites out of{" "}
            {limits.maxWebsites}.
          </p>
        ) : (
          error && <p>{error}</p>
        )}
      </div>
    </div>
  );
}
