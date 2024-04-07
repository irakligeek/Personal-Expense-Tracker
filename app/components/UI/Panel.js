// Basic section component with the paddings
export default function Panel({ children, classes }) {
  return <section className="flex flex-col max-w-4xl border-b border-zinc-200 h-full">{children}</section>;
}
