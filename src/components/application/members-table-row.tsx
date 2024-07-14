import { Trash2 } from 'lucide-react'

import { Member } from '@/api/member/get-member'

import { Button } from '../ui/button'
import { TableCell, TableRow } from '../ui/table'

interface MembersTableRowProps {
  member: Member
}

export function MembersTableRow({ member }: MembersTableRowProps) {
  return (
    <TableRow>
      <TableCell>{member.name}</TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell className="flex justify-center items-center">
        <Button size="icon" variant="ghost">
          <Trash2 className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
