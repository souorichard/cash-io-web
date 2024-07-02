'use client'

import { useQuery } from '@tanstack/react-query'
import { SelectContent, SelectGroup, SelectItem } from '../ui/select'
import { getCategories } from '@/api/mocks/categories'

interface CategorySelectProps {
  onDefaultValue?: boolean
}

export function CategorySelect({ onDefaultValue }: CategorySelectProps) {
  const { data: categories } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
  })

  return (
    <SelectContent>
      <SelectGroup>
        {onDefaultValue && (
          <SelectItem value="all">Todas as categorias</SelectItem>
        )}
        {categories?.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  )
}
