import { FilterAll, type TransactionPeriod } from "@/enums"
import { type Transaction, type TransactionFilters } from "@/types"

const todayIso = () => new Date().toISOString().slice(0, 10)

export const periodStart = (
  period: TransactionPeriod | FilterAll,
  today: string = todayIso(),
): string | null => {
  if (period === FilterAll.all) return null
  const date = new Date(today)
  date.setDate(date.getDate() - Number(period))
  return date.toISOString().slice(0, 10)
}

export const filterTransactions = (
  rows: Transaction[],
  filters: TransactionFilters,
  today: string = todayIso(),
): Transaction[] => {
  const since = periodStart(filters.period, today)
  const search = filters.search.trim().toLowerCase()

  return rows.filter((tx) => {
    if (filters.type !== FilterAll.all && tx.type !== filters.type) return false
    if (
      filters.category !== FilterAll.all &&
      tx.category !== filters.category
    ) {
      return false
    }
    if (
      filters.currency !== FilterAll.all &&
      tx.currency !== filters.currency
    ) {
      return false
    }
    if (since && tx.date < since) return false
    if (search && !tx.description.toLowerCase().includes(search)) return false
    return true
  })
}
