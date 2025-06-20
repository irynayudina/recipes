import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "flex pr-10 h-12 w-full rounded-lg border-2 border-orange-200 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors appearance-none",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
        </div>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }