export default function Loading({children = "Loading...", className = ""}) {
  return (
    <div className={`h-full flex items-center justify-center ${className}`}>
      <p className="text-gray-400 text-sm ">{children}</p>
    </div>
  );
}
