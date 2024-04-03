import { getUserSettings } from "./db_queries";
const userId = "ika05010"; //This will be passed coming from the login session

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


//This will be pulled from the database, added by the user
export const totalSpendingIncome = async () => {
  try {
    const settings = await getUserSettings(userId);
    if (!settings) {
      throw new Error(`No settings found for user ${userId}`);
    }
    return settings?.monthly_budget;
  } catch (error) {
    console.error("Error occurred in totalSpendingIncome: ", error);
    // You can decide what to return in case of error
    return null;
  }
};

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


//@todo Get this data from the database
export const getCategoryColor = (category) => {
  return spendingCategories.filter(
    (cat) => cat.name.toLowerCase() === category.toLowerCase()
  )[0].color;
};

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
        color: getCategoryColor(spending.category),
      });
    }

    return acc;
  }, []);

  return combinedSpendings;
};
