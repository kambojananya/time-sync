'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const hours = Array.from({ length: 24 }, (_, i) => i)
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Calendar() {
  const [view, setView] = useState('week')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [members, setMembers] = useState([])
  const [currentWeek, setCurrentWeek] = useState(new Date())

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members')
      if (response.ok) {
        const data = await response.json()
        setMembers(data)
      } else {
        console.error('Failed to fetch members')
      }
    } catch (error) {
      console.error('Error fetching members:', error)
    }
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prevWeek => {
      const newWeek = new Date(prevWeek)
      newWeek.setDate(newWeek.getDate() + (direction === 'next' ? 7 : -7))
      return newWeek
    })
  }

  const renderCalendar = () => {
    const startOfWeek = new Date(currentWeek)
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    return (
      <div className="grid grid-cols-8 gap-1">
        <div className="col-span-1"></div>
        {days.map((day, index) => {
          const date = new Date(startOfWeek)
          date.setDate(startOfWeek.getDate() + index)
          return (
            <div key={day} className="text-center font-bold">
              {day}
              <div className="text-sm font-normal">{date.getDate()}</div>
            </div>
          )
        })}
        {hours.map((hour) => (
          <>
            <div key={hour} className="text-right pr-2">
              {hour}:00
            </div>
            {days.map((day) => (
              <div
                key={`${day}-${hour}`}
                className="border border-gray-200 h-8 relative"
              >
                {members.map((member) => {
                  const availability = JSON.parse(member.availability)
                  if (availability[day]?.[hour]) {
                    return (
                      <div
                        key={member.id}
                        className="absolute inset-0 opacity-50"
                        style={{ backgroundColor: member.color }}
                      ></div>
                    )
                  }
                  return null
                })}
              </div>
            ))}
          </>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Calendar</CardTitle>
        <div className="flex justify-between items-center">
          <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            {new Date(currentWeek).toLocaleDateString()} - {new Date(currentWeek).toLocaleDateString()}
          </div>
          <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button onClick={() => setView('week')}>Week View</Button>
          <Button onClick={() => setView('2weeks')}>2 Weeks View</Button>
        </div>
      </CardHeader>
      <CardContent>{renderCalendar()}</CardContent>
    </Card>
  )
}

