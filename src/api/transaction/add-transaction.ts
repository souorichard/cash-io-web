import Cookies from 'js-cookie'

import { api } from '@/lib/axios'
import { AddTransactionData } from '@/schemas/application/transactions-request'

export async function addTransaction({
  description,
  category,
  amount,
  type,
}: AddTransactionData) {
  const response = await api.post(
    '/transactions',
    {
      description,
      category,
      amount,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
