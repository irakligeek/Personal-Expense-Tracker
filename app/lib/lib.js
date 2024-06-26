// Get the month's start and end dates, if no month and year are provided,
//it will default to the current month and year
export const getCurrentMonthDates = (month = null) => {
  const date = new Date();
  //Month is long format like "January", "February", etc.
  //set current month if month is not provided, otherwise set the month provided
  if (month) {
    month = month - 1; // JavaScript months are 0-indexed
    date.setMonth(month);
  }

  //get first and last day of the month
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const startDate = firstDayOfMonth.toISOString().split("T")[0];
  const endDate = lastDayOfMonth.toISOString().split("T")[0];

  return [startDate, endDate];
};

// Get the user's spending by category summing up all category spendings
export const getSpendingsByCategory = (spendings) => {
  if (!spendings) {
    return [];
  }

  //@todo add category colors
  const combinedSpendings = spendings.reduce((acc, spending) => {
    const existingCategory = acc.find(
      (item) => item.name?.toLowerCase() === spending.category?.toLowerCase()
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
