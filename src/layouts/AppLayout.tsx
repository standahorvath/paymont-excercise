import { useTranslation } from "react-i18next"
import { Outlet, useLocation } from "react-router-dom"

import { AppSidebar } from "@/components/app-sidebar/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Route } from "@/enums"

const PAGE_TITLE_KEYS = {
  [Route.dashboard]: "dashboard",
  [Route.transactions]: "transactions",
  [Route.account]: "account",
} as const satisfies Partial<Record<Route, string>>

export function AppLayout() {
  const { t } = useTranslation("nav")
  const { pathname } = useLocation()
  const titleKey = PAGE_TITLE_KEYS[pathname as keyof typeof PAGE_TITLE_KEYS]

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-14" />
            {titleKey && <h1 className="text-sm font-medium">{t(titleKey)}</h1>}
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
