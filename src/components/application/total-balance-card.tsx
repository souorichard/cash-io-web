'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2, Wallet2 } from 'lucide-react'

import { getTotalBalance } from '@/api/analytics/get-total-balance'
import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
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

  const balance = totalBalance?.balance ? totalBalance?.balance / 100 : 0

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
              {balance
                ?.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
                .replace('-', '- ')}
            </b>
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-600">
              A cada 30 dias compare seu saldo
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
