export function getInitials(fullName: string) {
  const parts = fullName.split(' ')
  const firstName = parts[0]
  const middleName = parts[1]

  if (middleName) {
    const firstNameInitial = firstName[0].toUpperCase()
    const middleNameInitial = middleName[0].toUpperCase()

    return firstNameInitial + middleNameInitial
  }

  const firstNameInitial = firstName[0].toUpperCase()
  const firstNameSecondLetter = firstName[1].toUpperCase()

  return firstNameInitial + firstNameSecondLetter
}
