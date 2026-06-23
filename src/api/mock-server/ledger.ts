import {
  LIVE_DRIFT_DOWNWARD_BIAS,
  LIVE_DRIFT_SKIP_CHANCE,
  LIVE_DRIFT_STEP_MINOR,
  TRANSACTION_SEED_COUNT,
} from "@/config"
import { computeBalances } from "@/lib/compute-balances"
import { generateTransactions } from "@/lib/generate_transactions"
import { type AccountBalance, type Transaction } from "@/types"

const transactions = generateTransactions(TRANSACTION_SEED_COUNT)

const referenceDate = transactions.reduce(
  (max, tx) => (tx.date > max ? tx.date : max),
  transactions[0]?.date ?? "",
)

const driftByCurrency = new Map<string, number>()

const stepDrift = (currencies: string[]) => {
  for (const currency of currencies) {
    const previous = driftByCurrency.get(currency) ?? 0
    if (Math.random() < LIVE_DRIFT_SKIP_CHANCE) {
      driftByCurrency.set(currency, previous)
      return
    }
    const nudge = Math.round(
      (Math.random() - LIVE_DRIFT_DOWNWARD_BIAS) * 2 * LIVE_DRIFT_STEP_MINOR,
    )
    driftByCurrency.set(currency, previous + nudge)
  }
}

export const getAllTransactions = (): Transaction[] => transactions

export const getReferenceDate = (): string => referenceDate

export const getBalances = (): AccountBalance[] => {
  const base = computeBalances(transactions, referenceDate)
  stepDrift(base.map((entry) => entry.currency))

  return base.map((entry) => {
    const drift = driftByCurrency.get(entry.currency) ?? 0
    return {
      ...entry,
      availableMinor: entry.availableMinor + drift,
      deltaMinor: entry.deltaMinor + drift,
    }
  })
}
