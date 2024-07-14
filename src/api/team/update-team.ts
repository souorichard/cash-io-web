import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateTeamProps {
  name: string
  description?: string
}

export async function updateTeam({ name, description }: UpdateTeamProps) {
  const response = await api.put(
    `/team/${Cookies.get('teamId')}`,
    {
      name,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    },
  )

  return response.data
}
