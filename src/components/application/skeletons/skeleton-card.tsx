import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <>
      <Skeleton className={cn('w-2/3 h-7', className)} />
      <Skeleton className={cn('w-1/3 h-4 mt-1', className)} />
    </>
  )
}
