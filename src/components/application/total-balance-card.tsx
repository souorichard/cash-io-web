'use client'

import { Loader2, Wallet2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getTotalBalance } from '@/api/analytics/get-total-balance'
import { SkeletonCard } from './skeletons/skeleton-card'

interface TotalBalanceCardProps {
  className?: string
}

export function TotalBalanceCard({ className }: TotalBalanceCardProps) {
  const { data: totalBalance, isFetching: isLoadingTotalBalance } = useQuery({
    queryKey: ['analytics', 'total-balance'],
    queryFn: getTotalBalance,
    refetchOnWindowFocus: false,
  })

  return (
    <Card className={cn('bg-card-foreground', className)}>
      <CardHeader className="pb-3 flex-row items-center">
        <CardTitle className="text-primary-foreground">Saldo total</CardTitle>
        {isLoadingTotalBalance ? (
          <Loader2 className="size-5 ml-auto text-muted-foreground animate-spin" />
        ) : (
          <Wallet2 className="size-5 ml-auto text-orange-600" />
        )}
      </CardHeader>
      <CardContent>
        {isLoadingTotalBalance ? (
          <SkeletonCard className="bg-secondary/20" />
        ) : (
          <>
            <b className="text-2xl font-bold text-primary-foreground">
              {totalBalance && totalBalance < 0 ? '- ' : ''}
              {totalBalance?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </b>
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-600">
              <span className="text-emerald-600">+20%</span> em relação ao mês
              passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
