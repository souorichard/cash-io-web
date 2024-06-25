import { Wallet2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export function TotalBalanceCard() {
  return (
    <Card className="bg-card-foreground">
      <CardHeader className="pb-3 flex-row items-center">
        <CardTitle className="text-primary-foreground">Saldo total</CardTitle>
        <Wallet2 className="size-5 ml-auto text-orange-600" />
      </CardHeader>
      <CardContent>
        <b className="text-2xl font-bold text-primary-foreground">
          R$ 10.000,00
        </b>
        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-600">
          <span className="text-emerald-600">+20%</span> em relação ao mês
          passado
        </p>
      </CardContent>
    </Card>
  )
}
