import * as React from "react"

const Progress = React.forwardRef(({ className = "", value = 0, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-zinc-800 ${className}`}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-green-700 transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
})

Progress.displayName = "Progress"

export { Progress }