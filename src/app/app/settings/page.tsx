import { ProfileForm } from '@/components/application/profile-form'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function MyProfile() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Meu perfil</CardTitle>
          <CardDescription>Atualize suas informações de perfil</CardDescription>
        </CardHeader>
        <ProfileForm />
      </Card>
    </div>
  )
}
