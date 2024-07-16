import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface Transaction {
  id: string
  description: string
  category: string
  amount_in_cents: number
  type: string
  created_at: string
  created_by: {
    name: string
  }
}

export interface TransactionsResponse {
  transactions: Transaction[]
  meta: {
    total: number
    page: number
    perPage: number
  }
}

export interface TransactionsRequestQueryProps {
  description?: string
  category?: string
  page?: number
}

export async function getTransactions({
  description,
  category,
  page,
}: TransactionsRequestQueryProps) {
  const response = await api.get<TransactionsResponse>(
    `/team/${Cookies.get('teamId')}/transactions`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        description,
        category,
        page,
      },
    },
  )

  return response.data
}
