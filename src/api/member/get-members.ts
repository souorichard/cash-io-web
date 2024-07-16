import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

import { Member } from './get-member'

export interface MembersResponse {
  members: Pick<Member, 'id' | 'name' | 'email' | 'is_owner'>[]
  meta: {
    total: number
    page: number
    perPage: number
  }
}

export interface MembersRequestQueryProps {
  page?: number
}

export async function getMembers({ page }: MembersRequestQueryProps) {
  const response = await api.get<MembersResponse>(
    `/team/${Cookies.get('teamId')}/members`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      params: {
        page,
      },
    },
  )

  return response.data
}
