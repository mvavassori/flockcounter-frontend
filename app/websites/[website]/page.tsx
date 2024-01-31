import { notFound } from "next/navigation";
import {getWebsites} from "@/lib/db";

export async function generateStaticParams() {
  try {
    getWebsites()
  } catch (error) {
    console.error(error);
  }
}

export default function Dashboard({
  params: { domain },
}: {
  params: { domain: string };
}) {
  return (
    <div>Dashbaord</div>
  )
}