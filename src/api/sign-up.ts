import { api } from '@/lib/axios'

interface SignUpRequest {
  name: string
  email: string
  password: string
  phone: string
}

export async function signUp({ name, email, password, phone }: SignUpRequest) {
  const response = await api.post('/sign-up', { name, email, password, phone })

  return response.data
}
