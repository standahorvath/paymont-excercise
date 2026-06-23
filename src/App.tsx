import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { Route as AppRoute } from "@/enums"
import { GuestRoute, ProtectedRoute } from "@/guards/auth-guard"
import { AppLayout } from "@/layouts/AppLayout"
import { AuthLayout } from "@/layouts/AuthLayout"
import { Account } from "@/pages/Account"
import { Dashboard } from "@/pages/Dashboard"
import { Login } from "@/pages/Login"
import { Transactions } from "@/pages/Transactions"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={AppRoute.login} element={<Login />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path={AppRoute.dashboard} element={<Dashboard />} />
            <Route path={AppRoute.transactions} element={<Transactions />} />
            <Route path={AppRoute.account} element={<Account />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={<Navigate to={AppRoute.dashboard} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
