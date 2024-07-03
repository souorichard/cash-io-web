import Cookies from 'js-cookie'

import { api } from '@/lib/axios'
import { UpdateUser, User } from '@/types/user'

export async function updateProfile({
  name,
  email,
  phone,
  teamName,
}: UpdateUser) {
  const response = await api.put<User>(
    '/users',
    {
      name,
      email,
      phone,
      teamName,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
