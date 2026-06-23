import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type CurrencyCardsSkeletonProps = {
  count?: number
}

export const CurrencyCardsSkeleton = ({
  count = 4,
}: CurrencyCardsSkeletonProps) => (
  <div className="flex gap-4 overflow-x-auto pb-1">
    {Array.from({ length: count }).map((_, index) => (
      <Card key={index} className="min-w-56 flex-1 gap-3 p-5">
        <Skeleton className="size-9 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-3 w-20" />
      </Card>
    ))}
  </div>
)
