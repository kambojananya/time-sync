import { NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Initialize the database
let db

(async () => {
  db = await open({
    filename: './when2meet.db',
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      day TEXT,
      startTime TEXT,
      endTime TEXT,
      duration INTEGER
    )
  `)
})()

export async function POST(request: Request) {
  const { title, day, startTime, endTime, duration } = await request.json()

  if (!db) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
  }

  try {
    const result = await db.run(
      'INSERT INTO events (title, day, startTime, endTime, duration) VALUES (?, ?, ?, ?, ?)',
      [title, day, startTime, endTime, duration]
    )

    return NextResponse.json({ id: result.lastID }, { status: 201 })
  } catch (error) {
    console.error('Error adding event:', error)
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 })
  }
}

export async function GET() {
  if (!db) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
  }

  try {
    const events = await db.all('SELECT * FROM events')
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

