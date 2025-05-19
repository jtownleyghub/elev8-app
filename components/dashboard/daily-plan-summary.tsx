"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { CheckCircle, Circle } from "lucide-react"
import { useGoals } from "@/contexts/goal-context"
import type { Task } from "@/types/goals"

export function DailyPlanSummary() {
  const { tasks, getTodaysTasks, completeTask, updateTask, deleteTask } = useGoals()
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
          todaysTasks.map((task) => (
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
                  {task.isTopPriority && (
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/60 text-indigo-300">
                      Focus
                    </span>
                  )}
                </div>

                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <span className={`inline-block h-2 w-2 rounded-full mr-1 ${getCategoryColor(task.category)}`}></span>
                  {task.category}
                  {task.scheduledTime && (
                    <>
                      <span className="mx-2">•</span>
                      {new Date(task.scheduledTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No tasks scheduled for today.</p>
          </div>
        )}
      </div>
    </div>
  )
}
