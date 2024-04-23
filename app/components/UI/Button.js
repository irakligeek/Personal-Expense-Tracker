import { TailSpin } from "react-loading-icons";
import { useFormStatus } from "react-dom";

export default function Button({ children, className, variant, loading, ...props }) {
  let { pending } = useFormStatus();
  
  let bg_color = '';
  if(variant === "ghost") {
    bg_color = `bg-transparent text-gray-900 border hover:bg-gray-100 rounded-md shadow-sm px-4 py-2 h-10 
    ${
      pending ? "cursor-not-allowed" : "cursor-pointer"
    }`;
  } else if (variant === "link") { 
    bg_color = `text-red-500 hover:underline bg-transparent p-0`;
  } else {
    bg_color = `bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white min-w-32 shadow-sm rounded-md shadow-sm px-4 py-2 h-10  
    ${pending} ? 'bg-gray-500 hover:bg-gray-500' : ''`;
  }
  
  return (
    <button
      disabled={pending}
      className={` ${className} inline-flex items-center border justify-center 
      border-transparent text-sm font-medium ${bg_color} 
       focus:outline-none focus:ring-2 focus:ring-offset-2 
       ${pending ? "cursor-not-allowed" : "cursor-pointer"}`}
      {...props}
    >
      {(pending && variant !== 'link' && loading) ? (
        <span className="flex justify-center items-center gap-3">
          <TailSpin
            className=""
            stroke={variant == "ghost" ? "#000" : "#fff"}
            width={18}
          />
          <span>{children}</span>
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
