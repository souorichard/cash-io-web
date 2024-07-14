import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

import { Member } from './get-member'

export async function getMembers() {
  const response = await api.get<Member[]>(
    `/team/${Cookies.get('teamId')}/members`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
