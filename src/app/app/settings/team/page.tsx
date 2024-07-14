import { InviteGuestsDialog } from '@/components/application/invite-guests-dialog'
import { MembersTable } from '@/components/application/members-table'
import { TeamForm } from '@/components/application/team-form'
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
        <TeamForm />
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
          <InviteGuestsDialog />
        </CardFooter>
      </Card>
    </div>
  )
}
