"use client";
import { createContext, useEffect, useState } from "react";
import { getCurrentMonthDates } from "../lib/lib";
export const ExpensesCtx = createContext([]);

async function fetchSpendings(startDate, endDate) {
  try {
    const response = await fetch(
      `/api/expenses?date_start=${startDate}&date_end=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["expenses"],
          //revalidate: 1
        },
      }
    );

    const spendings = await response.json();

    return spendings;
  } catch (error) {
    console.error("Error", error);
  }
}

export default function ExpensesContext({ children }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const [monthStart, monthEnd] = getCurrentMonthDates();
    async function getData() {
      const data = await fetchSpendings(monthStart, monthEnd);
      setExpenses(data);
    }
    getData();
  }, []);

  return (
    <ExpensesCtx.Provider value={{ expenses, setExpenses }}>{children}</ExpensesCtx.Provider>
  );
}
