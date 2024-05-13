import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

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
      `${process.env.BACKEND_URL}/websites/user/${userId}`,
      { headers }
    );
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Invalid id";
      } else if (response.status === 401) {
        errorMessage = "Access denied";
      }
      return errorMessage;
    }
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    return "Network error, please check your connection and try again.";
  }
}

export default async function AllWebsites() {
  const session = await getServerSession(authOptions);
  const websites = await getUserWebsites(
    Number(session?.user.id),
    session?.backendTokens.accessToken || ""
  );
  console.log(websites);
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-2xl font-bold mb-4">Your Websites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {websites.map((website: Website) => (
          <Link key={website.id} href={`/websites/${website.domain}`}>
            <div className="bg-white shadow-md rounded p-4 border-2 border-black hover:border-blue-500">
              <h2 className="text-lg font-bold">{website.domain}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
