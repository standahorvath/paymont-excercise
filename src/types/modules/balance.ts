import { type Currency } from "@/enums"

export type AccountBalance = {
  currency: Currency
  availableMinor: number
  deltaMinor: number // change over the recent window (live tick)
}
