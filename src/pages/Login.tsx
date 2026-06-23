import { useTranslation } from "react-i18next"

import { LoginForm } from "@/components/forms/login-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Login = () => {
  const { t } = useTranslation("auth")

  return (
    <>
      <img
        src="/images/logo-holding-light-mode.svg"
        alt="Paymount"
        className="h-9 dark:hidden"
      />
      <img
        src="/images/logo-holding-dark-mode.svg"
        alt="Paymount"
        className="hidden h-9 dark:block"
      />
      <Card className="w-full max-w-sm mt-3">
        <CardHeader>
          <CardTitle className="text-center font-bold text-xl">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
      <div className="flex w-full max-w-sm items-center justify-between px-1">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </>
  )
}
