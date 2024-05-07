"use client";
import { formatUSD } from "../lib/utils";
import { UserSettings } from "../context/userContext";
import { useContext } from "react";
import { ExpensesCtx } from "../context/expensesContext";
import { getSpendingsByCategory } from "../lib/lib";

export default function SpendingLegend() {
  const { settings } = useContext(UserSettings);
  const { expenses } = useContext(ExpensesCtx);
  const spendingData = getSpendingsByCategory(expenses);
  const userCategories = settings.categories;

  //sort the spending data by amount
  spendingData.sort((a, b) => b.amount - a.amount);

  return (
    <ul>
      {spendingData.map((category, index) => {
        const color = userCategories.find(
          (item) => item.name.toLowerCase() === category.name.toLowerCase()
        )?.color;
        const emoji = userCategories.find(
          (item) => item.name.toLowerCase() === category.name.toLowerCase()
        )?.emoji;
        
        return (
          <li
            key={`${category}_${index}`}
            className="flex flex-row justify-start items-center pb-4 text-sm text-secondary"
          >
            {emoji && (
              <span className="text-md mr-2">{emoji}</span>
            )}
            <span
              style={{ backgroundColor: color || "#000" }}
              className={`w-4 h-4 inline-block mr-2 rounded-full`}
            ></span>
            <span>
              <b>{category.name}</b>: {formatUSD(category.amount)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
