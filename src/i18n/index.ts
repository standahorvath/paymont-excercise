import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import { LOCALE_STORAGE_KEY, SUPPORTED_LOCALES } from "@/config"
import { DEFAULT_LOCALE } from "@/defaults"
import { Locale } from "@/enums"

import { cs } from "./locales/cs"
import { en } from "./locales/en"

export const defaultNS = "common"

export const resources = {
  [Locale.cs]: cs,
  [Locale.en]: en,
} as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    ns: Object.keys(cs),
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: LOCALE_STORAGE_KEY,
      caches: ["localStorage"],
    },
  })

export default i18n
