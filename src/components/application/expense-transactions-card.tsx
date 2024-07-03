'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2, TrendingDown } from 'lucide-react'

import { getExpenseTransactions } from '@/api/analytics/get-expense-transactions'
import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { SkeletonCard } from './skeletons/skeleton-card'

interface ExpenseTransactionsCardProps {
  className?: string
}

export function ExpenseTransactionsCard({
  className,
}: ExpenseTransactionsCardProps) {
  const {
    data: expenseTransactions,
    isFetching: isLoadingExpenseTransactions,
  } = useQuery({
    queryKey: ['analytics', 'expense-transactions'],
    queryFn: getExpenseTransactions,
    refetchOnWindowFocus: false,
  })

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3 flex-row items-center">
        <CardTitle>Despesas</CardTitle>
        {isLoadingExpenseTransactions ? (
          <Loader2 className="size-5 ml-auto text-muted-foreground animate-spin" />
        ) : (
          <TrendingDown className="size-5 ml-auto text-red-600" />
        )}
      </CardHeader>
      <CardContent>
        {isLoadingExpenseTransactions ? (
          <SkeletonCard />
        ) : (
          <>
            <b className="text-2xl font-bold">
              {expenseTransactions?.toLocaleString('pt-BR', {
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
