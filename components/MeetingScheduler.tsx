'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function MeetingScheduler() {
  const [meetingTitle, setMeetingTitle] = useState('')
  const [meetingDate, setMeetingDate] = useState('')
  const [meetingTime, setMeetingTime] = useState('')

  const scheduleMeeting = () => {
    // Here you would integrate with Zoom API to create a meeting
    console.log('Scheduling meeting:', { meetingTitle, meetingDate, meetingTime })
    // Reset form
    setMeetingTitle('')
    setMeetingDate('')
    setMeetingTime('')
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Schedule Zoom Meeting</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Meeting Title"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
          />
          <Input
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
          />
          <Input
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
          />
          <Button onClick={scheduleMeeting}>Schedule Meeting</Button>
        </div>
      </CardContent>
    </Card>
  )
}

