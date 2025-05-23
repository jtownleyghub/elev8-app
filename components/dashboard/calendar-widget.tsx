"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, User, Clock, ArrowRight } from "lucide-react"
import { useGoals } from "@/contexts/goal-context"
import type { Task } from "@/types/goals"
import Link from "next/link"

export function CalendarWidget() {
  const { tasks, goals, contacts, getTasksByDate, deleteTask, postponeTask } = useGoals()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(new Date().getDate())
  const [selectedDayTasks, setSelectedDayTasks] = useState<Task[]>([])

  // Get tasks for the selected day
  useEffect(() => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
    // Format date as YYYY-MM-DD for comparison
    const dateString = selectedDate.toISOString().split("T")[0]
    const dayTasks = getTasksByDate(dateString)
    setSelectedDayTasks(dayTasks)
  }, [currentDate, selectedDay, getTasksByDate, tasks])

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDay(1)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDay(1)
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

    const isSelected = d === selectedDay

    // Check if this day has tasks - format date as YYYY-MM-DD
    const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), d).toISOString().split("T")[0]
    const dayTasks = getTasksByDate(dateString)
    const hasTask = dayTasks.length > 0

    days.push(
      <div
        key={d}
        className={`h-8 w-8 flex items-center justify-center rounded-full text-sm cursor-pointer ${
          isSelected
            ? "bg-indigo-600 text-white"
            : isToday
              ? "border-2 border-indigo-500 text-indigo-400"
              : hasTask
                ? "border border-indigo-500/50 text-indigo-400"
                : "text-gray-300 hover:bg-gray-700"
        }`}
        onClick={() => setSelectedDay(d)}
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

  const formatSelectedDate = () => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  }

  const getContactForTask = (task: Task) => {
    const goal = goals.find((g) => g.id === task.goalId)
    if (!goal || !goal.contactId) return null

    return contacts.find((c) => c.id === goal.contactId)
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

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">{formatSelectedDate()}</h4>
        {selectedDayTasks.length > 0 ? (
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {selectedDayTasks.map((task) => {
              const contact = getContactForTask(task)

              return (
                <div key={task.id} className="bg-gray-700/50 p-2 rounded-lg text-sm group">
                  <div className="flex justify-between">
                    <div className="font-medium">{task.title}</div>
                    <div className="flex space-x-1">
                      {!task.isCompleted && (
                        <button
                          onClick={() => postponeTask(task.id)}
                          className="text-gray-400 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Postpone to tomorrow"
                        >
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{task.category}</span>

                    {contact && (
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {contact.name}
                      </div>
                    )}

                    {task.scheduledTime && (
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(task.scheduledTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    )}

                    {task.estimatedMins && !task.scheduledTime && (
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.estimatedMins} mins
                      </div>
                    )}

                    {task.fromTemplate && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-pink-900/60 text-pink-300">
                        Template
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No tasks scheduled for this day</p>
        )}

        <div className="mt-3">
          <Link href="/tasks/new" className="text-sm text-indigo-400 hover:text-indigo-300">
            + Add task for this day
          </Link>
        </div>
      </div>
    </div>
  )
}
