import { ArrowLeftRight, LayoutDashboard } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Route } from "@/enums"

const NAV_ITEMS = [
  { key: "dashboard", to: Route.dashboard, icon: LayoutDashboard },
  { key: "transactions", to: Route.transactions, icon: ArrowLeftRight },
] as const

export const NavMain = () => {
  const { t } = useTranslation("nav")
  const { pathname } = useLocation()

  return (
    <SidebarMenu>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.to}
              tooltip={t(item.key)}
            >
              <Link to={item.to}>
                <Icon />
                <span>{t(item.key)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
