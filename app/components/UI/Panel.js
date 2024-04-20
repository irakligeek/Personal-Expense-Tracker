// Basic section component with the paddings
export default function Panel({ children, classes }) {
  return <section className="relative flex flex-col max-w-4xl border-b border-zinc-200 h-full">{children}</section>;
}
