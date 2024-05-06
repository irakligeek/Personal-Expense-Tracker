"use client";
import { useContext } from "react";
import { ExpensesCtx } from "../context/expensesContext";
import SpendingByCategory from "./SpendingByCategory";
import { getSpendingsByCategory } from "../lib/lib";

export default function SpendingsTable() {
  const { expenses } = useContext(ExpensesCtx);

  if (expenses.length === 0) return null;

  const spendingsByCategory = getSpendingsByCategory(expenses);

  return (
    <>
      <div
        className={`border-b border-zinc-200 border-t border-t-gray-200 
        last:border-none flex justify-between py-4 mb-4 text-sm text-secondary`}
      >
        <div className="grid grid-cols-[1fr_0.5fr_0.5fr]">
          <b>Category</b>
        </div>
        <div>
          <b>Amount spent</b>
        </div>
        <div>
          <b>Percentage of total</b>
        </div>
      </div>

      {spendingsByCategory
        .sort((a, b) => b.amount - a.amount)
        .filter((category) => category.amount > 0)
        .map((data, index) => (
          <SpendingByCategory
            key={index}
            category={data.name}
            amount={data.amount}
            index={index}
            spendingByCategories={spendingsByCategory}
            spendings={expenses}
            isReoccuring={data?.reoccuringFrequency}
          />
        ))}
    </>
  );
}
