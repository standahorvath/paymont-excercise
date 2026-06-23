import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { useLogin } from "@/api/auth/login"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Route } from "@/enums"
import { useAuth } from "@/providers/auth-context"

type LoginFormValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(["auth", "validation", "errors"])
  const { login } = useAuth()
  const { mutate, isPending, isError } = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  const loginFormSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, t("validation:required"))
          .email(t("validation:email")),
        password: z.string().min(1, t("validation:required")),
      }),
    [t],
  )

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: ({ token, email }) => {
        login({ token, email })
        navigate(Route.dashboard)
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth:email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder={t("auth:emailPlaceholder")}
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("auth:password")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="pr-9"
                    disabled={isPending}
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="absolute top-1/2 right-1 -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword
                        ? t("auth:hidePassword")
                        : t("auth:showPassword")
                    }
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && (
          <p className="text-sm text-destructive">
            {t("errors:invalidCredentials")}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          {t("auth:submit")}
        </Button>
      </form>
    </Form>
  )
}
