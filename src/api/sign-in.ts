import { api } from '@/lib/axios'

interface SignInRequest {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInRequest) {
  const response = await api.post('/sign-in', { email, password })

  return response.data
}
