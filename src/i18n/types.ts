import { type cs } from "./locales/cs"

type Stringify<T> = {
  [K in keyof T]: T[K] extends string ? string : Stringify<T[K]>
}

export type Resources = Stringify<typeof cs>
