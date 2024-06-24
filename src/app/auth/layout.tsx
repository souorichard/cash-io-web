import { AuthPage } from '@/components/authentication/page'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen grid grid-cols-2">
      <AuthPage>{children}</AuthPage>
      <section className="bg-zinc-200"></section>
    </main>
  )
}
