import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// cn function used to merger tailwind classNames
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
