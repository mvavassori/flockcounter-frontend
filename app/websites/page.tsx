import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import SettingsIcon from "@/components/icons/SettingsIcon";

interface Website {
  id: number;
  domain: string;
  userId: number;
  created_at: string;
  updated_at: string;
}

async function getUserWebsites(userId: number, token: string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/websites/user/${userId}`,
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

export default async function AllWebsites() {
  const session = await getServerSession(authOptions);
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/auth/signout");
  }

  let websites: Website[] = [];
  let error: string | null = null;

  try {
    const data = await getUserWebsites(
      Number(session?.user.id),
      session?.backendTokens.accessToken || ""
    );
    if (Array.isArray(data)) {
      websites = data;
    } else {
      error = data;
    }
  } catch (err: Error | any) {
    console.error(err.message);
    error = err.message;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="w-full px-4 pb-4 pt-12">
      {websites.length !== 0 ? (
        <>
          <div className="flex justify-between items-baseline">
            <h1 className="text-2xl font-bold mb-4">Your Websites</h1>
            <Link href="/websites/add">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold">
                Add New Website
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {websites !== null &&
              websites?.map((website: Website) => (
                <Link key={website.id} href={`/websites/${website.domain}`}>
                  <div className="relative bg-white shadow-md rounded p-4 border-2 border-gray-500 hover:border-black hover:shadow-lg">
                    {/*Used the object to avoid hydration errors because of nested links*/}
                    <object>
                      <Link
                        href={`/websites/${website.domain}/settings`}
                        className="absolute top-2 right-2 text-gray-500 hover:text-black"
                      >
                        <SettingsIcon />
                      </Link>
                    </object>
                    <h2 className="text-lg font-bold">{website.domain}</h2>
                  </div>
                </Link>
              ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center align-middle">
          <Link href="/websites/add">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold">
              Add New Website
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
