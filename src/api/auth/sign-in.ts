import { api } from '@/lib/axios'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  memberId: string
  teamId: string
  token: string
}

export async function signIn({ email, password }: SignInRequest) {
  const response = await api.post<SignInResponse>('/sign-in', {
    email,
    password,
  })

  return response.data
}
