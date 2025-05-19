"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, Plus, Trash2 } from "lucide-react"
import { SampleBadge } from "@/components/ui/sample-badge"

interface Task {
  id: string
  text: string
  completed: boolean
  isSample?: boolean
}

export function TodaysFocus() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading tasks from storage
  useEffect(() => {
    const storedTasks = localStorage.getItem("todaysTasks")

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      // Default tasks if none exist
      const defaultTasks = [
        { id: "1", text: "Complete project proposal", completed: false, isSample: true },
        { id: "2", text: "30 minute workout", completed: true, isSample: true },
        { id: "3", text: "Read 20 pages", completed: false, isSample: true },
        { id: "4", text: "Meditate for 10 minutes", completed: false, isSample: true },
      ]
      setTasks(defaultTasks)
      localStorage.setItem("todaysTasks", JSON.stringify(defaultTasks))
    }

    setIsLoading(false)
  }, [])

  // Save tasks to storage when they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todaysTasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem = { id: Date.now().toString(), text: newTask.trim(), completed: false }
      setTasks([...tasks, newTaskItem])
      setNewTask("")
    }
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTask()
    }
  }

  const clearSampleTasks = () => {
    setTasks(tasks.filter((task) => !task.isSample))
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading tasks...</div>
  }

  const hasSampleTasks = tasks.some((task) => task.isSample)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a task for today..."
          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={addTask} className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {hasSampleTasks && (
        <div className="flex justify-between items-center bg-yellow-500/10 rounded-lg p-2 text-sm">
          <span className="text-yellow-300">Sample tasks are provided to help you get started</span>
          <button onClick={clearSampleTasks} className="text-yellow-300 hover:text-yellow-200 underline text-xs">
            Clear all samples
          </button>
        </div>
      )}

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center p-3 rounded-lg group ${task.completed ? "bg-gray-700/30" : "bg-gray-700/50"}`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`mr-3 ${task.completed ? "text-indigo-400" : "text-gray-400"}`}
            >
              {task.completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </button>
            <div className="flex-1">
              <div className="flex items-center">
                <span className={`${task.completed ? "text-gray-400 line-through" : "text-white"}`}>{task.text}</span>
                {task.isSample && <SampleBadge className="ml-2" />}
              </div>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            <p>No tasks for today. Add your first task above!</p>
          </div>
        )}
      </div>
    </div>
  )
}
