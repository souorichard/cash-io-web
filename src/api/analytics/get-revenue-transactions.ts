import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface RevenueTransactionsResponse {
  transactions: number
  diffFromLastMonth: number
}

export async function getRevenueTransactions() {
  const response = await api.get<RevenueTransactionsResponse>(
    `/team/${Cookies.get('teamId')}/transactions/revenue`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
