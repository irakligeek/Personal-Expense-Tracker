"use client";
import { useRouter } from "next/navigation";

export default function AddExpenseButton({ children, classes = "" }) {
  const router = useRouter();
  return (
    <button
      className={`bg-primary text-white rounded-full p-2 px-6
     flex items-center justify-center h-16 gap-4 ${classes} 
      transition-shadow duration-200 ease-in-out hover:shadow-lg`}
      onClick={() => router.push("/new")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <span className="text-sm">{children}</span>
    </button>
  );
}
