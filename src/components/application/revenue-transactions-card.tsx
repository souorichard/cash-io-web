'use client'

import { Loader2, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getRevenueTransactions } from '@/api/analytics/get-revenue-transactions'
import { SkeletonCard } from './skeletons/skeleton-card'

interface RevenueTransactionsCardProps {
  className?: string
}

export function RevenueTransactionsCard({
  className,
}: RevenueTransactionsCardProps) {
  const {
    data: revenueTransactions,
    isFetching: isLoadingRevenueTransactions,
  } = useQuery({
    queryKey: ['analytics', 'revenue-transactions'],
    queryFn: getRevenueTransactions,
    refetchOnWindowFocus: false,
  })

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3 flex-row items-center">
        <CardTitle>Receitas</CardTitle>
        {isLoadingRevenueTransactions ? (
          <Loader2 className="size-5 ml-auto text-muted-foreground animate-spin" />
        ) : (
          <TrendingUp className="size-5 ml-auto text-green-600" />
        )}
      </CardHeader>
      <CardContent>
        {isLoadingRevenueTransactions ? (
          <SkeletonCard />
        ) : (
          <>
            <b className="text-2xl font-bold">
              {revenueTransactions?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </b>
            <p className="mt-1 text-xs text-muted-foreground">
              <span className="text-emerald-600">-20%</span> em relação ao mês
              passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
