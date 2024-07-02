interface Category {
  id: string
  name: string
}

export async function getCategories(): Promise<Category[]> {
  return [
    {
      id: 'food',
      name: 'Alimentação',
    },
    {
      id: 'transport',
      name: 'Transporte',
    },
    {
      id: 'housing',
      name: 'Moradia',
    },
    {
      id: 'education',
      name: 'Educação',
    },
    {
      id: 'health',
      name: 'Saúde',
    },
    {
      id: 'leisure',
      name: 'Lazer',
    },
    {
      id: 'services',
      name: 'Serviços',
    },
    {
      id: 'investments',
      name: 'Investimentos',
    },
    {
      id: 'others',
      name: 'Outros',
    },
  ]
}
