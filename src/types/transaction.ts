export type Transaction = {
  id: string
  description: string
  category: string
  amount: number
  type: string
  createdById: string
  createdAt: Date
  updatedAt: Date
}

export type TransactionWithOwner = {
  id: string
  description: string
  category: string
  amount: number
  type: string
  createdById: string
  createdBy: {
    name: string
    email: string
  }
  createdAt: Date
  updatedAt: Date
}
