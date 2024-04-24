"use client";
import Panel from "./ui/Panel";
import SpendingByCategory from "./SpendingByCategory";
import HeadingMain from "./ui/HeadingMain";
import { getSpendingsByCategory } from "../lib/lib";
import Subheading from "./ui/Subheading";
export default function SpendingsTable({ spendings }) {
  const spendingsByCategory = getSpendingsByCategory(spendings);

  return (
    <>
      <HeadingMain>Spendings by categories</HeadingMain>
      <Subheading>Your spendings in details by category</Subheading>
      <div
        className={`border-b border-zinc-200 last:border-none flex justify-between 
        py-4 mb-4 text-sm text-secondary`}
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
            spendings={spendings}
          />
        ))}
    </>
  );
}
