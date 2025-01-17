'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function Notes() {
  const [notes, setNotes] = useState('')

  const saveNotes = () => {
    // Here you would save the notes to your backend
    console.log('Saving notes:', notes)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Add team notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mb-4"
        />
        <Button onClick={saveNotes}>Save Notes</Button>
      </CardContent>
    </Card>
  )
}

