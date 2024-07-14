import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function MembersTableSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="w-full h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-4" />
          </TableCell>
          <TableCell className="flex justify-center items-center">
            <Button size="icon" variant="ghost" disabled>
              <Trash2 className="size-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
