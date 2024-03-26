// import Divider from "./UI/Divider";
"use client";
import { useState } from "react";
import {
  getSpendingAmountByCategoryAndMonth,
  formatUSD,
  getCategoryColor,
} from "../(dashboard)/lib";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function SpendingByCategory({ category, amount, index }) {
  const [spendingDetailsOpen, setSpendingDetailsOpen] = useState(false);
  const totalMonthlySpendings = getSpendingAmountByCategoryAndMonth(
    null,
    new Date().getMonth() + 1
  ).reduce((acc, curr) => {
    return acc + +curr.amount;
  }, 0);

  const percentage = ((+amount / totalMonthlySpendings) * 100).toFixed(2); // calculate percentage and round to 2 decimal places

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
          className="flex flex-row gap-4 text-sm"
          onClick={() => setSpendingDetailsOpen(!spendingDetailsOpen)}
        >
          <span
            style={{ backgroundColor: getCategoryColor(category) }}
            className="w-6 h-6 block"
          ></span>
          <span className="flex items-center gap-2">
            {category}
            <span>
              <MdOutlineKeyboardArrowDown className={` transition-all text-xl ${spendingDetailsOpen ? 'rotate-0' : '-rotate-90'}`} />
            </span>
          </span>
        </button>

        <div className=" self-end text-sm">{formatUSD(amount)}</div>
        <div className=" self-end text-sm">{percentage}%</div>
      </div>

      {/* Spenging breakdown by name */}
      {spendingDetailsOpen && (
        <div className="w-full bg-zinc-100 p-4">
          <ul className=" max-h-[1024px] overflow-y-scroll">
            <li className="text-sm">Get Gas $40</li>
            <li className="text-sm">buy medicine $30</li>
            <li className="text-sm">Go out $90</li>
          </ul>
        </div>
      )}
    </>
  );
}
