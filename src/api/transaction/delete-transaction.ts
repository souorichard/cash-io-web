import { api } from '@/lib/axios'
import Cookies from 'js-cookie'

export async function deleteTransaction(id: string) {
  const response = await api.delete(`/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  })

  return response.data
}
