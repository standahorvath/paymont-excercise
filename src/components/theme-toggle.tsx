import { Monitor, Moon, Sun } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Theme } from "@/enums"
import { useTheme } from "@/providers/theme-context"

const THEME_ORDER = [Theme.light, Theme.dark, Theme.system] as const

const THEME_ICONS = {
  [Theme.light]: Sun,
  [Theme.dark]: Moon,
  [Theme.system]: Monitor,
}

export const ThemeToggle = () => {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  const Icon = THEME_ICONS[theme]
  const next =
    THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length]

  return (
    <Button
      size="icon-sm"
      variant="ghost"
      className="text-muted-foreground"
      aria-label={t("theme.label")}
      title={t(`theme.${theme}`)}
      onClick={() => setTheme(next)}
    >
      <Icon />
    </Button>
  )
}
