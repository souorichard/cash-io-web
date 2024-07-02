import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { Ellipsis } from 'lucide-react'

export function TransactionsTableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="w-full h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-4" />
          </TableCell>
          <TableCell className="flex justify-center items-center">
            <Button size="icon" variant="ghost" disabled>
              <Ellipsis className="size-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
