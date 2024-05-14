import SpendingBarInfo from "./components/SpendingBarInfo";
import SpendingChart from "./components/SpendingChart";
import Panel from "./components/ui/Panel";
import SpendingsTable from "./components/SpendingsTable";
import HeadingMain from "./components/ui/HeadingMain";
import SpendingLegend from "./components/SpendingLegend";
import { getCurrentMonthDates } from "./lib/lib";
import UserSettingsCtx from "./context/userContext";
import Subheading from "./components/ui/Subheading";
import SpendingsHeader from "./components/SpendingsHeader";
import ExpensesContext from "./context/expensesContext";
import Summarize from "./components/Summarize";

const base_url = process.env.BASE_URL;

export default async function Home() {
  //@todo get reoccuring monthly expenses

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
  const settings = await fetchSettings();

  const spendings = await fetchSpendings(...getCurrentMonthDates());

  // console.log("spendings", spendings);

  return (
    <UserSettingsCtx settings={settings}>
      <ExpensesContext data={spendings}>
        {/* <div className="w-full flex justify-end mb-4"> 
           <AddExpenseButton /> 
         </div> */}
        <Summarize />
        <Panel className="min-h-1">
          <SpendingsHeader />
        </Panel>
        <Panel classes="flex flex-col max-w-2xl">
          <div className="section-padding">
            <header>
              <HeadingMain>Total spendings</HeadingMain>
              <Subheading>Your spendings summary</Subheading>
            </header>

            <div className="flex flex-row justify-between flex-wrap gap-6 md:gap-8">
              <SpendingChart />
              <SpendingLegend />
            </div>
            <SpendingBarInfo />
          </div>

          <div className="section-padding">
            <SpendingsTable />
          </div>
        </Panel>
      </ExpensesContext>
    </UserSettingsCtx>
  );
}
