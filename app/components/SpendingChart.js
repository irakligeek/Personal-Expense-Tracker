"use client";
import { spendingCategories, getSpendingAmountByCategory } from "../(dashboard)/lib";
import { PieChart } from "react-minimal-pie-chart"; //https://www.npmjs.com/package/react-minimal-pie-chart


// This component will render a pie chart of the user's spending by category,
//filtering out categories with no spending
export default function SpendingChart() {
  const chartData = spendingCategories
    .map((category) => {
      const catName = Object.values(category)[0];
      return {
        title: catName,
        value: +getSpendingAmountByCategory(catName, new Date().getMonth() + 1).amount,
        color: category.color,
      };
    })
    .filter((category) => category.value > 0);

  return (

    <div className=" max-w-96">
      <PieChart
        data={chartData}
        lineWidth={60}
        label={(label) => {
          return Math.round(label.dataEntry.percentage) + "%";
        }}
        labelStyle={(index) => ({
          fill: 'white',
          fontSize: '4px',
          // fontFamily: 'sans-serif',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'block',
          width: '100px',
          height: '20px',
        })}
        labelPosition={70}
        paddingAngle={1}
        viewBoxSize={[100, 100]}
      />
    </div>
  );
}
