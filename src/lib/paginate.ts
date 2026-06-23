import { type Page } from "@/types"

export const paginate = <T>(
  rows: T[],
  page: number,
  pageSize: number,
): Page<T> => {
  const total = rows.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), pageCount)
  const start = (safePage - 1) * pageSize

  return {
    items: rows.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
  }
}
