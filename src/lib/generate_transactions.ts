import { Currency, TransactionCategory } from "@/enums"
import { type Transaction, type TransactionType } from "@/types"

const CURRENCIES: { code: Currency; exponent: number; weight: number }[] = [
  { code: Currency.czk, exponent: 2, weight: 70 },
  { code: Currency.eur, exponent: 2, weight: 15 },
  { code: Currency.usd, exponent: 2, weight: 10 },
  { code: Currency.jpy, exponent: 0, weight: 5 },
]

const INCOME_CATEGORIES: TransactionCategory[] = [
  TransactionCategory.income,
  TransactionCategory.refund,
]
const INCOME_DESCRIPTIONS = [
  "Výplata",
  "Faktura - konzultace",
  "Vratba daně",
  "Úrok ze spořicího účtu",
  "Bonus",
  "Převod od klienta",
  "Storno platby",
  "Prodej",
]

const SPENDING: { category: TransactionCategory; descriptions: string[] }[] = [
  {
    category: TransactionCategory.groceries,
    descriptions: ["Albert", "Tesco", "Lidl", "Kaufland"],
  },
  {
    category: TransactionCategory.dining,
    descriptions: ["Restaurace", "Káva", "Oběd", "Bistro"],
  },
  {
    category: TransactionCategory.housing,
    descriptions: ["Nájem", "Fond oprav"],
  },
  {
    category: TransactionCategory.utilities,
    descriptions: [
      "ČEZ - elektřina",
      "Mobilní tarif",
      "Internet",
      "Vodné a stočné",
    ],
  },
  {
    category: TransactionCategory.transport,
    descriptions: ["Benzina", "MHD kupón", "Uber", "Vlak"],
  },
  {
    category: TransactionCategory.subscriptions,
    descriptions: ["Netflix", "Spotify", "iCloud", "YouTube Premium"],
  },
  {
    category: TransactionCategory.shopping,
    descriptions: ["Alza", "Zalando", "IKEA", "Knihkupectví"],
  },
  {
    category: TransactionCategory.health,
    descriptions: ["Lékárna", "Zubař", "Optika"],
  },
  {
    category: TransactionCategory.entertainment,
    descriptions: ["Kino", "Koncert", "Hry"],
  },
  {
    category: TransactionCategory.travel,
    descriptions: ["Letenka", "Hotel", "Booking.com"],
  },
]

// mulberry32 – tiny seeded PRNG so the same seed gives reproducible data
function makeRng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Generate `count` transactions. Deterministic for a given `seed`.
 * Transactions are intentionally NOT sorted by date.
 */
export function generateTransactions(count = 250, seed = 42): Transaction[] {
  const rng = makeRng(seed)
  const pick = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)]

  const pickCurrency = () => {
    const total = CURRENCIES.reduce((s, c) => s + c.weight, 0)
    let r = rng() * total
    for (const c of CURRENCIES) {
      r -= c.weight
      if (r <= 0) return c
    }
    return CURRENCIES[0]
  }

  const today = new Date("2026-06-15T00:00:00Z")
  const txs: Transaction[] = []

  for (let i = 0; i < count; i++) {
    const isIncome = rng() < 0.18
    const cur = pickCurrency()

    const d = new Date(today)
    d.setUTCDate(d.getUTCDate() - Math.floor(rng() * 180))
    const date = d.toISOString().slice(0, 10)

    let category: TransactionCategory
    let description: string
    let type: TransactionType
    let major: number

    if (isIncome) {
      type = "credit"
      category = pick(INCOME_CATEGORIES)
      description = pick(INCOME_DESCRIPTIONS)
      major = 200 + rng() * 60000
    } else {
      type = "debit"
      const s = pick(SPENDING)
      category = s.category
      description = pick(s.descriptions)
      major = 1 + rng() * 4000
    }

    const minorAbs = Math.round(major * Math.pow(10, cur.exponent))
    const amountMinor = type === "credit" ? minorAbs : -minorAbs

    txs.push({
      id: `tx_${(i + 1).toString().padStart(5, "0")}`,
      date,
      description,
      category,
      currency: cur.code,
      type,
      amountMinor,
    })
  }

  return txs
}
