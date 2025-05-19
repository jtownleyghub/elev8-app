"use client"

import { useState } from "react"
import type { Task } from "@/types/goals"
import { CheckCircle, Circle, Edit2, Trash2, Calendar, Clock, Flag } from "lucide-react"
import { TaskForm } from "./task-form"

interface TaskItemProps {
  task: Task
  onComplete: (taskId: string) => void
  onUpdate: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function TaskItem({ task, onComplete, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-400"
      case "Medium":
        return "text-yellow-400"
      case "Low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

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

  const handleSaveEdit = (updatedTaskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    onUpdate({
      ...task,
      ...updatedTaskData,
      updatedAt: new Date().toISOString(),
    })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-gray-700/50 p-3 rounded-lg">
        <TaskForm
          initialTask={task}
          goalId={task.goalId}
          category={task.category}
          onSave={handleSaveEdit}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center p-3 rounded-lg group ${task.isCompleted ? "bg-gray-700/30" : "bg-gray-700/50"}`}>
      <button
        onClick={() => onComplete(task.id)}
        className={`mr-3 ${task.isCompleted ? "text-indigo-400" : "text-gray-400"}`}
      >
        {task.isCompleted ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
      </button>

      <div className="flex-1">
        <div className="flex items-center">
          <span className={`${task.isCompleted ? "text-gray-400 line-through" : "text-white"}`}>{task.title}</span>
          {task.isTopPriority && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/60 text-indigo-300">
              Focus
            </span>
          )}
        </div>

        {task.description && (
          <p className={`text-xs mt-1 ${task.isCompleted ? "text-gray-500" : "text-gray-400"}`}>{task.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-3 mt-1">
          <div className="flex items-center text-xs text-gray-400">
            <span className={`inline-block h-2 w-2 rounded-full mr-1 ${getCategoryColor(task.category)}`}></span>
            {task.category}
          </div>

          {task.dueDate && (
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}

          {task.scheduledTime && (
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(task.scheduledTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          )}

          <div className={`flex items-center text-xs ${getPriorityColor(task.priority)}`}>
            <Flag className="h-3 w-3 mr-1" />
            {task.priority}
          </div>
        </div>
      </div>

      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-gray-400 hover:text-indigo-400 rounded-full hover:bg-gray-700"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-700"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
