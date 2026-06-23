import { Currency } from "@/enums"
import { type AccountBalance, type Transaction } from "@/types"

const CURRENCY_ORDER = Object.values(Currency)
const RECENT_DAYS = 7

export const computeBalances = (
  rows: Transaction[],
  referenceDate: string,
): AccountBalance[] => {
  const since = new Date(referenceDate)
  since.setDate(since.getDate() - RECENT_DAYS)
  const sinceIso = since.toISOString().slice(0, 10)

  const byCurrency = new Map<Currency, AccountBalance>()
  for (const tx of rows) {
    const currency = tx.currency
    const entry = byCurrency.get(currency) ?? {
      currency,
      availableMinor: 0,
      deltaMinor: 0,
    }
    entry.availableMinor += tx.amountMinor
    if (tx.date >= sinceIso) entry.deltaMinor += tx.amountMinor
    byCurrency.set(currency, entry)
  }

  return CURRENCY_ORDER.map((currency) => byCurrency.get(currency)).filter(
    (entry): entry is AccountBalance => Boolean(entry),
  )
}
