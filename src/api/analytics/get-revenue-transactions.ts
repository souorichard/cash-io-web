import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export async function getRevenueTransactions() {
  const response = await api.get<number>('/transactions/revenue', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  })

  return response.data
}
