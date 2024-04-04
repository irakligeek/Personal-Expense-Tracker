"use client";
import { useState } from "react";
import { formatUSD } from "../(dashboard)/lib/utils";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SpendingBreakdown from "./SpendingBreakdown";
import { UserSettings } from "../context/userContext";
import { useContext } from "react";

export default function SpendingByCategory({
  spendingByCategories,
  category,
  amount,
  index,
  spendings,
}) {
  const { settings } = useContext(UserSettings);

  const userCategories = settings.categories;

  const color = userCategories.find(
    (item) => item.name.toLowerCase() === category.toLowerCase()
  )?.color;

  const [spendingDetailsOpen, setSpendingDetailsOpen] = useState(false);

  const totalAmount = spendingByCategories.reduce((acc, curr) => {
    return acc + +curr.amount;
  }, 0);

  const percentage = ((+amount / totalAmount) * 100).toFixed(2); // calculate percentage and round to 2 decimal places

  const spendingDetails = spendings.filter(
    (spending) => spending.category === category
  );

  return (
    <>
      <div
        className={` border-zinc-200 last:border-none 
      grid grid-cols-[1fr_0.5fr_0.5fr] py-4 ${
        index !== undefined && index === 0 ? "pt-0" : ""
      }
      ${!spendingDetailsOpen ? "border-b" : ""}
      `}
      >
        <button
          className="flex flex-row gap-2 md:gap-4 text-sm"
          onClick={() => setSpendingDetailsOpen(!spendingDetailsOpen)}
        >
          <span
            style={{ backgroundColor: color || "#000" }}
            className="w-6 h-6 block"
          ></span>
          <span className="flex items-center gap-2 text-left">
            {category}
            <span>
              <MdOutlineKeyboardArrowDown
                className={` transition-all text-xl ${
                  spendingDetailsOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </span>
          </span>
        </button>

        <div className=" self-end text-sm">{formatUSD(amount)}</div>
        <div className=" self-end text-sm justify-self-end">{percentage}%</div>
      </div>

      {spendingDetailsOpen && (
        <SpendingBreakdown spendingDetails={spendingDetails} />
      )}
    </>
  );
}
