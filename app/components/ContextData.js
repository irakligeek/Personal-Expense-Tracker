"use client";
import { useContext, useEffect } from "react";
import { SpendingContext } from "../context/context";
export default function ContextData({ children, spendings }) {
    // set spending data in context so any children can access the context data
    const { setSpendingData, monthylSpendingData } = useContext(SpendingContext);
    useEffect(() => {
        setSpendingData(spendings);
    }, [spendings]);
    
  return <>{children}</>;
}
