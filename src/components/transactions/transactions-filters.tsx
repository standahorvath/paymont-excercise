import { Search, X } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DEFAULT_FILTERS } from "@/defaults"
import {
  Currency,
  FilterAll,
  TransactionCategory,
  TransactionPeriod,
} from "@/enums"
import { type TransactionFilters, type TransactionType } from "@/types"

const CATEGORY_OPTIONS = Object.values(TransactionCategory)

const PERIOD_OPTIONS: (TransactionPeriod | FilterAll)[] = [
  TransactionPeriod.week,
  TransactionPeriod.month,
  TransactionPeriod.quarter,
  FilterAll.all,
]

const PERIOD_LABEL_KEY = {
  [TransactionPeriod.week]: "filters.period.d7",
  [TransactionPeriod.month]: "filters.period.d30",
  [TransactionPeriod.quarter]: "filters.period.d90",
  [FilterAll.all]: "filters.period.all",
} as const

type TransactionsFiltersProps = {
  value: TransactionFilters
  onChange: (next: TransactionFilters) => void
}

export const TransactionsFilters = ({
  value,
  onChange,
}: TransactionsFiltersProps) => {
  const { t } = useTranslation(["transactions", "categories"])

  const isActive =
    value.type !== FilterAll.all ||
    value.category !== FilterAll.all ||
    value.currency !== FilterAll.all ||
    value.period !== FilterAll.all ||
    value.search !== ""

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={value.type}
          onValueChange={(next) =>
            next &&
            onChange({ ...value, type: next as TransactionType | FilterAll })
          }
        >
          <ToggleGroupItem value={FilterAll.all}>
            {t("filters.type.all")}
          </ToggleGroupItem>
          <ToggleGroupItem value="credit">
            {t("filters.type.income")}
          </ToggleGroupItem>
          <ToggleGroupItem value="debit">
            {t("filters.type.expense")}
          </ToggleGroupItem>
        </ToggleGroup>

        <Select
          value={value.category}
          onValueChange={(next) =>
            onChange({
              ...value,
              category: next as TransactionCategory | FilterAll,
            })
          }
        >
          <SelectTrigger size="sm" className="w-44">
            <SelectValue placeholder={t("filters.category.label")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FilterAll.all}>
              {t("filters.category.all")}
            </SelectItem>
            {CATEGORY_OPTIONS.map((category) => (
              <SelectItem key={category} value={category}>
                {t(`categories:${category}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value.currency}
          onValueChange={(next) =>
            onChange({ ...value, currency: next as Currency | FilterAll })
          }
        >
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder={t("filters.currency.label")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FilterAll.all}>
              {t("filters.currency.all")}
            </SelectItem>
            {Object.values(Currency).map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value.period}
          onValueChange={(next) =>
            onChange({
              ...value,
              period: next as TransactionPeriod | FilterAll,
            })
          }
        >
          <SelectTrigger size="sm" className="w-40">
            <SelectValue placeholder={t("filters.period.label")} />
          </SelectTrigger>
          <SelectContent>
            {PERIOD_OPTIONS.map((period) => (
              <SelectItem key={period} value={period}>
                {t(PERIOD_LABEL_KEY[period])}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative ml-auto">
          <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value.search}
            onChange={(event) =>
              onChange({ ...value, search: event.target.value })
            }
            placeholder={t("filters.search")}
            className="w-64 pl-8"
          />
        </div>
      </div>

      {isActive && (
        <div className="flex flex-wrap items-center gap-2">
          {value.type !== FilterAll.all && (
            <FilterChip
              label={t(
                value.type === "credit"
                  ? "filters.type.income"
                  : "filters.type.expense",
              )}
              onClear={() => onChange({ ...value, type: FilterAll.all })}
            />
          )}
          {value.category !== FilterAll.all && (
            <FilterChip
              label={t(`categories:${value.category}`)}
              onClear={() => onChange({ ...value, category: FilterAll.all })}
            />
          )}
          {value.currency !== FilterAll.all && (
            <FilterChip
              label={value.currency}
              onClear={() => onChange({ ...value, currency: FilterAll.all })}
            />
          )}
          {value.period !== FilterAll.all && (
            <FilterChip
              label={t(PERIOD_LABEL_KEY[value.period])}
              onClear={() => onChange({ ...value, period: FilterAll.all })}
            />
          )}
          {value.search !== "" && (
            <FilterChip
              label={`"${value.search}"`}
              onClear={() => onChange({ ...value, search: "" })}
            />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(DEFAULT_FILTERS)}
          >
            {t("filters.clear")}
          </Button>
        </div>
      )}
    </div>
  )
}

type FilterChipProps = {
  label: string
  onClear: () => void
}

const FilterChip = ({ label, onClear }: FilterChipProps) => (
  <Badge variant="secondary" className="gap-1 pr-1">
    {label}
    <button
      type="button"
      onClick={onClear}
      className="rounded-full p-0.5 hover:bg-foreground/10"
    >
      <X className="size-3" />
    </button>
  </Badge>
)
