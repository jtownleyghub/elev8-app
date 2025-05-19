"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, User, Clock, ArrowRight } from "lucide-react"
import { useGoals } from "@/contexts/goal-context"
import type { Task } from "@/types/goals"

export function DailyPlanSummary() {
  const { tasks, goals, contacts, getTodaysTasks, completeTask, postponeTask } = useGoals()
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load today's tasks
  useEffect(() => {
    const dailyTasks = getTodaysTasks()
    // Sort by scheduled time
    dailyTasks.sort((a, b) => {
      if (!a.scheduledTime) return 1
      if (!b.scheduledTime) return -1
      return new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime()
    })
    setTodaysTasks(dailyTasks)
    setIsLoading(false)
  }, [getTodaysTasks, tasks])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Career":
        return "bg-blue-500"
      case "Health":
        return "bg-green-500"
      case "Relationships":
        return "bg-pink-500"
      case "Personal Growth":
        return "bg-purple-500"
      case "Finance":
        return "bg-yellow-500"
      case "Recreation":
        return "bg-red-500"
      case "Home":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getContactForTask = (task: Task) => {
    const goal = goals.find((g) => g.id === task.goalId)
    if (!goal || !goal.contactId) return null

    return contacts.find((c) => c.id === goal.contactId)
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading today's plan...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Today's Schedule</h3>
        <Link href="/tasks" className="text-sm text-indigo-400 hover:text-indigo-300">
          Manage Tasks
        </Link>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {todaysTasks.length > 0 ? (
          todaysTasks.map((task) => {
            const contact = getContactForTask(task)

            return (
              <div
                key={task.id}
                className={`flex items-center p-3 rounded-lg group ${task.isCompleted ? "bg-gray-700/30" : "bg-gray-700/50"}`}
              >
                <button
                  onClick={() => completeTask(task.id)}
                  className={`mr-3 ${task.isCompleted ? "text-indigo-400" : "text-gray-400"}`}
                >
                  {task.isCompleted ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                </button>

                <div className="flex-1">
                  <div className="flex items-center">
                    <span className={`${task.isCompleted ? "text-gray-400 line-through" : "text-white"}`}>
                      {task.title}
                    </span>
                    {task.fromTemplate && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-pink-900/60 text-pink-300">
                        Template
                      </span>
                    )}
                    {task.isTopPriority && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/60 text-indigo-300">
                        Focus
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400">
                    <span
                      className={`inline-block h-2 w-2 rounded-full mr-1 ${getCategoryColor(task.category)}`}
                    ></span>
                    <span>{task.category}</span>

                    {contact && (
                      <div className="flex items-center ml-2">
                        <User className="h-3 w-3 mr-1" />
                        {contact.name}
                      </div>
                    )}

                    {task.scheduledTime && (
                      <div className="flex items-center ml-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(task.scheduledTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    )}

                    {task.estimatedMins && !task.scheduledTime && (
                      <div className="flex items-center ml-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.estimatedMins} mins
                      </div>
                    )}
                  </div>
                </div>

                {!task.isCompleted && (
                  <button
                    onClick={() => postponeTask(task.id)}
                    className="p-1 text-gray-400 hover:text-yellow-400 rounded-full hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Postpone to tomorrow"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )
          })
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No tasks scheduled for today.</p>
          </div>
        )}
      </div>
    </div>
  )
}
