'use client'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useQuery } from '@tanstack/react-query'
import { getRecentTransactions } from '@/api/analytics/get-recent-transactions'
import { getInitials } from '@/utils/get-initials'
import { Skeleton } from '../ui/skeleton'

interface RecentTransactionsCardProps {
  className?: string
}

export function RecentTransactionsCard({
  className,
}: RecentTransactionsCardProps) {
  const { data: recentTransactions, isLoading: isLoadingRecentTransactions } =
    useQuery({
      queryKey: ['analytics', 'recent-transactions'],
      queryFn: getRecentTransactions,
    })

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-8">
        <CardTitle>Transações recentes</CardTitle>
        <CardDescription>
          Veja as transações adicionadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoadingRecentTransactions
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-[2.63rem]" />
            ))
          : recentTransactions?.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-2">
                <Avatar className="size-10">
                  <AvatarFallback>
                    {getInitials(transaction.createdBy.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <b className="text-sm font-medium">
                    {transaction.createdBy.name}
                  </b>
                  <p className="text-xs text-muted-foreground">
                    {transaction.createdBy.email}
                  </p>
                </div>
                <b className="ml-auto text-sm font-semibold">
                  {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                  {transaction.amount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </b>
              </div>
            ))}
      </CardContent>
    </Card>
  )
}
