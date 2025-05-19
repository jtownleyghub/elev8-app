"use client"

import type React from "react"

import { useState } from "react"
import type { Task, LifeArea } from "@/types/goals"
import { Calendar } from "lucide-react"

interface TaskFormProps {
  initialTask?: Task
  goalId: string
  category: LifeArea
  onSave: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  onCancel: () => void
}

export function TaskForm({ initialTask, goalId, category, onSave, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || "")
  const [description, setDescription] = useState(initialTask?.description || "")
  const [dueDate, setDueDate] = useState(initialTask?.dueDate?.split("T")[0] || "")
  const [priority, setPriority] = useState(initialTask?.priority || "Medium")
  const [isTopPriority, setIsTopPriority] = useState(initialTask?.isTopPriority || false)
  const [scheduledTime, setScheduledTime] = useState(initialTask?.scheduledTime?.split("T")[1]?.substring(0, 5) || "")

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const taskData: Omit<Task, "id" | "createdAt" | "updatedAt"> = {
      goalId,
      title,
      description,
      isCompleted: initialTask?.isCompleted || false,
      priority: priority as "Low" | "Medium" | "High",
      category,
      isTopPriority,
    }

    if (dueDate) {
      if (scheduledTime) {
        // Combine date and time
        const dateTime = new Date(`${dueDate}T${scheduledTime}:00`)
        taskData.dueDate = dateTime.toISOString()
        taskData.scheduledTime = dateTime.toISOString()
      } else {
        // Just date, no specific time
        taskData.dueDate = new Date(dueDate).toISOString()
      }
    }

    onSave(taskData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Task Title*
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter task title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your task"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">
            Due Date (Optional)
          </label>
          <div className="relative">
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-300 mb-1">
            Scheduled Time (Optional)
          </label>
          <input
            type="time"
            id="scheduledTime"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isTopPriority"
            checked={isTopPriority}
            onChange={(e) => setIsTopPriority(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
          />
          <label htmlFor="isTopPriority" className="ml-2 block text-sm text-gray-300">
            Add to Today's Focus
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
        >
          {initialTask ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  )
}
