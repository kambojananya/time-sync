'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const timezones = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Asia/Tokyo',
  // Add more timezones as needed
]

export default function TimezoneSelector() {
  const [selectedTimezone, setSelectedTimezone] = useState('UTC')

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Your Timezone</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
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
      </CardContent>
    </Card>
  )
}

