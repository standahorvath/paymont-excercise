import { useState } from "react"

import { useTransactions } from "@/api/transactions/get-transactions"
import { QueryError } from "@/components/common/query-error"
import { TransactionsTableSkeleton } from "@/components/skeleton/transactions/transactions-table-skeleton"
import { TransactionsFilters } from "@/components/transactions/transactions-filters"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { TRANSACTIONS_PAGE_SIZE } from "@/config"
import { DEFAULT_FILTERS, DEFAULT_SORT } from "@/defaults"
import { cn } from "@/lib/utils"
import {
  type TransactionFilters,
  type TransactionSort,
  type TransactionSortField,
} from "@/types"

export const Transactions = () => {
  const [filters, setFilters] = useState<TransactionFilters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<TransactionSort>(DEFAULT_SORT)
  const [page, setPage] = useState(1)

  const query = useTransactions({
    filters,
    sort,
    page,
    pageSize: TRANSACTIONS_PAGE_SIZE,
  })

  const handleFiltersChange = (next: TransactionFilters) => {
    setFilters(next)
    setPage(1)
  }

  const handleToggleSort = (field: TransactionSortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { field, dir: "desc" },
    )
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-6">
      <TransactionsFilters value={filters} onChange={handleFiltersChange} />
      {query.isError ? (
        <QueryError onRetry={() => query.refetch()} />
      ) : query.isPending ? (
        <TransactionsTableSkeleton rows={TRANSACTIONS_PAGE_SIZE} />
      ) : (
        <div
          className={cn(
            "transition-opacity duration-200",
            query.isFetching && "pointer-events-none opacity-50",
          )}
        >
          <TransactionsTable
            data={query.data}
            sort={sort}
            onToggleSort={handleToggleSort}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
