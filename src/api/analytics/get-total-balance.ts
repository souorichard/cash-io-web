import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface TotalBalanceResponse {
  balance: number
}

export async function getTotalBalance() {
  const response = await api.get<TotalBalanceResponse>(
    `/team/${Cookies.get('teamId')}/transactions/balance`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
