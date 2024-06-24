import {
  AuthPageContent,
  AuthPageDescription,
  AuthPageHeader,
  AuthPageTitle,
} from '@/components/authentication/page'
import { SignUpForm } from '@/components/authentication/sign-up-form'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function SignUp() {
  return (
    <AuthPageContent>
      <AuthPageHeader>
        <AuthPageTitle>Criar conta gratuita</AuthPageTitle>
        <AuthPageDescription>
          Seja um parceiro <b>Cash.io</b> e gerencie suas finanças com a gente
        </AuthPageDescription>
      </AuthPageHeader>

      <SignUpForm />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground uppercase">
          Já tem conta?
        </span>
        <Separator className="flex-1" />
      </div>

      <Button variant="outline" className="w-full">
        Entrar com conta existente
      </Button>
    </AuthPageContent>
  )
}
