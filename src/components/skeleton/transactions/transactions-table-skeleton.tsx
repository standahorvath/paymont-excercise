import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

type TransactionsTableSkeletonProps = {
  rows?: number
  columns?: number
}

export const TransactionsTableSkeleton = ({
  rows = 8,
  columns = 6,
}: TransactionsTableSkeletonProps) => (
  <Card className="overflow-hidden p-0">
    <Table>
      <TableBody>
        {Array.from({ length: rows }).map((_, row) => (
          <TableRow key={row}>
            {Array.from({ length: columns }).map((_, column) => (
              <TableCell key={column}>
                <Skeleton className="h-4 w-full max-w-28" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
)
