export default function Subheading({ children }) {
  return (
    <p className="mt-1 max-w-2xl text-sm text-gray-500 pb-4">
      <span>{children}</span>
    </p>
  );
}