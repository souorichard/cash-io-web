import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export async function getTotalBalance() {
  const response = await api.get<number>('/transactions/total-balance', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  })

  return response.data
}
