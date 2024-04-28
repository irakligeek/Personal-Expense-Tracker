"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }) {
  const router = useRouter();
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  return createPortal(
    isOpen ? (
      <div
        className="absolute top-0 left-0 right-0 bottom-0 
      bg-black bg-opacity-70 flex justify-center items-center z-50"
      >
        <div
          ref={dialogRef}
          className="w-fit border-none rounded-xl bg-white h-fit
            p-5 relative flex justify-center items-start"
        >
          {children}
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/");
            }}
            className="absolute top-2 right-2 w-12 h-12 bg-transparent border-none rounded-full 
          cursor-pointer flex items-center justify-center text-xl font-medium"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    ) : null,
    document.getElementById("modal-root")
  );
}