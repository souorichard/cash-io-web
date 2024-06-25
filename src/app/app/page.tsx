import { ExpenseTransactionsCard } from '@/components/application/expense-transactions-card'
import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageTitle,
} from '@/components/application/patterns/page'

export default function DashboardPage() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageTitle>Dashboard</ApplicationPageTitle>
      </ApplicationPageHeader>
      <ApplicationPageContent>
        <div className="grid grid-cols-3 gap-x-4">
          <ExpenseTransactionsCard />
        </div>
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
