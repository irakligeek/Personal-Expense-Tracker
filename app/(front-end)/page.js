import { spendingCategories } from "../(dashboard)/lib";
import Divider from "../components/UI/Divider";
import SpendingByCategory from "../components/SpendingByCategory";
import { MdOutlineCalendarMonth } from "react-icons/md";

export default function Home() {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const currentMonth = date.toLocaleString("en-US", { month: "long" });

  return (
    <>
      {/* Heading with pie chart of current month's spending */}
      <section className="py-8 px-8 flex flex-col">
        <div className="pb-4 text-zinc-500 self-end flex items-center gap-1">
          <MdOutlineCalendarMonth />
          {formattedDate}
        </div>
        <h5>Your total spending for {currentMonth}</h5>
        <div>Pie Chart goes here, broken down by spending categories</div>
      </section>
      <Divider />
      {/* Spending categories */}
      <div className="py-8 px-8 max-w-2xl">
        <h5>Your spending by categories</h5>
        {spendingCategories.map((category) => (
          <SpendingByCategory
            key={category.id}
            category={category}
            amount="$34.5"
          />
        ))}
      </div>
    </>
  );
}
