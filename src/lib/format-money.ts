import { DEFAULT_LOCALE } from "@/defaults"

/** Format a minor-unit amount as localized currency; fraction digits derived from the currency (JPY → 0). */
export const formatMoney = (
  amountMinor: number,
  currency: string,
  locale: string = DEFAULT_LOCALE,
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  })
  const fractionDigits = formatter.resolvedOptions().maximumFractionDigits ?? 2
  return formatter.format(amountMinor / 10 ** fractionDigits)
}
