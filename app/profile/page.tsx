import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "@/components/SignOutButton";

export default async function Profile() {
    const session = await getServerSession(authOptions);
  console.log("adminsession", session);
  return (
    <>
    <div className="mt-16">{session?.user?.name}</div>
    <div>{session?.user?.email}</div>
    <div>{session?.user?.accessToken}</div>
    {/* <div>{session?.user?.id}</div> */}
    {/* <div>{session?.user?.role}</div> */}
    {/* <div>{session?.user?.accessToken}</div> */}
    <SignOutButton />
    </>
  )
}
