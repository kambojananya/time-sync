'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function EventForm() {
  const [eventTitle, setEventTitle] = useState('')
  const [eventDay, setEventDay] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [duration, setDuration] = useState('1')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent = {
      title: eventTitle,
      day: eventDay,
      startTime,
      endTime,
      duration: parseInt(duration)
    }

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })

      if (response.ok) {
        // Reset form
        setEventTitle('')
        setEventDay('')
        setStartTime('')
        setEndTime('')
        setDuration('1')
        // You might want to update the calendar or notify the user here
      } else {
        console.error('Failed to add event')
      }
    } catch (error) {
      console.error('Error adding event:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
          <Select value={eventDay} onValueChange={setEventDay} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {weekDays.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <Select value={duration} onValueChange={setDuration} required>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((week) => (
                <SelectItem key={week} value={week.toString()}>
                  {week} {week === 1 ? 'week' : 'weeks'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit">Add Event</Button>
        </form>
      </CardContent>
    </Card>
  )
}

