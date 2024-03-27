import {
  spendingCategories,
  getSpendingAmountByCategoryAndMonth,
  formatUSD,
} from "./(dashboard)/lib";
import Divider from "./components/UI/Divider";
import SpendingChart from "./components/SpendingChart";
import Section from "./components/UI/Section";
import SpendingsTable from "./components/SpendingsTable";
import HeadingMain from "./components/UI/HeadingMain";

export default function Home() {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const currentMonth = date.toLocaleString("en-US", { month: "long" });

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

  return (
    <>
      <Section classes="flex flex-col max-w-2xl">
        {/* <div className="pb-4 text-zinc-500 self-end flex items-center gap-1"> */}
        {/* <MdOutlineCalendarMonth /> */}
        {/* {formattedDate} */}
        {/* </div> */}
        <HeadingMain>Your total spending for {currentMonth}</HeadingMain>

        <div className="flex flex-row justify-between flex-wrap gap-6 md:gap-8">
          <SpendingChart />
          <ul>
            {spendingData.map((category, index) => {
              return (
                <li
                  key={`${category}_${index}`}
                  className="flex flex-row justify-start items-center pb-4 text-sm text-secondary"
                >
                  <span
                    style={{ backgroundColor: category.color }}
                    className={`w-6 h-6 inline-block mr-2`}
                  ></span>
                  <span>
                    <b>{category.title}</b>: {formatUSD(category.value)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>
      <Divider />
      <SpendingsTable />
    </>
  );
}
