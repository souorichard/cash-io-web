import { api } from '@/lib/axios'
import { User, UpdateUser } from '@/types/user'
import Cookies from 'js-cookie'

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
