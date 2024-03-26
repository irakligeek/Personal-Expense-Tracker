//This will be added by the user to categorize their spending
export const spendingCategories = [
  { name: "Groceries", id: 1, color: "#275cb2"},
  { name: "Rent", id: 2, color: "#424242" },
  { name: "Utilities", id: 3, color: "#030222" },
  { name: "Transportation", id: 4, color: "#a819e4" },
  { name: "Health", id: 5, color: "#b6f213" },
  { name: "Entertainment", id: 6, color: "#b19030" },
  { name: "Shopping", id: 8, color: "#c87197" },
  { name: "Other", id: 9, color: "#575a5d" },
  { name: "Car", id: 10, color: "#102e68"},
  { name: "Travel", id: 11, color: '#9e2759' },
  { name: "Food & Drinks", id: 14, color: "#387e6f"},
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

//This will be pulled from teh database to get the user's spending by momnth, 
//passing the month number as a parameter
export const getSpendingAmountByCategory = (category, month) => {
  category = category || null;
  month = month || null;
  const monthlySpendings = [
    { name: "Groceries", amount: "34.5" },
    { name: "Rent", amount: "222.5" },
    { name: "Utilities", amount: "254.5" },
    { name: "Transportation", amount: "134.8" },
    { name: "Health", amount: "94.2" },
    { name: "Entertainment", amount: "13.5" },
    { name: "Education", amount: "210.60" },
    { name: "Shopping", amount: "310.5" },
    { name: "Other", amount: "0.00" },
    { name: "Car", amount: "14.5" },
    { name: "Travel", amount: "44.5" },
    { name: "Food & Drinks", amount: "402.1" },
  ];

  if (category) {
    const selectedCategory = monthlySpendings.filter((spending) => {
      return spending.name.toLowerCase() === category.toLowerCase();
    });
    return selectedCategory && selectedCategory.length > 0 ? selectedCategory[0] : monthlySpendings;
  } else {
    return monthlySpendings;
  }
};

// This will eventually be pulled from the database to get total monthly spending for the current user
export const totalMonthlySpending = () => {
  return "$456.78";
};

// This will be used to format the spending amount as USD
export const formatUSD = (value) =>  {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}
