export const transactionsKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionsKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) =>
    [...transactionsKeys.lists(), params] as const,
}
