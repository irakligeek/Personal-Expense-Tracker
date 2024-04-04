// Get the user's spending details by category, month, and year, this will be pulled from the database
export const spendingDetails = (category, month, year) => {
  month = month || new Date().getMonth() + 1;
  year = year || new Date().getFullYear();

  const details = [
    { name: "buy medicine", amount: 35, date: "Mar 28, 2024" },
    { name: "buy medicine", amount: 45, date: "Mar 20, 2024" },
    { name: "Grab drinks", amount: 120, date: "Feb 27 2024" },
  ];

  return details;
};

// Get the current month's start and end dates
export const getCurrentMonthDates = () => {
  const date = new Date();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const startDate = firstDayOfMonth.toISOString().split("T")[0];
  const endDate = lastDayOfMonth.toISOString().split("T")[0];

  return [startDate, endDate];
};

// Get the user's spending by category summing up all category spendings
export const getSpendingsByCategory = (spendings) => {
  //@todo add category colors
  const combinedSpendings = spendings.reduce((acc, spending) => {
    const existingCategory = acc.find(
      (item) => item.name.toLowerCase() === spending.category.toLowerCase()
    );

    if (existingCategory) {
      existingCategory.amount = (
        parseFloat(existingCategory.amount) + parseFloat(spending.amount)
      ).toFixed(2);
    } else {
      acc.push({
        name: spending.category,
        amount: parseFloat(spending.amount).toFixed(2),
        // color: getCategoryColor(spending.category),
        color: "#000",
      });
    }

    return acc;
  }, []);

  return combinedSpendings;
};
