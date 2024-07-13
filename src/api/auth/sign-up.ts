import { api } from '@/lib/axios'

interface SignUpRequest {
  name: string
  email: string
  password: string
}

export async function signUp({ name, email, password }: SignUpRequest) {
  const response = await api.post('/sign-up', { name, email, password })

  return response.data
}
