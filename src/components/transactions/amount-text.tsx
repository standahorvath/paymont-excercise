import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { type TransactionType } from "@/types"

type AmountTextProps = {
  amountMinor: number
  currency: string
  type: TransactionType
  className?: string
}

export const AmountText = ({
  amountMinor,
  currency,
  type,
  className,
}: AmountTextProps) => {
  const isCredit = type === "credit"

  return (
    <span
      className={cn(
        "font-medium tabular-nums",
        isCredit
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400",
        className,
      )}
    >
      {isCredit ? "+" : "−"} {formatMoney(Math.abs(amountMinor), currency)}
    </span>
  )
}
