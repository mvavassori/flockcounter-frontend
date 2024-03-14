import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function getUserWebsites(userId: number, token: string) {
  

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/websites/user/${userId}`, { headers });
    const text = await response.text();

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${text}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      if(response.status === 404){
          errorMessage = "Invalid id";
      } else if(response.status === 401){
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
  const websites = await getUserWebsites(Number(session?.user.id), session?.backendTokens.accessToken || "");
    console.log(websites)
  return (
    <div>AllWebsites</div>
  )
}
