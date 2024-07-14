import { Plus } from 'lucide-react'

import { MembersTable } from '@/components/application/members-table'
import { ProfileForm } from '@/components/application/profile-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function TeamPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Equipe</CardTitle>
          <CardDescription>
            Atualize as informações da sua equipe.
          </CardDescription>
        </CardHeader>
        <ProfileForm />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Membros</CardTitle>
          <CardDescription>
            Convide novos membros para sua equipe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MembersTable />
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="ml-auto"
            // disabled={isSubmitting || isLoadingProfile}
          >
            <Plus className="size-4 mr-2" />
            {/* {isSubmitting ? 'Salvando...' : 'Salvar informações'} */}
            Convidar membros
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
