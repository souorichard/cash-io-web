import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageTitle,
} from '@/components/application/patterns/page'
import { TransactionsTable } from '@/components/application/transactions-table'
import { Transaction } from '@/types/transaction'

const data: Transaction[] = [
  {
    id: '0',
    createdAt: '30/06/2024',
    description: 'Compra de livros',
    category: 'Educação',
    amount: 150,
    type: 'REVENUE',
  },
  {
    id: '1',
    createdAt: '30/06/2024',
    description: 'Supermercado',
    category: 'Alimentação',
    amount: 300,
    type: 'REVENUE',
  },
  {
    id: '2',
    createdAt: '30/06/2024',
    description: 'Mensalidade da academia',
    category: 'Saúde',
    amount: 120,
    type: 'REVENUE',
  },
  {
    id: '3',
    createdAt: '30/06/2024',
    description: 'Conta de energia elétrica',
    category: 'Utilidades',
    amount: 200,
    type: 'EXPENSE',
  },
  {
    id: '4',
    createdAt: '30/06/2024',
    description: 'Transporte público',
    category: 'Transporte',
    amount: 50,
    type: 'EXPENSE',
  },
]

export default function TransactionsPage() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageTitle>Transações</ApplicationPageTitle>
      </ApplicationPageHeader>
      <ApplicationPageContent>
        <TransactionsTable transactions={data} />
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
