import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface CreateTransactionProps {
  description: string
  category: string
  amount: number
  type: string
}

export async function createTransaction({
  description,
  category,
  amount,
  type,
}: CreateTransactionProps) {
  const response = await api.post(
    `/team/${Cookies.get('teamId')}/transactions`,
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
