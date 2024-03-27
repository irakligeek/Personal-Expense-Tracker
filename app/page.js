import {
  spendingCategories,
  getSpendingAmountByCategoryAndMonth,
  formatUSD,
  totalSpendingIncome,
} from "./(dashboard)/lib";
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

  const spendingData = spendingCategories
    .map((category) => {
      const catName = Object.values(category)[0];
      return {
        title: catName,
        color: category.color,
        value: +getSpendingAmountByCategoryAndMonth(
          catName,
          new Date().getMonth() + 1
        ).amount,
      };
    })
    .filter((category) => category.value > 0)
    .sort((a, b) => b.value - a.value);

  const totalSpending = spendingData.reduce(
    (total, item) => total + item.value,
    0
  );

  const percentageSpent = ((totalSpending / totalSpendingIncome) * 100).toFixed(2);

  const percentageSpentRound = Math.ceil(percentageSpent);

  let spendingBarBGcolor = "#1976D2";
  if (percentageSpentRound > 49 && percentageSpentRound <= 80) {
    console.log("EUS");
    spendingBarBGcolor = "#ffc107";
  } else if (percentageSpentRound > 79 && percentageSpentRound < 90) {
    spendingBarBGcolor = "#1976D2";
  } else if( percentageSpentRound > 89) {
    spendingBarBGcolor = "#FF4500";
  }
  
  return (
    <>
      <Section classes="flex flex-col max-w-2xl">
        <HeadingMain>Your total spending for {currentMonth}</HeadingMain>

        <div className="flex flex-row justify-between flex-wrap gap-6 md:gap-8">
          <SpendingChart month={currentMonth} totalSpending={totalSpending} />
          <SpendingLegend spendingData={spendingData} />
        </div>
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
            {formatUSD(totalSpending)} of {formatUSD(totalSpendingIncome)} spent
          </div>
        </div>
      </Section>
      <Divider />
      <SpendingsTable />
    </>
  );
}
