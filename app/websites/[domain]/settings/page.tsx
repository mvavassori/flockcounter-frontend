import DeleteWebsiteButton from "@/components/DeleteWebsiteButton";

export default function WebsiteSettings({
  params,
}: {
  params: { domain: string };
}) {
  const { domain } = params;
  return (
    <div className="w-full px-4 pb-4 pt-12">
      <h1 className="text-2xl font-bold mb-4">Website Settings</h1>
      <DeleteWebsiteButton domain={domain} />
    </div>
  );
}
