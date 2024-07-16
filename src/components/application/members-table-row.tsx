import { Trash2 } from 'lucide-react'

import { Member } from '@/api/member/get-member'

import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { TableCell, TableRow } from '../ui/table'
import { DeleteMemberAlertDialog } from './delete-member-alert-dialog'

interface MembersTableRowProps {
  member: Pick<Member, 'id' | 'name' | 'email' | 'is_owner'>
}

export function MembersTableRow({ member }: MembersTableRowProps) {
  return (
    <TableRow>
      <TableCell>{member.name}</TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell className="flex justify-center items-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="ghost" disabled={member.is_owner}>
              <Trash2 className="size-4" />
            </Button>
          </AlertDialogTrigger>
          <DeleteMemberAlertDialog id={member.id} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}
