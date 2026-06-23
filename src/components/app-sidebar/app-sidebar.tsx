import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Route } from "@/enums"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

export const AppSidebar = () => {
  const { t } = useTranslation()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          to={Route.dashboard}
          aria-label={t("appName")}
          className="flex h-8 items-center px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <img
            src="/favicon.svg"
            alt=""
            className="hidden size-6 shrink-0 group-data-[collapsible=icon]:block"
          />
          <img
            src="/images/logo-holding-light-mode.svg"
            alt={t("appName")}
            className="h-8 ml-2 mt-1 w-auto group-data-[collapsible=icon]:hidden dark:hidden"
          />
          <img
            src="/images/logo-holding-dark-mode.svg"
            alt={t("appName")}
            className="hidden h-8 ml-2 mt-1 w-auto group-data-[collapsible=icon]:hidden dark:block"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavMain />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-1 px-1 group-data-[collapsible=icon]:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
