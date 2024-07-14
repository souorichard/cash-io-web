import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface UpdateMemberProps {
  name?: string
}

export async function updateMember({ name }: UpdateMemberProps) {
  const response = await api.put(
    `/members/${Cookies.get('memberId')}`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
