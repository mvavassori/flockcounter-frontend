"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddWebsiteForm() {
  const router = useRouter();

  const { data: session } = useSession({ required: true });
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return; // Ensure the session exists before making the request

    const headers = new Headers();
    headers.append(
      "Authorization",
      `Bearer ${session.backendTokens.accessToken}`
    );
    headers.append("Content-Type", "application/json");

    setIsLoading(true); // Show loading state
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/website`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ url: domain }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // Handle backend error message
        throw new Error(result.message || "Failed to add website.");
      }

      // On success, use the returned domain
      router.push(`/install?domain=${result.domain}`);
    } catch (err: Error | any) {
      console.error(err.message);
      setError(err.message); // Display error message to user
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="url" className="block">
          Enter the website full URL:
        </label>
        <input
          type="text"
          id="url"
          placeholder="https://example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)} // Update state
          className="rounded px-2 py-2 bg-slate-200"
          required
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold"
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? "Adding..." : "Add Website"}
        </button>
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </form>
  );
}
