import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageTitle,
} from '@/components/application/patterns/page'
import { TransactionsTable } from '@/components/application/transactions-table'

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
