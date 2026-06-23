import { type Transaction, type TransactionSort } from "@/types"

export const sortTransactions = (
  rows: Transaction[],
  sort: TransactionSort,
): Transaction[] => {
  const dir = sort.dir === "asc" ? 1 : -1

  return [...rows].sort((a, b) => {
    const cmp =
      sort.field === "date"
        ? a.date.localeCompare(b.date)
        : a.amountMinor - b.amountMinor
    return cmp * dir
  })
}
