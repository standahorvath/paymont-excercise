export type LoginCredentials = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  email: string
}

export type AuthSession = {
  token: string
  email: string
}
