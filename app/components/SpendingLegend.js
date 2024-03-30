import { formatUSD } from "../(dashboard)/lib/utils";
export default function SpendingLegend({spendingData}) {
  return (
    <ul>
      {spendingData.map((category, index) => {
        return (
          <li
            key={`${category}_${index}`}
            className="flex flex-row justify-start items-center pb-4 text-sm text-secondary"
          >
            <span
              style={{ backgroundColor: category.color }}
              className={`w-6 h-6 inline-block mr-2`}
            ></span>
            <span>
              <b>{category.title}</b>: {formatUSD(category.value)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
