import { PropsWithChildren } from 'react'

import { MainHeader } from '@/components/application/main-header'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <MainHeader />
      <div className="p-8">{children}</div>
    </div>
  )
}
