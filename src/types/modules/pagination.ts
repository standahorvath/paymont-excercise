export type PageParams = {
  page: number
  pageSize: number
}

export type Page<T> = PageParams & {
  items: T[]
  total: number
}
