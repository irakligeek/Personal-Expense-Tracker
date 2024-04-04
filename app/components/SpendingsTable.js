"use client";
import Section from "./UI/Section";
import SpendingByCategory from "./SpendingByCategory";
import HeadingMain from "./UI/HeadingMain";
import { getSpendingsByCategory } from "../(dashboard)/lib/lib";
export default function SpendingsTable({ spendings }) {
  const spendingsByCategory = getSpendingsByCategory(spendings);

  return (
    <Section classes="max-w-2xl">
      <HeadingMain>Your spending by categories</HeadingMain>
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
    </Section>
  );
}
