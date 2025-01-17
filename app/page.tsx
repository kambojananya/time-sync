import Calendar from '@/components/Calendar'
import TeamMemberList from '@/components/TeamMemberList'
import TimezoneSelector from '@/components/TimezoneSelector'
import MeetingScheduler from '@/components/MeetingScheduler'
import Notes from '@/components/Notes'
import Link from 'next/link'
import EventForm from '@/components/EventForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">When2Meet - Team Scheduling</h1>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Calendar />
        </div>
        <div>
          <TeamMemberList />
          <TimezoneSelector />
          <MeetingScheduler />
          <EventForm />
          <Notes />
        </div>
      </div>
      <div className="mt-8">
        <Link href="/public/1" className="text-blue-500 hover:underline">
          View Public Schedule
        </Link>
      </div>
    </main>
  )
}

