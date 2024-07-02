'use client'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search, X } from 'lucide-react'
import { Separator } from '../ui/separator'
import { CreateTransactionDialog } from './create-transaction-dialog'
import { Controller, useForm } from 'react-hook-form'
import { TransactionsFilterFormData } from '@/schemas/application/transactions-filter'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { CategorySelect } from './category-select'

export function TransactionsTableFilter() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const description = searchParams.get('description')
  const category = searchParams.get('category')

  const { register, handleSubmit, control, reset } =
    useForm<TransactionsFilterFormData>({
      defaultValues: {
        description: description ?? '',
        category: category ?? 'all',
      },
    })

  function handleFilter(data: TransactionsFilterFormData) {
    const description = data.description
    const category = data.category

    const params = new URLSearchParams(searchParams)

    if (description) {
      params.set('description', description)
    } else {
      params.delete('description')
    }

    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  function handleClearFilter() {
    const params = new URLSearchParams(searchParams)

    params.delete('description')
    params.delete('category')

    reset({
      description: '',
      category: 'all',
    })
  }

  const hasAnyFilter = !!description || category !== 'all'

  return (
    <div className="flex items-center gap-5">
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex-1 flex items-center gap-2"
      >
        <Input
          placeholder="Pesquisar..."
          className="flex-1"
          {...register('description')}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => {
            return (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[15rem]">
                  <SelectValue {...field} />
                </SelectTrigger>
                <SelectContent>
                  <CategorySelect onDefaultValue />
                </SelectContent>
              </Select>
            )
          }}
        />

        <Button type="submit" variant="secondary">
          <Search className="size-4 mr-2" />
          Filtrar resultados
        </Button>

        <Button
          variant="link"
          onClick={handleClearFilter}
          disabled={!hasAnyFilter}
        >
          <X className="size-4 mr-2" />
          Limpar filtros
        </Button>
      </form>

      <Separator orientation="vertical" className="h-6" />

      <CreateTransactionDialog />
    </div>
  )
}
