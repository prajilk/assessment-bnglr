import * as React from "react";

import { cn } from "../../libs/utils";

const Input = React.forwardRef(
  ({ className, startIcon, endIcon, type, ...props }, ref) => {
    return (
      <div className="relative flex-1">
        <input
          type={type}
          className={cn(
            `${startIcon && "ps-10"} ${endIcon && "pe-20"} flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {startIcon}
          </div>
        )}
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {endIcon}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
