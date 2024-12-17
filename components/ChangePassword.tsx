"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { hasSpecialChar, hasNumber, hasUppercase } from "@/utils/helper";

export default function ChangePassword() {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const validatePassword = () => {
    if (currentPassword === "") {
      setValidationError("Current password is required");
      return false;
    }
    if (newPassword === "") {
      setValidationError("New password is required");
      return false;
    }
    if (currentPassword === newPassword) {
      setValidationError(
        "New password must be different from current password"
      );
      return false;
    }
    if (newPassword.length < 8) {
      setValidationError("New password must be at least 8 characters long");
      return false;
    }
    if (
      !hasSpecialChar(newPassword) ||
      !hasNumber(newPassword) ||
      !hasUppercase(newPassword)
    ) {
      setValidationError(
        "New password must contain at least one uppercase letter, one number, and one special character"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/change-password/${session?.user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        setMessage("Password successfully updated");
        setCurrentPassword("");
        setNewPassword("");
        return;
      }

      // Only try to parse JSON if the response is not OK
      const data = await response.json();
      setMessage(data.message || "Failed to update password");
    } catch (error) {
      setMessage("An error occurred while updating password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium mb-4">Change Password</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
        {validationError && (
          <p className="text-sm text-red-600">{validationError}</p>
        )}
        {message && (
          <p
            className={`text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
