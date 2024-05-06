import { MdOutlineEventRepeat } from "react-icons/md";
import { BsArrowRepeat } from "react-icons/bs";

export default function SpendingBreakdown({ spendingDetails }) {
  const spendingSorted = (spendingDetails = spendingDetails.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  ));

  return spendingSorted && spendingSorted.length > 0 ? (
    <div className="w-full ">
      <div
        className="grid grid-cols-3 text-sm text-secondary 
      mb-2 pb-2 mt-2 border-b-2 border-zinc-200"
      >
        <span className="font-semibold">Date</span>
        <span className="font-semibold">Description</span>
        <span className="font-semibold ml-auto">Amount</span>
      </div>
      <ul className="max-h-[1024px] overflow-y-scroll text-secondary border-b border-zinc-600">
        {spendingSorted.map((detail, index) => {
          let amount = detail.amount;
          //calculate total monthyl if reoccuring expense, it can be weekly, monthly or daily
          const now = new Date();
          const daysInMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0
          ).getDate();
          const weeksInMonth = Math.ceil(daysInMonth / 7);

          if (detail.reoccuringFrequency === "daily")
            amount = detail.amount * daysInMonth;
          if (detail.reoccuringFrequency === "weekly")
            amount = detail.amount * weeksInMonth;

          return (
            <li
              key={index}
              className="text-sm grid grid-cols-3 pb-3 last:pb-0 border-b
           border-zinc-200 last:border-0 mb-2 first:mt-2"
            >
              <span>
                {detail.reoccuringFrequency ? (
                  <span className="text-xs text-gray-400">
                    <BsArrowRepeat className="inline-block mr-2 text-lg" />
                    {detail.reoccuringFrequency.charAt(0).toUpperCase() +
                      detail.reoccuringFrequency.slice(1)}
                  </span>
                ) : (
                  new Date(detail.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                )}
              </span>
              <span> {detail.name}</span>
              <span className="ml-auto">${amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <p>No spending found</p>
  );
}
