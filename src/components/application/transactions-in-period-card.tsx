'use client'

import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2, XCircle } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { violet } from 'tailwindcss/colors'

import { getDailyTransactionsInPeriod } from '@/api/analytics/get-daily-transactions-in-period'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { DatePickerWithRange } from '../ui/date-picker-with-range'
import { Label } from '../ui/label'

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, number>) {
  if (active && payload && payload.length) {
    return (
      <div className="flex gap-1 rounded-l border bg-card p-2 text-sm text-card-foreground shadow-sm">
        <span className="font-semibold">{label}</span>
        <span>-</span>
        <span>
          {payload[0].value?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>
    )
  }

  return null
}

interface TransactionsInPeriodCardProps {
  className?: string
}

export function TransactionsInPeriodCard({
  className,
}: TransactionsInPeriodCardProps) {
  const [period, setPeriod] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyTransactionsInPeriod, error: dailyTransactionsError } =
    useQuery({
      queryKey: ['analytics', 'daily-transactions-in-period', period],
      queryFn: () =>
        getDailyTransactionsInPeriod({
          from: period?.from,
          to: period?.to,
        }),
      retry: false,
    })

  function handleResetPeriod() {
    setPeriod({
      from: subDays(new Date(), 7),
      to: new Date(),
    })
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex-row items-center pb-8">
        <div className="space-y-1.5">
          <CardTitle>Transações no Período</CardTitle>
          <CardDescription>
            Veja a receita diária no período selecionado
          </CardDescription>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Label>Período</Label>
          <DatePickerWithRange date={period} onDateChange={setPeriod} />
        </div>
      </CardHeader>
      <CardContent>
        {dailyTransactionsInPeriod ? (
          <>
            {dailyTransactionsInPeriod.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart
                  data={dailyTransactionsInPeriod}
                  style={{ fontSize: 12 }}
                >
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    tickLine={false}
                    axisLine={false}
                    dy={16}
                  />

                  <YAxis
                    stroke="#888888"
                    tickLine={false}
                    axisLine={false}
                    width={80}
                    tickFormatter={(value: number) =>
                      value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    }
                  />

                  <CartesianGrid className="!stroke-muted" vertical={false} />

                  <Line
                    type="linear"
                    strokeWidth={2}
                    dataKey="amount"
                    stroke={violet['500']}
                  />

                  <Tooltip cursor={false} content={<CustomTooltip />} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
                <span className="text-sm text-muted-foreground">
                  Nenhum resultado encontrado para o período.
                </span>
                <Button
                  size="sm"
                  variant="link"
                  className="text-violet-500 dark:text-violet-400"
                  onClick={handleResetPeriod}
                >
                  Exibir resultados dos últimos 7 dias
                </Button>
              </div>
            )}
          </>
        ) : dailyTransactionsError ? (
          <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
            <span className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
              <XCircle className="h-4 w-4" />
              Erro ao obter dados do período.
            </span>
            <Button
              size="sm"
              variant="link"
              className="text-violet-500 dark:text-violet-400"
              onClick={handleResetPeriod}
            >
              Recarregar gráfico
            </Button>
          </div>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
