"use client";
import { createContext, useState } from "react";

export const ModalContext = createContext(null);

export default function ModalProvider({ children }) {
  const [isModalClose, setModalClose] = useState(false);

  return (
    <ModalContext.Provider
      value={{ isModalClose, setModalClose }}
    >
      {children}
    </ModalContext.Provider>
  );
}
