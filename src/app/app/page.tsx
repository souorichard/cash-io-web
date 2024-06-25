import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageTitle,
} from '@/components/application/patterns/page'
import { ExpenseTransactionsCard } from '@/components/application/expense-transactions-card'
import { RevenueTransactionsCard } from '@/components/application/revenue-transactions-card'
import { TotalBalanceCard } from '@/components/application/total-balance-card'
import { TransactionsInPeriodCard } from '@/components/application/transactions-in-period-card'

export default function DashboardPage() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageTitle>Dashboard</ApplicationPageTitle>
      </ApplicationPageHeader>
      <ApplicationPageContent>
        <div className="grid grid-cols-3 gap-4">
          <ExpenseTransactionsCard className="col-span-1" />
          <RevenueTransactionsCard className="col-span-1" />
          <TotalBalanceCard className="col-span-1" />
          <TransactionsInPeriodCard className="col-span-2" />
        </div>
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
