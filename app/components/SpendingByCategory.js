import Divider from "./UI/Divider";

export default function SpendingByCategory({ category, amount, index }) {
  
  return (
    <div
      key={category.id}
      className={`border-b border-zinc-200 last:border-none 
      flex justify-between py-4 ${index !== undefined && index === 1 ? "pt-0" : ""}`}
    >
      <div>{category.name}</div>
      <div>{amount}</div>
    </div>
  );
}
