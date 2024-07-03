import { PropsWithChildren } from 'react'

import {
  Logo,
  LogoEmblem,
  LogoName,
} from '@/components/application/patterns/logo'
import { AuthPage } from '@/components/authentication/page'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen grid grid-cols-2">
      <AuthPage>{children}</AuthPage>
      <section className="p-10 flex flex-col bg-auth bg-cover bg-bottom">
        <Logo>
          <LogoEmblem className="fill-white" />
          <LogoName className="text-white" />
        </Logo>

        <div className="mt-auto flex justify-between items-center text-sm text-white">
          <span>
            Painel do parceiro &copy; Cash.io - {new Date().getFullYear()}
          </span>

          <span>
            Designed by <b>Freepik</b>
          </span>
        </div>
      </section>
    </main>
  )
}
