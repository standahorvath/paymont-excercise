import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center gap-3 p-8 bg-muted/30">
      <Outlet />
    </div>
  )
}
