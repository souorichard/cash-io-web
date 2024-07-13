import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export interface TeamResponse {
  id: string
  name: string
  description: string | null
  created_at: Date
}

export async function getTeam() {
  const response = await api.get<TeamResponse>(
    `/team/${Cookies.get('teamId')}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
