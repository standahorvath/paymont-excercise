import { useState } from "react"

import { AUTH_STORAGE_KEY } from "@/config"
import { type AuthSession } from "@/types"

import { AuthContext } from "./auth-context"

const getStoredSession = (): AuthSession | null => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!stored) return null

  try {
    const parsed = JSON.parse(stored) as Partial<AuthSession>
    if (typeof parsed.token === "string" && typeof parsed.email === "string") {
      return { token: parsed.token, email: parsed.email }
    }
    return null
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(getStoredSession)

  const login = (next: AuthSession) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next))
    setSession(next)
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setSession(null)
  }

  return (
    <AuthContext.Provider
      value={{ session, isAuthenticated: Boolean(session), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
