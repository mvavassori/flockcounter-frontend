import { notFound } from "next/navigation";

async function getWebsite(id: number) {
  const response = await fetch(`${process.env.BACKEND_URL}/website/${id}`);
  return response.json();
}

// export async function generateStaticParams() {
//   try {
//     getWebsite(1)
//   } catch (error) {
//     console.error(error);
//   }
// }

export default async function Dashboard({ params }: { params: { domain: number } }) {
    const websiteData = await getWebsite(params.domain);
    console.log(websiteData)
  return (
    <main>Dashbaord</main>
  )
}