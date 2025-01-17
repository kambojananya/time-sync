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
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      timezone TEXT,
      availability TEXT,
      color TEXT
    )
  `)
})()

export async function POST(request: Request) {
  const { name, timezone, availability, color } = await request.json()

  if (!db) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
  }

  try {
    const result = await db.run(
      'INSERT INTO members (name, timezone, availability, color) VALUES (?, ?, ?, ?)',
      [name, timezone, JSON.stringify(availability), color]
    )

    return NextResponse.json({ id: result.lastID }, { status: 201 })
  } catch (error) {
    console.error('Error adding member:', error)
    return NextResponse.json({ error: 'Failed to add member' }, { status: 500 })
  }
}

export async function GET() {
  if (!db) {
    return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
  }

  try {
    const members = await db.all('SELECT * FROM members')
    return NextResponse.json(members)
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
  }
}

