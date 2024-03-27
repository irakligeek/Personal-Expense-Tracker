//Spending breakdown component - a user's list of individual spendings by category in a specified month
//@todo This component will be updated to pull data from the database
export default function SpendingBreakdown() {
  return (
    <ul className=" max-h-[1024px] overflow-y-scroll">
      <li className="text-sm">Get Gas $40</li>
      <li className="text-sm">buy medicine $30</li>
      <li className="text-sm">Go out $90</li>
    </ul>
  );
}
