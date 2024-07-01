import { api } from '@/lib/axios'
import { User } from '@/types/user'
import Cookies from 'js-cookie'

export async function getProfile() {
  const response = await api.get<User>('/users/me', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  })

  return response.data
}
