import {
  spendingCategories,
  getSpendingAmountByCategoryAndMonth,
  monthlySpendings,
  getCategoryColor,
} from "./(dashboard)/lib/lib";
import SpendingBarInfo from "./components/SpendingBarInfo";
import Divider from "./components/UI/Divider";
import SpendingChart from "./components/SpendingChart";
import Section from "./components/UI/Section";
import SpendingsTable from "./components/SpendingsTable";
import HeadingMain from "./components/UI/HeadingMain";
import SpendingLegend from "./components/SpendingLegend";

export default function Home() {
  const formattedDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

  const spendingData = monthlySpendings
    .map((spending) => {
      return {
        title: spending.name,
        value: +spending.amount,
        color: getCategoryColor(spending.name),
      };
    })
    .filter((category) => category.value > 0)
    .sort((a, b) => b.value - a.value);

  const totalSpending = spendingData.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <>
      <Section classes="flex flex-col max-w-2xl">
        <HeadingMain>Your total spending for {currentMonth}</HeadingMain>

        <div className="flex flex-row justify-between flex-wrap gap-6 md:gap-8">
          <SpendingChart month={currentMonth} totalSpending={totalSpending} />
          <SpendingLegend spendingData={spendingData} />
        </div>
        <SpendingBarInfo totalSpending={totalSpending} />
      </Section>
      <Divider />
      <SpendingsTable />
    </>
  );
}
