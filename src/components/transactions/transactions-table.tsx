import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { useTranslation } from "react-i18next"

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
import { formatDate } from "@/lib/format-date"
import { cn } from "@/lib/utils"
import {
  type TransactionSort,
  type TransactionSortField,
  type TransactionsPage,
} from "@/types"

import { AmountText } from "./amount-text"
import { CategoryLabel } from "./category-label"
import { TransactionTypeBadge } from "./transaction-type-badge"

type TransactionsTableProps = {
  data: TransactionsPage
  sort: TransactionSort
  onToggleSort: (field: TransactionSortField) => void
  onPageChange: (page: number) => void
}

export const TransactionsTable = ({
  data,
  sort,
  onToggleSort,
  onPageChange,
}: TransactionsTableProps) => {
  const { t } = useTranslation("transactions")
  const { items, total, page, pageSize } = data

  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  const SortIcon = ({ field }: { field: TransactionSortField }) => {
    if (field !== sort.field) {
      return <ArrowUpDown className="size-3.5 opacity-50" />
    }
    return sort.dir === "asc" ? (
      <ArrowUp className="size-3.5" />
    ) : (
      <ArrowDown className="size-3.5" />
    )
  }

  return (
    <Card className="overflow-hidden p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortButton onClick={() => onToggleSort("date")}>
                {t("columns.date")}
                <SortIcon field="date" />
              </SortButton>
            </TableHead>
            <TableHead>{t("columns.description")}</TableHead>
            <TableHead>{t("columns.category")}</TableHead>
            <TableHead>{t("columns.currency")}</TableHead>
            <TableHead>{t("columns.type")}</TableHead>
            <TableHead className="text-right">
              <SortButton
                className="ml-auto"
                onClick={() => onToggleSort("amountMinor")}
              >
                {t("columns.amount")}
                <SortIcon field="amountMinor" />
              </SortButton>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                {t("empty")}
              </TableCell>
            </TableRow>
          ) : (
            items.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="whitespace-nowrap text-muted-foreground tabular-nums">
                  {formatDate(tx.date)}
                </TableCell>
                <TableCell className="font-medium">{tx.description}</TableCell>
                <TableCell className="text-muted-foreground">
                  <CategoryLabel category={tx.category} />
                </TableCell>
                <TableCell className="text-muted-foreground tabular-nums">
                  {tx.currency}
                </TableCell>
                <TableCell>
                  <TransactionTypeBadge type={tx.type} />
                </TableCell>
                <TableCell className="text-right">
                  <AmountText
                    amountMinor={tx.amountMinor}
                    currency={tx.currency}
                    type={tx.type}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
        <span className="tabular-nums">
          {t("showing", { from, to, total })}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            {t("previous")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </Card>
  )
}

type SortButtonProps = React.ComponentProps<"button">

const SortButton = ({ className, children, ...props }: SortButtonProps) => (
  <button
    type="button"
    className={cn(
      "-mx-1 inline-flex items-center gap-1.5 rounded px-1 hover:text-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </button>
)
