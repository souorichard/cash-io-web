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

export type TransactionsResponse = {
  transactions: Transaction[]
  meta: {
    total: number
    page: number
    perPage: number
  }
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
