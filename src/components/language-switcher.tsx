import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { SUPPORTED_LOCALES } from "@/config"
import { type Locale } from "@/enums"
import { cn } from "@/lib/utils"

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation()
  const active = i18n.resolvedLanguage as Locale

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={t("language.label")}
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <Button
          key={locale}
          size="xs"
          variant="ghost"
          aria-pressed={locale === active}
          onClick={() => void i18n.changeLanguage(locale)}
          className={cn(
            "uppercase",
            locale === active
              ? "bg-muted text-foreground"
              : "text-muted-foreground",
          )}
        >
          {locale}
        </Button>
      ))}
    </div>
  )
}
