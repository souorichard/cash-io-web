import { Metadata } from 'next'
import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageTitle,
} from '@/components/application/patterns/page'
import { TransactionsTable } from '@/components/application/transactions-table'

export const metadata: Metadata = {
  title: 'Transações',
}

export default function TransactionsPage() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageTitle>Transações</ApplicationPageTitle>
      </ApplicationPageHeader>
      <ApplicationPageContent>
        <TransactionsTable />
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
