import { FilterAll } from "@/enums"
import { type TransactionFilters, type TransactionSort } from "@/types"

export const DEFAULT_FILTERS: TransactionFilters = {
  type: FilterAll.all,
  category: FilterAll.all,
  currency: FilterAll.all,
  period: FilterAll.all,
  search: "",
}

export const DEFAULT_SORT: TransactionSort = {
  field: "date",
  dir: "desc",
}
