//This will be added by the user to categorize their spending
export const spendingCategories = [
  { name: "Groceries", id: 1, color: "#275cb2" },
  { name: "Rent", id: 2, color: "#424242" },
  { name: "Utilities", id: 3, color: "#030222" },
  { name: "Transportation", id: 4, color: "#a819e4" },
  { name: "Health", id: 5, color: "#b6f213" },
  { name: "Entertainment", id: 6, color: "#b19030" },
  { name: "Shopping", id: 8, color: "#c87197" },
  { name: "Other", id: 9, color: "#575a5d" },
  { name: "Car", id: 10, color: "#102e68" },
  { name: "Travel", id: 11, color: "#9e2759" },
  { name: "Food & Drinks", id: 14, color: "#387e6f" },
];

//This will be pulled from teh database
const monthlySpendings = [
  { name: "Groceries", amount: "64.5" },
  { name: "Rent", amount: "222.5" },
  { name: "Utilities", amount: "254.5" },
  { name: "Transportation", amount: "134.8" },
  { name: "Health", amount: "94.2" },
  { name: "Entertainment", amount: "13.5" },
  { name: "Shopping", amount: "310.5" },
  { name: "Other", amount: "0.00" },
  { name: "Car", amount: "54.5" },
  { name: "Travel", amount: "44.5" },
  { name: "Food & Drinks", amount: "402.1" },
];

//Gets the months of the current year up to the current month, with month number as key
// and month name as value
export const getMonthsOfCurrentYear = () => {
  const months = [];
  const currentMonth = new Date().getMonth() + 1;
  for (let month = 0; month < currentMonth; month++) {
    const monthName = new Date(new Date().getFullYear(), month).toLocaleString(
      "en-US",
      { month: "long" }
    );
    months.push({ [month + 1]: monthName });
  }
  return months;
};

// Get the user's spending by month, and/or by category
//passing category as a string and a month number as a parameter
export const getSpendingAmountByCategoryAndMonth = (category, month) => {
  category = category || null;
  month = month || null;

  if (category) {
    const selectedCategory = monthlySpendings.filter((spending) => {
      return spending.name.toLowerCase() === category.toLowerCase();
    });
    return selectedCategory && selectedCategory.length > 0
      ? selectedCategory[0]
      : monthlySpendings;
  } else {
    return monthlySpendings;
  }
};


// This will be used to format the spending amount as USD
export const formatUSD = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};


export const getCategoryColor = (category) => {
  return spendingCategories.filter((cat) => cat.name.toLowerCase() === category.toLowerCase())[0].color;
}