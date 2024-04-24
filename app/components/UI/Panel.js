// Basic section component with the paddings
export default function Panel({ children, classes }) {
  return (
    <section className="relative flex flex-col max-w-4xl border-b
    border-zinc-200 rounded-md bg-white mb-12
     md:min-w-[768px] md:border-l md:border-r md:border-t ">
      {children}
    </section>
  );
}