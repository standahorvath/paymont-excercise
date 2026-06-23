import { Navigate, Outlet } from "react-router-dom"

import { Route } from "@/enums"
import { useAuth } from "@/providers/auth-context"

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to={Route.login} replace />
}

export const GuestRoute = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <Navigate to={Route.dashboard} replace />
  ) : (
    <Outlet />
  )
}
