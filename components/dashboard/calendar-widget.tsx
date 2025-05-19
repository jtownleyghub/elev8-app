"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Event {
  id: string
  date: Date
  title: string
  time: string
}

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    day: new Date().getDate(),
  })

  // Initialize with some events
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)

    const initialEvents = [
      { id: "1", date: today, title: "Team Meeting", time: "10:00 AM" },
      { id: "2", date: tomorrow, title: "Doctor's Appointment", time: "2:30 PM" },
      { id: "3", date: nextWeek, title: "Project Deadline", time: "5:00 PM" },
    ]

    setEvents(initialEvents)
  }, [])

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const monthName = currentDate.toLocaleString("default", { month: "long" })
  const year = currentDate.getFullYear()

  const days = []
  const blanks = []

  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push(<div key={`blank-${i}`} className="h-8 w-8"></div>)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d)
    const isToday =
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()

    const hasEvent = events.some(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )

    days.push(
      <div
        key={d}
        className={`h-8 w-8 flex items-center justify-center rounded-full text-sm cursor-pointer ${
          isToday
            ? "bg-indigo-600 text-white"
            : hasEvent
              ? "border border-indigo-500 text-indigo-400"
              : "text-gray-300 hover:bg-gray-700"
        }`}
        onClick={() => {
          setNewEvent({ ...newEvent, day: d })
          setShowAddEvent(true)
        }}
      >
        {d}
      </div>,
    )
  }

  const totalSlots = [...blanks, ...days]
  const rows = []
  let cells = []

  totalSlots.forEach((slot, i) => {
    if (i % 7 !== 0) {
      cells.push(slot)
    } else {
      rows.push(cells)
      cells = []
      cells.push(slot)
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells)
    }
  })

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Get today's events
  const today = new Date()
  const todayEvents = events.filter(
    (event) =>
      event.date.getDate() === today.getDate() &&
      event.date.getMonth() === today.getMonth() &&
      event.date.getFullYear() === today.getFullYear(),
  )

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.time) {
      const eventDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), newEvent.day)
      const newEventObj = {
        id: Date.now().toString(),
        date: eventDate,
        title: newEvent.title,
        time: newEvent.time,
      }

      setEvents([...events, newEventObj])
      setNewEvent({ title: "", time: "", day: new Date().getDate() })
      setShowAddEvent(false)
    }
  }

  const removeEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">
          {monthName} {year}
        </h3>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-700">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-700">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-7 gap-1">
              {row.map((cell, j) => (
                <div key={j} className="flex justify-center">
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {showAddEvent && (
        <div className="bg-gray-700/50 p-3 rounded-lg space-y-2 mt-4">
          <h4 className="text-sm font-medium">
            Add Event for {monthName} {newEvent.day}
          </h4>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Time (e.g. 3:00 PM)"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowAddEvent(false)}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button onClick={handleAddEvent} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm">
              Add Event
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Today's Events</h4>
        {todayEvents.length > 0 ? (
          <div className="space-y-2">
            {todayEvents.map((event) => (
              <div key={event.id} className="bg-gray-700/50 p-2 rounded-lg text-sm group">
                <div className="flex justify-between">
                  <div className="font-medium">{event.title}</div>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="text-xs text-gray-400">{event.time}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No events scheduled for today</p>
        )}
      </div>
    </div>
  )
}
