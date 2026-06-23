import { useEffect, useState } from "react"

import { THEME_STORAGE_KEY } from "@/config"
import { DEFAULT_THEME } from "@/defaults"
import { Theme } from "@/enums"

import { ThemeContext } from "./theme-context"

const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)"

const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored && Object.values(Theme).includes(stored as Theme)
    ? (stored as Theme)
    : DEFAULT_THEME
}

const applyTheme = (theme: Theme) => {
  const isDark =
    theme === Theme.dark ||
    (theme === Theme.system && window.matchMedia(DARK_MEDIA_QUERY).matches)
  document.documentElement.classList.toggle("dark", isDark)
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    applyTheme(theme)

    if (theme !== Theme.system) return

    const media = window.matchMedia(DARK_MEDIA_QUERY)
    const onChange = () => applyTheme(Theme.system)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [theme])

  const setTheme = (next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next)
    setThemeState(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
