import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

export async function inviteTeam(emails: string[]) {
  await Promise.all(
    emails.map(async (email) => {
      await api.post(
        `/team/${Cookies.get('teamId')}/invites`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        },
      )
    }),
  )
}
