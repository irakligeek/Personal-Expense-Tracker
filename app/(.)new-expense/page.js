"use client";
import { Modal } from "./Modal";
import NewExpenseForm from "../new-expense/components/NewExpenseForm";
import ModalProvider from "../context/modalContext";
export default function NewExpenseModal() {
  return (
    <ModalProvider>
      <Modal>
        <NewExpenseForm />
      </Modal>
    </ModalProvider>
  );
}
