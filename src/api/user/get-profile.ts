import Cookies from 'js-cookie'

import { api } from '@/lib/axios'
import { User } from '@/types/user'

export async function getProfile() {
  const response = await api.get<User>('/users/me', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  })

  return response.data
}
