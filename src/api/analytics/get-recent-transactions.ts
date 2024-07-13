import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface RecentTransactionsResponse {
  id: string
  description: string
  category: string
  type: string
  amount_in_cents: number
  created_by_id: string
  team_id: string
  created_at: Date
  created_by: {
    name: string
    email: string
  }
}

export async function getRecentTransactions() {
  const response = await api.get<RecentTransactionsResponse[]>(
    `/team/${Cookies.get('teamId')}/transactions/recent`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
