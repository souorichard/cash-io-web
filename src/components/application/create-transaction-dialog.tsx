'use client'

import { CirclePlus, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateTransactionFormData,
  createTransactionSchema,
} from '../../schemas/application/create-transaction'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { toast } from 'sonner'
import ErrorLabel from './error-label'
import { useMutation } from '@tanstack/react-query'
import { addTransaction } from '@/api/transaction/add-transaction'
import { queryClient } from '@/lib/react-query'

export function CreateTransactionDialog() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
  })

  const { mutateAsync: createTransaction } = useMutation({
    mutationKey: ['transactions'],
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  async function onSubmit(data: CreateTransactionFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      await createTransaction(data)

      toast.success('Transação criada com sucesso!')
    } catch (err) {
      toast.error('Erro ao criar transação! Tente novamente.')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="size-4 mr-2" />
          Adicionar transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>
            Informe os dados abaixo para a criação
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-y-4"
        >
          <fieldset className="space-y-0.5">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Digite uma descricão"
              {...register('description')}
            />
            {errors.description && (
              <ErrorLabel>{errors.description.message}</ErrorLabel>
            )}
          </fieldset>

          <fieldset className="space-y-0.5">
            <Label htmlFor="category">Categoria</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => {
                return (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        id="category"
                        placeholder="Selecione..."
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="teste">Teste</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )
              }}
            />
            {errors.category && (
              <ErrorLabel>{errors.category.message}</ErrorLabel>
            )}
          </fieldset>

          <fieldset className="space-y-0.5">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              placeholder="Digite o valor"
              {...register('amount')}
            />
            {errors.amount && <ErrorLabel>{errors.amount.message}</ErrorLabel>}
          </fieldset>

          <fieldset className="space-y-0.5">
            <Label htmlFor="type">Tipo</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => {
                return (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        id="type"
                        placeholder="Selecione..."
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="EXPENSE">Despesa</SelectItem>
                        <SelectItem value="REVENUE">Receita</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )
              }}
            />
            {errors.type && <ErrorLabel>{errors.type.message}</ErrorLabel>}
          </fieldset>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
              {isSubmitting ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
