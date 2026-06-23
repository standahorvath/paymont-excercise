export type SortDir = "asc" | "desc"

export type Sort<TField extends string = string> = {
  field: TField
  dir: SortDir
}
