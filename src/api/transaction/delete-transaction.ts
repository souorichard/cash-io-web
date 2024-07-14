import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export async function deleteTransaction(id: string) {
  const response = await api.delete(
    `/team/${Cookies.get('teamId')}/transactions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
