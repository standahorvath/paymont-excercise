import { cn } from "@/lib/utils"

type CurrencyIconProps = {
  currency: string
  className?: string
}

export const CurrencyIcon = ({ currency, className }: CurrencyIconProps) => (
  <img
    src={`/images/currency/${currency}.svg`}
    alt={currency}
    className={cn("h-9 w-9 shrink-0 rounded-4xl!", className)}
  />
)
