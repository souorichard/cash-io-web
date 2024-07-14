import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export async function deleteMember(id: string) {
  const response = await api.delete(`/members/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  })

  return response.data
}
