import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";

export default function AddNewButton() {

  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      className={`h-12 gap-4 border border-zinc-300 self-end`}
      onClick={(e) => {
        e.preventDefault();
        router.push("/new-expense");
      }}
    >
      <span className="flex justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="text-sm">Add New</span>
      </span>
    </Button>
  );
}
