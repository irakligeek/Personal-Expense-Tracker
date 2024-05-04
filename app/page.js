import SpendingBarInfo from "./components/SpendingBarInfo";
import SpendingChart from "./components/SpendingChart";
import Panel from "./components/ui/Panel";
import SpendingsTable from "./components/SpendingsTable";
import HeadingMain from "./components/ui/HeadingMain";
import SpendingLegend from "./components/SpendingLegend";
import { getCurrentMonthDates, getSpendingsByCategory } from "./lib/lib";
import UserSettingsCtx from "./context/userContext";
import Subheading from "./components/ui/Subheading";
import AddExpenseButton from "./components/AddExpenseButton";
import SpendingsHeader from "./components/SpendingsHeader";

export default async function Home() {
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const base_url = process.env.BASE_URL;

  async function fetchSettings() {
    try {
      const response = await fetch(`${base_url}/api/settings/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 1 }, //@todo, remove this in prod. For testing ONLY
      });

      const data = await response.json();

      if (data && data?.result) {
        return data.result;
      }

      return false;
    } catch (error) {
      throw new Error("Error occurred while fetching user settings", error);
    }
  }

  async function fetchSpendings(startDate, endDate) {
    try {
      const response = await fetch(
        `${base_url}/api/expenses?date_start=${startDate}&date_end=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { tags: ["expenses"] },
          // next: { revalidate: 1 }, //@todo, remove this in prod. For testing ONLY
        }
      );

      const spendings = await response.json();

      return spendings;
    } catch (error) {
      console.error("Error", error);
    }
  }

  //@todo get reoccuring monthly expenses

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
      <div className="w-full flex justify-end mb-4">
        <AddExpenseButton>Add Expense</AddExpenseButton>
      </div>

      <Panel>
        <SpendingsHeader/>
      </Panel>
      <Panel classes="flex flex-col max-w-2xl">
        {totalMonthlySpendings.length === 0 ? (
          <p className="text-gray-500 py-10 px-8">
            No spendings for this month 👍
          </p>
        ) : (
          <>
            <div className="section-padding border-b border-gray-200">
              <header>
                <HeadingMain>Total spending</HeadingMain>
                <Subheading>
                  Your spendings for the current month ({currentMonth})
                </Subheading>
              </header>

              <div className="flex flex-row justify-between flex-wrap gap-6 md:gap-8">
                <SpendingChart
                  month={currentMonth}
                  monthylSpendingData={allSpending}
                />
                <SpendingLegend spendingData={totalMonthlySpendings} />
              </div>

              <SpendingBarInfo totalSpending={totalSpending} />
            </div>

            <div className="section-padding">
              <SpendingsTable
                spendingsByCategory={totalMonthlySpendings}
                spendings={allSpending}
              />
            </div>
          </>
        )}
      </Panel>
    </UserSettingsCtx>
  );
}
