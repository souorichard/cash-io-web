export function translateCategory(category: string) {
  const translates: { [key: string]: string } = {
    food: 'Alimentação',
    transport: 'Transporte',
    housing: 'Moradia',
    education: 'Educação',
    health: 'Saúde',
    leisure: 'Lazer',
    services: 'Serviços',
    investments: 'Investimentos',
    others: 'Outros',
  }

  const ptBrCategories = translates[category.toLowerCase()] || category

  return ptBrCategories.charAt(0).toLocaleUpperCase() + ptBrCategories.slice(1)
}
