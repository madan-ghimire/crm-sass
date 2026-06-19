// import * as React from "react";
// import { Input as InputPrimitive } from "@base-ui/react/input";

// import { cn } from "@/lib/utils";

// interface InputProps extends React.ComponentProps<"input"> {
//   leadingIcon?: React.ReactNode;
//   trailingIcon?: React.ReactNode;
//   prefix?: string;
//   suffix?: string;
//   wrapperClassName?: string;
// }

// function Input({ className, type, ...props }: InputProps) {
//   const hasWrapper = leadingIcon || trailingIcon || prefix || suffix;
//   return (
//     <InputPrimitive
//       type={type}
//       data-slot="input"
// className={cn(
//   "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
//   className,
// )}
//       {...props}
//     />
//   );
// }

// export { Input };

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  wrapperClassName?: string;
}

function Input({
  className,
  type,
  leadingIcon,
  trailingIcon,
  prefix,
  suffix,
  wrapperClassName,
  ...props
}: InputProps) {
  const hasWrapper = leadingIcon || trailingIcon || prefix || suffix;

  const inputEl = (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 bg-transparent text-base outline-none transition-colors",
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "placeholder:text-muted-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        "md:text-sm",
        hasWrapper
          ? "flex-1 px-2.5 py-1"
          : "rounded-lg border border-input px-2.5 py-1 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );

  if (!hasWrapper) return inputEl;

  return (
    <div
      data-slot="input-wrapper"
      className={cn(
        "flex h-8 w-full items-center",
        "rounded-lg border border-input bg-transparent",
        "transition-colors",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        "has-[input[disabled]]:pointer-events-none has-[input[disabled]]:cursor-not-allowed has-[input[disabled]]:opacity-50",
        "has-[input[aria-invalid]]:border-destructive has-[input[aria-invalid]]:ring-3 has-[input[aria-invalid]]:ring-destructive/20",
        "dark:bg-input/30 dark:disabled:bg-input/80",
        wrapperClassName,
      )}
    >
      {prefix && (
        <span className="flex h-full items-center border-r border-input bg-muted/40 px-2.5 text-sm text-muted-foreground select-none">
          {prefix}
        </span>
      )}

      {leadingIcon && !prefix && (
        <>
          <span className="flex items-center pl-2.5 text-muted-foreground [&>svg]:size-4">
            {leadingIcon}
          </span>
          <span className="mx-2 h-4 w-px bg-border" aria-hidden />
        </>
      )}

      {inputEl}

      {trailingIcon && !suffix && (
        <span className="flex items-center pr-2.5 text-muted-foreground [&>svg]:size-4">
          {trailingIcon}
        </span>
      )}

      {suffix && (
        <span className="flex h-full items-center border-l border-input bg-muted/40 px-2.5 text-sm text-muted-foreground select-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

export { Input };
export type { InputProps };
