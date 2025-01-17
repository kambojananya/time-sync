'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const timezones = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Asia/Tokyo',
  // Add more timezones as needed
]

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = Array.from({ length: 24 }, (_, i) => i)

export default function AddMemberForm({ onAddMember }) {
  const [name, setName] = useState('')
  const [timezone, setTimezone] = useState('')
  const [availability, setAvailability] = useState({})

  const handleAvailabilityChange = (day, hour) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [hour]: !(prev[day] && prev[day][hour])
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newMember = {
      name,
      timezone,
      availability,
      color: getRandomColor()
    }

    try {
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      })

      if (response.ok) {
        onAddMember(newMember)
        setName('')
        setTimezone('')
        setAvailability({})
      } else {
        console.error('Failed to add member')
      }
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Select value={timezone} onValueChange={setTimezone} required>
        <SelectTrigger>
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          {timezones.map((tz) => (
            <SelectItem key={tz} value={tz}>
              {tz}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="border p-4 rounded-md">
        <h3 className="font-bold mb-2">Availability</h3>
        <div className="grid grid-cols-8 gap-2">
          <div></div>
          {weekDays.map(day => (
            <div key={day} className="text-center font-bold">{day}</div>
          ))}
          {hours.map(hour => (
            <>
              <div key={hour} className="text-right">{hour}:00</div>
              {weekDays.map(day => (
                <Checkbox
                  key={`${day}-${hour}`}
                  checked={availability[day]?.[hour] || false}
                  onCheckedChange={() => handleAvailabilityChange(day, hour)}
                />
              ))}
            </>
          ))}
        </div>
      </div>
      <Button type="submit">Add Member</Button>
    </form>
  )
}

