import Cookies from 'js-cookie'

import { api } from '@/lib/axios'
import { TransactionWithOwner } from '@/types/transaction'

export async function getRecentTransactions() {
  const response = await api.get<TransactionWithOwner[]>(
    '/transactions/recent',
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
