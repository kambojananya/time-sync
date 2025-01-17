import Calendar from '@/components/Calendar'
import TeamMemberList from '@/components/TeamMemberList'

export default function PublicView({ params }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Team Schedule - Public View</h1>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Calendar />
        </div>
        <div>
          <TeamMemberList />
        </div>
      </div>
    </main>
  )
}

