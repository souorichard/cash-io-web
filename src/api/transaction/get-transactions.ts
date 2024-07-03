import Cookies from 'js-cookie'

import { api } from '@/lib/axios'
import { TransactionsRequestQueryParams } from '@/schemas/application/transactions-request'
import { TransactionsResponse } from '@/types/transaction'

export async function getTransactions({
  description,
  category,
  page,
}: TransactionsRequestQueryParams) {
  const response = await api.get<TransactionsResponse>('/transactions', {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
    params: {
      description,
      category,
      page,
    },
  })

  return response.data
}
