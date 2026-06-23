import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { useTransactions } from "@/api/transactions/get-transactions"
import { QueryError } from "@/components/common/query-error"
import { RecentTransactionsSkeleton } from "@/components/skeleton/dashboard/recent-transactions-skeleton"
import { AmountText } from "@/components/transactions/amount-text"
import { CategoryLabel } from "@/components/transactions/category-label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RECENT_TRANSACTIONS_COUNT } from "@/config"
import { Route } from "@/enums"
import { formatDate } from "@/lib/format-date"

export const RecentTransactions = () => {
  const { t } = useTranslation(["dashboard", "transactions"])
  const { data, isPending, isError, refetch } = useTransactions({
    sort: { field: "date", dir: "desc" },
    page: 1,
    pageSize: RECENT_TRANSACTIONS_COUNT,
  })

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">
          {t("dashboard:recentTransactions")}
        </h2>
        <Button asChild variant="ghost" size="sm">
          <Link to={Route.transactions}>
            {t("dashboard:viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      {isError ? (
        <QueryError onRetry={() => refetch()} />
      ) : isPending ? (
        <RecentTransactionsSkeleton />
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("transactions:columns.date")}</TableHead>
                <TableHead>{t("transactions:columns.description")}</TableHead>
                <TableHead>{t("transactions:columns.category")}</TableHead>
                <TableHead className="text-right">
                  {t("transactions:columns.amount")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground tabular-nums">
                    {formatDate(tx.date)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {tx.description}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <CategoryLabel category={tx.category} />
                  </TableCell>
                  <TableCell className="text-right">
                    <AmountText
                      amountMinor={tx.amountMinor}
                      currency={tx.currency}
                      type={tx.type}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </section>
  )
}
