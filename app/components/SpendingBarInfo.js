"use client";
import { formatUSD } from "../lib/utils";
import { useContext } from "react";
import { UserSettings } from "../context/userContext";
import { ExpensesCtx } from "../context/expensesContext";

export default function SpendingBarInfo( ) {
  const { settings } = useContext(UserSettings);
  const { expenses } = useContext(ExpensesCtx);

  
  //get total spending amount from the expenses adding all the 'amount' fields
  const total = expenses
    .reduce((acc, expense) => {
      return acc + parseFloat(expense.amount);
    }, 0)
    .toFixed(2);

  if (!total) return null;

  const monthlyBudget = settings.budget;

  const percentageSpent = Math.ceil(
    (total / monthlyBudget) * 100
  )?.toFixed(2);

  let spendingBarBGcolor = "#1976D2";
  if (percentageSpent > 49 && percentageSpent <= 80) {
    spendingBarBGcolor = "#ffc107";
  } else if (percentageSpent > 79 && percentageSpent < 90) {
    spendingBarBGcolor = "#1976D2";
  } else if (percentageSpent > 89) {
    spendingBarBGcolor = "#FF4500";
  }

  return (
    <div className="pt-6">
      <div className="text-xs text-zinc-500 mb-2">
        {percentageSpent}% of total budget spent
      </div>
      <div className="bg-zinc-200 h-2 rounded-xl overflow-hidden w-full mb-2">
        <div
          className="h-full"
          style={{
            width: `${percentageSpent}%`,
            backgroundColor: `${spendingBarBGcolor}`,
          }}
        ></div>
      </div>
      <div>
        {formatUSD(Math.ceil(total))} of{" "}
        {formatUSD(Math.ceil(monthlyBudget))} spent
      </div>
    </div>
  );
}
