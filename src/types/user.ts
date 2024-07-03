export interface User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  teamName: string
  createdAt: Date
  updatedAt: Date
}

export interface UpdateUser {
  name: string
  email: string
  phone: string
  teamName: string
}
