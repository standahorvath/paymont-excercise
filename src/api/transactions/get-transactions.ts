import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query"

import { SIMULATED_LATENCY_MS, TRANSACTIONS_PAGE_SIZE } from "@/config"
import { DEFAULT_SORT } from "@/defaults"
import { TransactionsFetchError } from "@/errors"
import { filterTransactions } from "@/lib/filter-transactions"
import { paginate } from "@/lib/paginate"
import { sortTransactions } from "@/lib/sort-transactions"
import {
  type TransactionFilters,
  type TransactionSort,
  type TransactionsPage,
} from "@/types"

import { getAllTransactions, getReferenceDate } from "../mock-server/ledger"
import { transactionsKeys } from "./transactions-keys"

export type GetTransactionsParams = {
  filters?: TransactionFilters
  sort?: TransactionSort
  page?: number
  pageSize?: number
}

const fetchTransactions = ({
  filters,
  sort = DEFAULT_SORT,
  page = 1,
  pageSize = TRANSACTIONS_PAGE_SIZE,
}: GetTransactionsParams = {}): Promise<TransactionsPage> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const all = getAllTransactions()
        const filtered = filters
          ? filterTransactions(all, filters, getReferenceDate())
          : all
        const sorted = sortTransactions(filtered, sort)
        resolve(paginate(sorted, page, pageSize))
      } catch (error) {
        reject(
          new TransactionsFetchError(
            error instanceof Error ? error.message : undefined,
          ),
        )
      }
    }, SIMULATED_LATENCY_MS)
  })

export const getTransactionsQueryOptions = (
  params: GetTransactionsParams = {},
) =>
  queryOptions({
    queryKey: transactionsKeys.list(params),
    queryFn: () => fetchTransactions(params),
    placeholderData: keepPreviousData,
  })

export const useTransactions = (params?: GetTransactionsParams) =>
  useQuery(getTransactionsQueryOptions(params))
