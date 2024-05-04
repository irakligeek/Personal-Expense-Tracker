'use client';
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
  
  return (
    <ul>
      {spendingData.map((category, index) => {
        const color = userCategories.find(
          (item) => item.name.toLowerCase() === category.name.toLowerCase()
        )?.color;
        return (
          <li
            key={`${category}_${index}`}
            className="flex flex-row justify-start items-center pb-4 text-sm text-secondary"
          >
            <span
              style={{ backgroundColor: color || "#000"}}
              className={`w-6 h-6 inline-block mr-2`}
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
