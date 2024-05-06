import Panel from "../components/ui/Panel";
import { Suspense } from "react";
import Loading from "../components/ui/loading";

import ReoccuringExpensesForm from "./components/ReoccuringExpensesForm";
const base_url = process.env.BASE_URL;

export default async function ReoccuringExpenses() {
  return (
    <Panel>
      <Suspense fallback={<Loading />}>
        <ExpensesList />
      </Suspense>
    </Panel>
  );
}

async function fetchReoccurringExpenses() {
  //delay the fetch to show the loading spinner
  // await new Promise((resolve) => setTimeout(resolve, 100000));

  try {
    const response = await fetch(`${base_url}/api/reoccuring-expense`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem fetching the expenses:", error);
  }
}

async function ExpensesList() {
  const data = await fetchReoccurringExpenses();
  return <ReoccuringExpensesForm data={data?.reoccurringExpenses} />;
}
