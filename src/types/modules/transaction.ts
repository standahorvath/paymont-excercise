import {
  type Currency,
  type FilterAll,
  type TransactionCategory,
  type TransactionPeriod,
} from "@/enums"

import { type Page } from "./pagination"
import { type Sort } from "./sorting"

export type TransactionType = "credit" | "debit"

export type Transaction = {
  id: string
  date: string
  description: string
  category: TransactionCategory
  currency: Currency
  type: TransactionType
  amountMinor: number
}

export type TransactionFilters = {
  type: TransactionType | FilterAll
  category: TransactionCategory | FilterAll
  currency: Currency | FilterAll
  period: TransactionPeriod | FilterAll
  search: string
}

export type TransactionSortField = "date" | "amountMinor"

export type TransactionSort = Sort<TransactionSortField>

export type TransactionsPage = Page<Transaction>
