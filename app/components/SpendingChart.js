"use client";
import { formatUSD } from "../lib/utils";
import { PieChart } from "react-minimal-pie-chart"; //https://www.npmjs.com/package/react-minimal-pie-chart
import { getSpendingsByCategory } from "../lib/lib";
import { UserSettings } from "../context/userContext";
import { useContext } from "react";

// This component will render a pie chart of the user's spending by category,
//filtering out categories with no spending
export default function SpendingChart({ month, spendingData }) {
  const { settings } = useContext(UserSettings);
  const userCategories = settings.categories;

  const totalMonthlySpendings = getSpendingsByCategory(spendingData);

  if (totalMonthlySpendings.length === 0) {
    return <p className="text-gray-500">No spending for this month 👍</p>;
  }
  
  const chartData = totalMonthlySpendings.map((data) => {
    const color = userCategories.find(
      (item) => item.name.toLowerCase() === data.name.toLowerCase()
    )?.color;

    return {
      title: data.name,
      value: parseFloat(data.amount),
      color: color || "#000",
    };
  });

  const totalSpending = totalMonthlySpendings
    .reduce((total, item) => total + parseFloat(item.amount), 0)
    .toFixed(2);

  return (
    <div className="max-w-96 relative">
      <div
        className="absolute top-[calc(50%_-_30px)] w-[200px] left-[calc(50%_-_100px)] 
      text-center h-[60px] flex flex-col items-center justify-center bg-white"
      >
        <span className="block border-b border-zinc-200 pb-1 text-sm md:text-base">
          Total {month} spending
        </span>
        <span className="pt-1 block text-xl md:text-2xl">
          {formatUSD(Math.ceil(totalSpending))}
        </span>
      </div>
      <PieChart
        data={chartData}
        lineWidth={20}
        labelPosition={70}
        paddingAngle={1}
        viewBoxSize={[100, 100]}
      />
    </div>
  );
}
