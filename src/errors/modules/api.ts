export class TransactionsFetchError extends Error {
  constructor(message = "Failed to fetch transactions") {
    super(message)
    this.name = "TransactionsFetchError"
  }
}

export class BalanceFetchError extends Error {
  constructor(message = "Failed to fetch balances") {
    super(message)
    this.name = "BalanceFetchError"
  }
}

export class LoginError extends Error {
  constructor(message = "Neplatný e-mail nebo heslo.") {
    super(message)
    this.name = "LoginError"
  }
}
