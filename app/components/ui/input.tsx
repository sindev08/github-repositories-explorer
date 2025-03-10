import * as React from "react";
import { cn } from "~/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function Input({ className, type, startIcon, endIcon, ...props }: InputProps) {
  return (
    <div className="relative flex items-center w-full">
      {startIcon && (
        <div className="absolute left-3 text-muted-foreground">{startIcon}</div>
      )}
      <input
        type={type}
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          startIcon && "pl-10", // Jika ada ikon di kiri, tambahkan padding
          endIcon && "pr-10", // Jika ada ikon di kanan, tambahkan padding
          className
        )}
        {...props}
      />
      {endIcon && (
        <div className="absolute right-3 text-muted-foreground">{endIcon}</div>
      )}
    </div>
  );
}

export { Input };
