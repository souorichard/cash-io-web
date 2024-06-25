import { TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'

interface RevenueTransactionsCardProps {
  className?: string
}

export function RevenueTransactionsCard({
  className,
}: RevenueTransactionsCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3 flex-row items-center">
        <CardTitle>Receitas</CardTitle>
        <TrendingUp className="size-5 ml-auto text-green-600" />
      </CardHeader>
      <CardContent>
        <b className="text-2xl font-bold">R$ 10.000,00</b>
        <p className="mt-1 text-xs text-muted-foreground">
          <span className="text-red-600">-20%</span> em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
