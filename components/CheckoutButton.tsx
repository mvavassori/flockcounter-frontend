"use client";

interface CheckoutButtonProps {
  plan: string;
  email: string;
  userId: string;
  token: string;
}

export default function CheckoutButton({
  plan,
  email,
  userId,
  token,
}: CheckoutButtonProps) {
  const checkout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            plan,
            userId,
          }),
        }
      );
      const body = await response.json();
      window.location.href = body.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      onClick={checkout}
    >
      Start Now
    </button>
  );
}
