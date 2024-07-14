'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getMember, Member } from '@/api/member/get-member'
import { updateMember } from '@/api/member/update-member'
import { ProfileFormData, profileSchema } from '@/schemas/application/profile'

import { Button } from '../ui/button'
import { CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import ErrorLabel from './error-label'

interface UpdateProfileFormData {
  name?: string
}

export function ProfileForm() {
  const queryClient = useQueryClient()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['member'],
    queryFn: getMember,
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
      email: profile?.email ?? '',
    },
  })

  function updateProfileDataOnCache({ name }: UpdateProfileFormData) {
    const cached = queryClient.getQueryData<Member>(['profile'])

    if (cached) {
      queryClient.setQueryData<Member>(['profile'], {
        ...cached,
        name,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateMember,
    onMutate: ({ name }) => {
      const { cached } = updateProfileDataOnCache({ name })

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
          <fieldset className="col-span-full space-y-0.5">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              disabled={isLoadingProfile}
              {...register('name')}
            />
            {errors.name && <ErrorLabel>{errors.name.message}</ErrorLabel>}
          </fieldset>

          <fieldset className="col-span-full space-y-0.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" readOnly disabled {...register('email')} />
            {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
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
