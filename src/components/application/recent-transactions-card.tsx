import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'

interface RecentTransactionsCardProps {
  className?: string
}

export function RecentTransactionsCard({
  className,
}: RecentTransactionsCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-8">
        <CardTitle>Transações recentes</CardTitle>
        <CardDescription>
          Veja as transações adicionadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarFallback>RJ</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <b className="text-sm font-medium">Robert Johnson</b>
              <p className="text-xs text-muted-foreground">nome@exemplo.com</p>
            </div>
            <b className="ml-auto text-sm font-semibold">- R$ 2.000,00</b>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
