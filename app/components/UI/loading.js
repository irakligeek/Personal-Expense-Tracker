import "react-loading-skeleton/dist/skeleton.css";
export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-full h-full p-10 flex justify-center items-start">
      <p className="h-full text-gray-400 text-sm">Loading...</p>
    </div>
  );
}
