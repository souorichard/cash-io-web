import { Metadata } from 'next'
import Link from 'next/link'

import {
  AuthPageContent,
  AuthPageDescription,
  AuthPageHeader,
  AuthPageTitle,
} from '@/components/authentication/page'
import { SignInForm } from '@/components/authentication/sign-in-form'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Acesso',
}

export default function SignIn() {
  return (
    <AuthPageContent>
      <AuthPageHeader>
        <AuthPageTitle>Acesse por aqui</AuthPageTitle>
        <AuthPageDescription>
          Gerencie e acompanhe suas finanças pelo sistema do parceiro
        </AuthPageDescription>
      </AuthPageHeader>

      <SignInForm />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground uppercase">
          Novo por aqui?
        </span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" className="w-full" asChild>
        <Link href="/auth/sign-up">Crie uma nova conta</Link>
      </Button>
    </AuthPageContent>
  )
}
