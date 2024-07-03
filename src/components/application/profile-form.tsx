'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getProfile } from '@/api/user/get-profile'
import { updateProfile } from '@/api/user/update-profile'
import { ProfileFormData, profileSchema } from '@/schemas/application/profile'
import { User } from '@/types/user'

import { Button } from '../ui/button'
import { CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import ErrorLabel from './error-label'

export function ProfileForm() {
  const queryClient = useQueryClient()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['me'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: profile?.name ?? '',
      teamName: profile?.teamName ?? '',
      email: profile?.email ?? '',
      phone: profile?.phone ?? '',
    },
  })

  function updateProfileDataOnCache({
    name,
    email,
    phone,
    teamName,
  }: ProfileFormData) {
    const cached = queryClient.getQueryData<User>(['me'])

    if (cached) {
      queryClient.setQueryData<User>(['me'], {
        ...cached,
        name,
        email,
        phone,
        teamName,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ name, email, phone, teamName }) => {
      const { cached } = updateProfileDataOnCache({
        name,
        email,
        phone,
        teamName,
      })

      return { previousProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateProfileDataOnCache(context.previousProfile)
      }
    },
  })

  async function onSubmit(data: ProfileFormData) {
    try {
      await updateProfileFn(data)

      toast.success('Perfil atualizado com sucesso!')
    } catch (err) {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          <fieldset className="col-span-3 space-y-0.5">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              disabled={isLoadingProfile}
              {...register('name')}
            />
            {errors.name && <ErrorLabel>{errors.name.message}</ErrorLabel>}
          </fieldset>

          <fieldset className="col-span-1 space-y-0.5">
            <Label htmlFor="name">Equipe</Label>
            <Input
              id="teamName"
              disabled={isLoadingProfile}
              {...register('teamName')}
            />
            {errors.teamName && (
              <ErrorLabel>{errors.teamName.message}</ErrorLabel>
            )}
          </fieldset>

          <fieldset className="col-span-3 space-y-0.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              disabled={isLoadingProfile}
              {...register('email')}
            />
            {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
          </fieldset>

          <fieldset className="col-span-1 space-y-0.5">
            <Label htmlFor="phone">Celular</Label>
            <Input
              id="phone"
              disabled={isLoadingProfile}
              {...register('phone')}
            />
            {errors.phone && <ErrorLabel>{errors.phone.message}</ErrorLabel>}
          </fieldset>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          className="ml-auto"
          disabled={isSubmitting || isLoadingProfile}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar informações'}
        </Button>
      </CardFooter>
    </form>
  )
}
