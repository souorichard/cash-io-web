'use client'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Label } from '../ui/label'
import { DatePickerWithRange } from './date-picker-with-range'
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

const data = [
  {
    date: '01/02/2024',
    receipt: 1000,
  },
  {
    date: '02/02/2024',
    receipt: 100,
  },
  {
    date: '03/02/2024',
    receipt: 600,
  },
  {
    date: '04/02/2024',
    receipt: 300,
  },
]

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
          <DatePickerWithRange />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} style={{ fontSize: 12 }}>
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
              dataKey="receipt"
              stroke={violet['500']}
            />

            <Tooltip cursor={false} content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
