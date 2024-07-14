'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getTeam, TeamResponse } from '@/api/team/get-team'
import { updateTeam } from '@/api/team/update-team'
import { TeamFormData, teamSchema } from '@/schemas/application/team'

import { Button } from '../ui/button'
import { CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import ErrorLabel from './error-label'

export function TeamForm() {
  const queryClient = useQueryClient()

  const { data: team, isLoading: isLoadingTeam } = useQuery({
    queryKey: ['team'],
    queryFn: getTeam,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    values: {
      name: team?.name ?? '',
      description: team?.description ?? '',
    },
  })

  function updateTeamDataOnCache({ name, description }: TeamFormData) {
    const cached = queryClient.getQueryData<TeamResponse>(['team'])

    if (cached) {
      queryClient.setQueryData<TeamResponse>(['team'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }
  }

  const { mutateAsync: updateTeamFn } = useMutation({
    mutationFn: updateTeam,
    onMutate: ({ name, description }) => {
      const { cached } = updateTeamDataOnCache({ name, description })

      return { previousTeam: cached }
    },
    onError(_, __, context) {
      if (context?.previousTeam) {
        updateTeamDataOnCache(context.previousTeam)
      }
    },
  })

  async function onSubmit(data: TeamFormData) {
    try {
      await updateTeamFn(data)

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
            <Input id="name" disabled={isLoadingTeam} {...register('name')} />
            {errors.name && <ErrorLabel>{errors.name.message}</ErrorLabel>}
          </fieldset>

          <fieldset className="col-span-full space-y-0.5">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              disabled={isLoadingTeam}
              {...register('description')}
            />
            {errors.description && (
              <ErrorLabel>{errors.description.message}</ErrorLabel>
            )}
          </fieldset>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          className="ml-auto"
          disabled={isSubmitting || isLoadingTeam}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar informações'}
        </Button>
      </CardFooter>
    </form>
  )
}
