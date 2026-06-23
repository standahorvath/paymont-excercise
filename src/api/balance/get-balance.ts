import { queryOptions, useQuery } from "@tanstack/react-query"

import { LIVE_BALANCE_REFETCH_MS, SIMULATED_LATENCY_MS } from "@/config"
import { BalanceFetchError } from "@/errors"
import { type AccountBalance } from "@/types"

import { getBalances } from "../mock-server/ledger"
import { balanceKeys } from "./balance-keys"

const fetchBalances = (): Promise<AccountBalance[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(getBalances())
      } catch (error) {
        reject(
          new BalanceFetchError(
            error instanceof Error ? error.message : undefined,
          ),
        )
      }
    }, SIMULATED_LATENCY_MS)
  })

export const getBalancesQueryOptions = () =>
  queryOptions({
    queryKey: balanceKeys.all,
    queryFn: fetchBalances,
    refetchInterval: LIVE_BALANCE_REFETCH_MS,
  })

export const useBalances = () => useQuery(getBalancesQueryOptions())
