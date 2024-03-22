import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/SignOutButton";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  // console.log("session", session);
  // console.log("adminsession", session);
  const response = await fetch(`${process.env.BACKEND_URL}/user/${session?.user.id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    }
  });

  if (response.status !== 200) {
    return (
      <>
    <p>There was some error fetching the data</p>
    <SignOutButton />
    </>)

}
  const user = await response.json();

  return (
    <>
    <div className="mt-16">{user?.name}</div>
    <div>{user?.email}</div>
    <div>{session?.backendTokens.accessToken}</div>
    <div>{session?.user?.id}</div>
    <div>{session?.backendTokens.refreshToken}</div>
    {/* <div>{session?.user?.role}</div> */}
    {/* <div>{session?.user?.accessToken}</div> */}
    <SignOutButton />
    </>
  )
}
