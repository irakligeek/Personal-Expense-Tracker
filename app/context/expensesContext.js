"use client";
import { createContext, useState } from "react";

export const ExpensesCtx = createContext([]);

export default function ExpensesContext({ children, data }) {
  const expensesData = data?.result || [];
  const [expenses, setExpenses] = useState(expensesData);
  const [spendingsDate, setSpendingsDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().toLocaleString("en-US", { month: "long" }),
  });

  return (
    <ExpensesCtx.Provider
      value={{ expenses, setExpenses, spendingsDate, setSpendingsDate }}
    >
      {children}
    </ExpensesCtx.Provider>
  );
}
