import { TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export function ExpenseTransactionsCard() {
  return (
    <Card>
      <CardHeader className="pb-3 flex-row items-center">
        <CardTitle>Despesas</CardTitle>
        <TrendingDown className="size-5 ml-auto text-red-600" />
      </CardHeader>
      <CardContent>
        <b className="text-2xl font-bold">R$ 10.000,00</b>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-600">-20%</span>
          em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
