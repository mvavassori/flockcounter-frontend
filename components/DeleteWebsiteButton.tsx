"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DeleteWebsiteButtonProps {
  domain: string;
}

export default function DeleteWebsiteButton({
  domain,
}: DeleteWebsiteButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteWebsite = async () => {
    if (!session) return; // Ensure the session exists before making the request

    // Ask for confirmation
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${domain} and all its data? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    setIsLoading(true);
    setError(null);

    const headers = new Headers();
    headers.append(
      "Authorization",
      `Bearer ${session?.backendTokens.accessToken}`
    );
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/website/${domain}`,
        { method: "DELETE", headers: headers }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete website.");
      }
      alert(`Website ${domain} deleted successfully.`);
      // Redirect to the /websites page after successful deletion
      router.push("/websites");
    } catch (err: Error | any) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={deleteWebsite}
        disabled={isLoading}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        {isLoading ? "Deleting..." : `Delete ${domain} (everything)`}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
