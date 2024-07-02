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
import { AlertCircle, Loader2 } from 'lucide-react'

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
        {isLoadingRecentTransactions && !recentTransactions && (
          <div className="w-full h-[240px] flex justify-center items-center">
            <Loader2 className="size-8 text-muted-foreground animate-spin" />
          </div>
        )}

        {recentTransactions &&
          recentTransactions?.map((transaction) => (
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

        {recentTransactions && recentTransactions.length === 0 && (
          <div className="w-full h-[240px] flex justify-center items-center text-sm text-muted-foreground">
            <AlertCircle className="size-4 mr-2" />
            Nenhum resultado encontrado.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
