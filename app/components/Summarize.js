"use client";
import { ExpensesCtx } from "../context/expensesContext";
import { useContext, useState, useEffect } from "react";
import Panel from "./ui/Panel";
import { Spinner } from "./ui/LoadingAnimations";

export default function Summarize() {
  const { expenses, spendingsDate } = useContext(ExpensesCtx);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      const response = await fetch("/api/ai/summarize-spendings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spendings: expenses,
          year: spendingsDate.year,
          month: spendingsDate.month,
        }),
      });

      const data = await response.json();
      if (data && data?.result) {
        setSummary(data.result);
        setLoading(false);
      }
    }

    fetchSummary();
  }, [expenses]);

  return (
    <Panel>
      <div
        //   Add stylish border left to the panel
        className={`section-padding leading-relaxed 
        bg-blue-200 text-zinc-700 border-l-4 border-blue-500 pl-4`}
      >
        <div className="flex flex-row gap-4">
          <div className="relative">
            <h6 className="text-lg pb-2 flex flex-row items-center">
              {loading ? (
                <span className="flex justify-center items-center gap-3">
                  Loading AI summary
                  <Spinner />
                </span>
              ) : (
                <span className="pr-4">
                  Here is your AI summary for your spending
                </span>
              )}
            </h6>
            <div
              className={`transition-all duration-500 overflow-hidden max-w-full w-fit 
                ${
                  loading === true
                    ? "h-0 opacity-0 absolute duration-100"
                    : "relative h-auto opacity-100 duration-500"
                }`}
            >
              <p className="text-sm leading-relaxed">{summary}</p>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
