import SpendingBarInfo from "./components/SpendingBarInfo";
import Divider from "./components/UI/Divider";
import SpendingChart from "./components/SpendingChart";
import Section from "./components/UI/Section";
import SpendingsTable from "./components/SpendingsTable";
import HeadingMain from "./components/UI/HeadingMain";
import SpendingLegend from "./components/SpendingLegend";
import { getCurrentMonthDates } from "./(dashboard)/lib/lib";
import { getSpendingsByCategory } from "./(dashboard)/lib/lib";
import UserSettingsCtx from "./context/userContext";
export default async function Home() {
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const base_ur = process.env.BASE_URL;

  async function fetchSettings() {
    try {
      const response = await fetch(`${base_ur}/api/settings/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        //  next: { revalidate: 1 }, //@todo, remove this in prod. For testing ONLY
      });

      const data = await response.json();

      if (data && data?.result) {
        return data.result;
      }

      return false;
    } catch (error) {
      console.error("Error", error);
      throw new Error("Error occurred while fetching user settings");
    }
  }

  async function fetchSpendings(start, end) {
    try {
      const response = await fetch(
        `${base_ur}/api/expenses?date_start=${start}&date_end=${end}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // next: { revalidate: 1 }, //@todo, remove this in prod. For testing ONLY
        }
      );

      const spendings = await response.json();

      return spendings;
    } catch (error) {
      console.error("Error", error);
    }
  }

  const settings = await fetchSettings();

  const spendings = await fetchSpendings(...getCurrentMonthDates());

  let totalMonthlySpendings = [];
  let totalSpending = 0;
  let allSpending = false;

  if (spendings && spendings?.result && spendings.result.length > 0) {
    allSpending = spendings.result;

    totalMonthlySpendings = getSpendingsByCategory(spendings.result);

    totalSpending = totalMonthlySpendings
      .reduce((total, item) => total + parseFloat(item.amount), 0)
      .toFixed(2);
  }

  return (
    <UserSettingsCtx settings={settings}>
      <Section classes="flex flex-col max-w-2xl">
        <HeadingMain>Your total spending for {currentMonth}</HeadingMain>

        <div className="flex flex-row justify-between flex-wrap gap-6 md:gap-8">
          <SpendingChart
            month={currentMonth}
            monthylSpendingData={allSpending}
          />
          <SpendingLegend spendingData={totalMonthlySpendings} />
        </div>
        <SpendingBarInfo totalSpending={totalSpending} />
      </Section>
      <Divider />

      <SpendingsTable
        spendingsByCategory={totalMonthlySpendings}
        spendings={allSpending}
      />
    </UserSettingsCtx>
  );
}
