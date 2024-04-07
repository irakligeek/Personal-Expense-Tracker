import { TailSpin } from "react-loading-icons";
export default function Button({
  children,
  className,
  variant,
  loading,
  ...props
}) {
  const bg_color =
    variant === "ghost"
      ? "bg-transparent text-gray-900 border hover:bg-gray-100"
      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white min-w-32 shadow-sm";
  return (
    <button
      className={` ${className} inline-flex items-center px-4 py-2 border justify-center 
      border-transparent text-sm font-medium rounded-md shadow-sm  ${bg_color} 
       focus:outline-none focus:ring-2 focus:ring-offset-2 h-10`}
      {...props}
    >
      {loading ? (
        <span>
          <TailSpin className="w-full h-6" />
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
