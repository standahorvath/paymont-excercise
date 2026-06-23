import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type TransactionType } from "@/types"

type TransactionTypeBadgeProps = {
  type: TransactionType
}

export const TransactionTypeBadge = ({ type }: TransactionTypeBadgeProps) => {
  const { t } = useTranslation("transactions")
  const isCredit = type === "credit"

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1",
        isCredit
          ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          : "border-rose-500/30 text-rose-600 dark:text-rose-400",
      )}
    >
      {isCredit ? (
        <ArrowDownLeft className="size-3" />
      ) : (
        <ArrowUpRight className="size-3" />
      )}
      {isCredit ? t("typeBadge.income") : t("typeBadge.expense")}
    </Badge>
  )
}
