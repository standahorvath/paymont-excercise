import { useMutation } from "@tanstack/react-query"

import { DEMO_EMAIL, DEMO_PASSWORD, SIMULATED_LATENCY_MS } from "@/config"
import { LoginError } from "@/errors"
import { type LoginCredentials, type LoginResponse } from "@/types"

import { authKeys } from "./auth-keys"

const login = ({ email, password }: LoginCredentials): Promise<LoginResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        resolve({ token: "demo-token", email })
      } else {
        reject(new LoginError())
      }
    }, SIMULATED_LATENCY_MS)
  })

export const useLogin = () =>
  useMutation({
    mutationKey: authKeys.login(),
    mutationFn: login,
  })
