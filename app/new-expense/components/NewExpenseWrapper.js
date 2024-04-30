"use client";
import NewExpenseForm from "./NewExpenseForm";
import ModalProvider from "@/app/context/modalContext";

export default function NewExpenseWrapper() {
  return (
    <ModalProvider>
      <NewExpenseForm />
    </ModalProvider>
  );
}
