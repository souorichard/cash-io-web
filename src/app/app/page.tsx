import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageTitle,
} from '@/components/application/patterns/page'
import { ExpenseTransactionsCard } from '@/components/application/expense-transactions-card'
import { RevenueTransactionsCard } from '@/components/application/revenue-transactions-card'

export default function DashboardPage() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageTitle>Dashboard</ApplicationPageTitle>
      </ApplicationPageHeader>
      <ApplicationPageContent>
        <div className="grid grid-cols-3 gap-x-4">
          <ExpenseTransactionsCard />
          <RevenueTransactionsCard />
        </div>
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
