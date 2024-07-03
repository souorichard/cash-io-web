import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export async function getExpenseTransactions() {
  const response = await api.get<number>('/transactions/expense', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  })

  return response.data
}
