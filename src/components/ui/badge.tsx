import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-sans text-[11px] font-medium tracking-wide uppercase px-2.5 py-1",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        gold: "border-transparent bg-gold-soft text-ink",
        outline: "border-border-manuscript text-ink-soft",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
