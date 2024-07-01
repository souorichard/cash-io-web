import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

export async function getRevenueTransactions() {
  const response = await api.get<number>('/transactions/revenue', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  })

  return response.data
}
