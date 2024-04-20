"use client";
import { formatUSD } from "../lib/utils";
import { useContext } from "react";
import { UserSettings } from "../context/userContext";
export default async function SpendingBarInfo({ totalSpending }) {
  const { settings } = useContext(UserSettings);

  const monthlyBudget = settings.budget;

  const percentageSpent = ((totalSpending / monthlyBudget) * 100).toFixed(2);
  const percentageSpentRound = Math.ceil(percentageSpent);

  let spendingBarBGcolor = "#1976D2";
  if (percentageSpentRound > 49 && percentageSpentRound <= 80) {
    spendingBarBGcolor = "#ffc107";
  } else if (percentageSpentRound > 79 && percentageSpentRound < 90) {
    spendingBarBGcolor = "#1976D2";
  } else if (percentageSpentRound > 89) {
    spendingBarBGcolor = "#FF4500";
  }

  return (
    <div>
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
        {formatUSD(Math.ceil(totalSpending))} of{" "}
        {formatUSD(Math.ceil(monthlyBudget))} spent
      </div>
    </div>
  );
}
