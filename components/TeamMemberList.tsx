'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AddMemberForm from './AddMemberForm'

export default function TeamMemberList() {
  const [members, setMembers] = useState([])

  const addMember = (newMember) => {
    setMembers([...members, newMember])
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Team Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <AddMemberForm onAddMember={addMember} />
          </DialogContent>
        </Dialog>
        <ul className="mt-4">
          {members.map((member, index) => (
            <li key={index} className="flex items-center mb-2">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: member.color }}
              ></div>
              {member.name} ({member.timezone})
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

