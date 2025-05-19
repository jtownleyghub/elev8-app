"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, Trash2 } from "lucide-react"
import { useGoals } from "@/contexts/goal-context"
import type { Task } from "@/types/goals"

export function TodaysFocus() {
  const { tasks, getTopPriorityTasks, completeTask, deleteTask } = useGoals()
  const [focusTasks, setFocusTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get top priority tasks
    const topTasks = getTopPriorityTasks()
    setFocusTasks(topTasks)
    setIsLoading(false)
  }, [tasks, getTopPriorityTasks])

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading tasks...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Today's Focus</h3>
        <a href="/tasks" className="text-sm text-indigo-400 hover:text-indigo-300">
          Manage Tasks
        </a>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {focusTasks.length > 0 ? (
          focusTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center p-3 rounded-lg group ${
                task.isCompleted ? "bg-gray-700/30" : "bg-gray-700/50"
              }`}
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
                </div>
                {task.description && (
                  <p className={`text-xs mt-1 ${task.isCompleted ? "text-gray-500" : "text-gray-400"}`}>
                    {task.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400">
            <p>No focus tasks for today. Add tasks from your goals!</p>
          </div>
        )}
      </div>
    </div>
  )
}
