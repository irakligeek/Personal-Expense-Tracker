"use client";
import { useContext } from "react";
import { ExpensesCtx } from "../context/expensesContext";
import SpendingByCategory from "./SpendingByCategory";
import { getSpendingsByCategory } from "../lib/lib";
import { UserSettings } from "../context/userContext";

export default function SpendingsTable() {
  const { expenses } = useContext(ExpensesCtx);
  const { settings } = useContext(UserSettings);
  const userCategories = settings.categories;

  if (expenses.length === 0) return null;

  let spendingsByCategory = getSpendingsByCategory(expenses);

  //add user categories emohies to the spending data
  spendingsByCategory.forEach((category) => {
    const userCategory = userCategories.find(
      (item) => item.name.toLowerCase() === category.name.toLowerCase()
    );
    category.emoji = userCategory?.emoji;
  });

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
            data={{
              category: data.name,
              emoji: data.emoji,
              amount: data.amount,
              index: index,
              spendingByCategories: spendingsByCategory,
              spendings: expenses,
              isReoccuring: data?.reoccuringFrequency,
            }}
          />
        ))}
    </>
  );
}
