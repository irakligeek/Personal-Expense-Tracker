import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`${props.className} flex h-10 rounded-md border border-input 
     bg-background text-sm ${
       props.type === "color" ? "cursor-pointer" : "px-3 py-2"
     }
      ring-offset-background file:border-0 file:bg-transparent 
      file:text-sm file:font-medium placeholder:text-muted-foreground
       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
       focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-transparent w-full`}
    />
  );
});

export default Input;
