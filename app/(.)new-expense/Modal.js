"use client";
import { useRef, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { ModalContext } from "@/app/context/modalContext";

export function Modal({ children }) {
  const { isModalClose, setModalClose } = useContext(ModalContext);
  const timeToCloseModal = 4; //seconds to close
  const router = useRouter();
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  //Close modal in 3 seconds if isModalClose is true, then redirect to home page.
  useEffect(() => {
    if (isModalClose) {
      setTimeout(() => {
        setModalClose(false);
        setIsOpen(false);

        router.back(); //Navigagte back
        router.refresh(); //refresh the page to get the latest data
      }, timeToCloseModal * 1000);
    }
  }, [isModalClose]);

  return createPortal(
    isOpen ? (
      <div
        className="fixed top-0 left-0 right-0 bottom-0 
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
