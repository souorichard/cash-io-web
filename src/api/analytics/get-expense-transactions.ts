import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface ExpenseTransactionsResponse {
  transactions: number
  diffFromLastMonth: number
}

export async function getExpenseTransactions() {
  const response = await api.get<ExpenseTransactionsResponse>(
    `/team/${Cookies.get('teamId')}/transactions/expense`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
