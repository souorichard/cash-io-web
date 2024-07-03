import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageTitle,
} from '@/components/application/patterns/page'
import { SettingsSidebar } from '@/components/application/settings-sidebar'

export const metadata: Metadata = {
  title: 'Configurações',
}

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageTitle>Configurações</ApplicationPageTitle>
      </ApplicationPageHeader>
      <ApplicationPageContent>
        <div className="grid grid-cols-[16rem_1fr] gap-10">
          <SettingsSidebar />
          {children}
        </div>
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
