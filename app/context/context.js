"use client";

import { createContext, useEffect, useState } from "react";

export const HeaderContext = createContext(null);
export const SpendingContext = createContext([]);

async function fetchSpendings(start, end) {
  try {
    const response = await fetch(
      `/api/expenses/?date_start=${start}&date_end=${end}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 1 }, //@todo, remove this in prod. For testing ONLY
      }
    );
    if (!response.ok) {
      console.error("Error", error);
      throw new Error("Error fetching spendings data");
    }

    const data = await response.json();

    if (data && data?.result) {
      return data.result;
    }

    return false;
  } catch (error) {
    console.error("Error", error);
  }
}

export default function Context({ children }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState();
  const [monthylSpendingData, setSpendingData] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await fetchSpendings(...getCurrentMonthDates());

  //       setSpendingData(data);
  //     } catch (error) {
  //       console.error("Error", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <SpendingContext.Provider value={{ monthylSpendingData, setSpendingData }}>
      <HeaderContext.Provider value={{ isMobileMenuOpen, setMobileMenuOpen }}>
        {children}
      </HeaderContext.Provider>
    </SpendingContext.Provider>
  );
}
