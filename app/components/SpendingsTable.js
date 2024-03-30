import {
  getSpendingAmountByCategoryAndMonth,
} from "../(dashboard)/lib/lib";
import Section from "./UI/Section";
import SpendingByCategory from "./SpendingByCategory";
import HeadingMain from "./UI/HeadingMain";
export default function SpendingsTable() {
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

      {getSpendingAmountByCategoryAndMonth(null, new Date().getMonth() + 1)
        .sort((a, b) => b.amount - a.amount)
        .filter((category) => category.amount > 0)
        .map((category, index) => (
          <SpendingByCategory
            key={index}
            category={category.name}
            amount={category.amount}
            index={index}
          />
        ))}

    </Section>
  );
}
