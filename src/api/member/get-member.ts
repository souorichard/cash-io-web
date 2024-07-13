import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface MemberResponse {
  id: string
  name?: string
  email: string
  is_owner: boolean
  is_confirmed: boolean
  team_id: string
  created_at: Date
}

export async function getMember() {
  const response = await api.get<MemberResponse>(
    `/members/${Cookies.get('memberId')}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
