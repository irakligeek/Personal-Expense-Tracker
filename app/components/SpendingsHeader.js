"use client";
import Select from "react-select"; //https://react-select.com/styles
import Button from "./ui/Button";
import { getCurrentMonthDates } from "../lib/lib";
import { useContext } from "react";
import { ExpensesCtx } from "../context/expensesContext";

export default function SpendingsHeader() {

  const { expenses, setExpenses } = useContext(ExpensesCtx);

  const options = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];
  // get current month
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  // find the option that matches the current month
  const defaultOption = options.find((option) => option.value === currentMonth);

  const startYear = 2022;
  const currentYear = new Date().getFullYear();

  const optionsYears = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => {
      const year = startYear + i;
      return { value: year, label: String(year) };
    }
  );

  const defaultOptionYears = optionsYears.find(
    (option) => option.value === currentYear
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const month = formData.get("month");
    const year = formData.get("year");
    //convert month into a number
    const date = new Date(month + " 1, 1970");
    const monthNumber = date.getMonth() + 1; // JavaScript months are 0-indexed
    const [monthStart, monthEnd] = getCurrentMonthDates(monthNumber);

    //Call the /expenses API to get the spendings for the selected month and year
    try {
      const response = await fetch(
        `/api/expenses?date_start=${monthStart}&date_end=${monthEnd}&year=${year}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { tags: ["expenses"] },
          // next: { revalidate: 1 }, //@todo, remove this in prod. For testing ONLY
        }
      );

      const data = await response.json();

      if(data && data.result){
        setExpenses(data.result);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <header className="py-4 px-6 flex md:items-center gap-4 md:flex-row flex-col items-start">
      <p className="text-gray-400 text-sm">Showing:</p>
      <form
        action=""
        className="flex md:flex-row justify-start md:items-center gap-5 flex-col"
        onSubmit={handleFormSubmit}
      >
        <div className="flex gap-4">
          <Select
            className="min-w-32"
            options={options}
            defaultValue={defaultOption}
            placeholder={defaultOption.label}
            name="month"
          />
          <Select
            options={optionsYears}
            defaultValue={defaultOptionYears}
            placeholder={defaultOptionYears.label}
            name="year"
          />
        </div>
        <Button>Apply</Button>
      </form>
    </header>
  );
}
