"use client";
import Select from "react-select"; //https://react-select.com/styles
import Button from "./ui/Button";
import { getCurrentMonthDates } from "../lib/lib";
import { useContext, useState, useEffect } from "react";
import { ExpensesCtx } from "../context/expensesContext";
import AddExpenseButton from "./AddExpenseButton";
import AddNewButton from "../reoccuring-transactions/components/AddNewButton";

export default function SpendingsHeader() {
  // get current month
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const allMonths = [
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
  // find the option that matches the current month
  const defaultOption = allMonths.find(
    (option) => option.value === currentMonth
  );

  const startYear = 2022;
  const currentDate = new Date();
  const currentYear = new Date().getFullYear();

  const { expenses, setExpenses, setSpendingsDate } = useContext(ExpensesCtx);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [options, setOptions] = useState(allMonths);

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

  useEffect(() => {
    if (selectedYear === currentYear) {
      setOptions(
        allMonths.slice(
          0,
          allMonths.findIndex((month) => month.value === currentMonth) + 1
        )
      );
    } else {
      setOptions(allMonths);
    }
  }, [selectedYear, currentYear, currentMonth]);

  const fetchSpendings = (startDate, endDate, year) => {
    //Call the /expenses API to get the spendings for the selected month and year
    fetch(
      `/api/expenses?date_start=${startDate}&date_end=${endDate}&year=${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["expenses"] },
        // next: { revalidate: 1 }, //@todo, remove this in prod. For testing ONLY
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data?.result) {
          setExpenses(data.result);
        }
      })
      .catch((error) => {
        console.error("Error", error);
        return false;
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const month = formData.get("month");
    const year = formData.get("year");

    const date = new Date(month + " 1, 1970");
    const monthNumber = date.getMonth() + 1; // JavaScript months are 0-indexed
    const [monthStart, monthEnd] = getCurrentMonthDates(monthNumber);
    setSpendingsDate({
      month: month,
      year: year,
    });

    fetchSpendings(monthStart, monthEnd, year);

    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  return (
    <header
      className="py-4 px-6 flex md:items-center gap-4 md:flex-row flex-col
     items-start justify-between"
    >
      <div className="flex md:flex-row md:items-center gap-4 flex-col">
        <p className="text-gray-400 text-sm">Showing:</p>
        <form
          action=""
          className="flex justify-start md:items-center gap-5 flex-col sm:flex-row"
          onSubmit={handleFormSubmit}
        >
          <div className="flex gap-4">
            <Select
              className="min-w-32"
              options={options}
              defaultValue={defaultOption}
              placeholder={defaultOption.label}
              name="month"
              id="month"
              instanceId="month-select"
            />

            <Select
              options={optionsYears}
              defaultValue={defaultOptionYears}
              placeholder={defaultOptionYears.label}
              name="year"
              id="year"
              instanceId="year-select"
              onChange={(selectedOption) => {
                setSelectedYear(selectedOption.value);
              }}
            />
          </div>
          <Button
            loadingManually={loading}
            variant={"ghost"}
            className={`gap-4 border border-zinc-300 self-start w-full sm:w-auto max-h-full h-9`}
          >
            Apply
          </Button>
        </form>
      </div>
      <AddExpenseButton className="h-full w-30">Add New</AddExpenseButton>
      {/* <AddNewButton /> */}
    </header>
  );
}
