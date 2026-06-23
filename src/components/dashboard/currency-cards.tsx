import { TrendingDown, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useBalances } from "@/api/balance/get-balance"
import { PriceAnimate } from "@/components/animation/price-animate"
import { QueryError } from "@/components/common/query-error"
import { CurrencyCardsSkeleton } from "@/components/skeleton/dashboard/currency-cards-skeleton"
import { Card } from "@/components/ui/card"
import { CurrencyIcon } from "@/components/ui/currency-icon"
import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"

type DeltaProps = {
  deltaMinor: number
  currency: string
  label: string
}

const Delta = ({ deltaMinor, currency, label }: DeltaProps) => {
  if (deltaMinor === 0) {
    return <span className="text-xs text-muted-foreground">— / {label}</span>
  }

  const isUp = deltaMinor > 0
  const Icon = isUp ? TrendingUp : TrendingDown

  return (
    <span
      className={cn(
        "flex items-center gap-1 text-xs tabular-nums",
        isUp
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-rose-600 dark:text-rose-400",
      )}
    >
      <Icon className="size-3.5" />
      {isUp ? "+" : "−"} {formatMoney(Math.abs(deltaMinor), currency)} / {label}
    </span>
  )
}

export const CurrencyCards = () => {
  const { t } = useTranslation("dashboard")
  const { data: balances, isPending, isError, refetch } = useBalances()

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">
          {t("currencyAccounts")}
        </h2>
      </div>

      {isError ? (
        <QueryError onRetry={() => refetch()} />
      ) : isPending ? (
        <CurrencyCardsSkeleton />
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-1">
          {balances.map((balance) => (
            <Card key={balance.currency} className="min-w-56 flex-1 gap-3 p-5">
              <div>
                <CurrencyIcon currency={balance.currency} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">
                  {t("availableBalance")}
                </span>
                <PriceAnimate
                  amountMinor={balance.availableMinor}
                  currency={balance.currency}
                  className="text-xl font-semibold"
                />
              </div>
              <Delta
                deltaMinor={balance.deltaMinor}
                currency={balance.currency}
                label={t("last7d")}
              />
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
