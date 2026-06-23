import { CurrencyCards } from "@/components/dashboard/currency-cards"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <CurrencyCards />
      <RecentTransactions />
    </div>
  )
}
