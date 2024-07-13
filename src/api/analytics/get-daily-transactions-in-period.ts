import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface DailyTransactionsInPeriodResponse {
  date: string
  amount: number
}

export interface DailyTransactionsInPeriodProps {
  from?: Date
  to?: Date
}

export async function getDailyTransactionsInPeriod({
  from,
  to,
}: DailyTransactionsInPeriodProps) {
  const response = await api.get<DailyTransactionsInPeriodResponse[]>(
    `/team/${Cookies.get('teamId')}/transactions/period`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
