//Spending breakdown component - a user's list of individual spendings by category in a specified month

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
        {spendingSorted.map((detail, index) => (
          <li
            key={index}
            className="text-sm grid grid-cols-3 pb-3 last:pb-0 border-b
           border-zinc-200 last:border-0 mb-2 first:mt-2"
          >
            <span>
              {" "}
              {new Date(detail.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span> {detail.name}</span>
            <span className="ml-auto">${detail.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No spending found</p>
  );
}
