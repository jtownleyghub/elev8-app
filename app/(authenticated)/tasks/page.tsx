"use client"

import { useState, useEffect } from "react"
import { useGoals } from "@/contexts/goal-context"
import { TaskItem } from "@/components/tasks/task-item"
import { TaskForm } from "@/components/tasks/task-form"
import { Plus, Calendar, CheckCircle, Filter } from "lucide-react"
import type { Task } from "@/types/goals"

export default function TasksPage() {
  const { tasks, goals, addTask, updateTask, deleteTask, completeTask, postponeTask } = useGoals()
  const [showAddForm, setShowAddForm] = useState(false)
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "completed">("all")
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

  // Apply filters
  useEffect(() => {
    let result = [...tasks]

    // Sort by due date (most recent first)
    result.sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })

    // Apply filters
    switch (filter) {
      case "today":
        const today = new Date().toISOString().split("T")[0]
        result = result.filter((task) => {
          if (!task.dueDate) return false
          return task.dueDate.startsWith(today)
        })
        break
      case "upcoming":
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const tomorrowStr = tomorrow.toISOString().split("T")[0]
        result = result.filter((task) => {
          if (!task.dueDate) return false
          return task.dueDate >= tomorrowStr && !task.isCompleted
        })
        break
      case "completed":
        result = result.filter((task) => task.isCompleted)
        break
    }

    setFilteredTasks(result)
  }, [tasks, filter])

  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    addTask(taskData)
    setShowAddForm(false)
  }

  const getGoalTitle = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId)
    return goal ? goal.title : "No Goal"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-medium mb-4">Add New Task</h2>
          <TaskForm onSave={handleAddTask} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg flex items-center whitespace-nowrap ${
              filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <Filter className="h-4 w-4 mr-2" />
            All Tasks
          </button>
          <button
            onClick={() => setFilter("today")}
            className={`px-3 py-1.5 rounded-lg flex items-center whitespace-nowrap ${
              filter === "today" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-3 py-1.5 rounded-lg flex items-center whitespace-nowrap ${
              filter === "upcoming" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Upcoming
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1.5 rounded-lg flex items-center whitespace-nowrap ${
              filter === "completed" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id}>
              <TaskItem
                task={task}
                onComplete={completeTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onPostpone={postponeTask}
              />
              <div className="mt-1 ml-8 text-xs text-gray-500">Goal: {getGoalTitle(task.goalId)}</div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-800/50 rounded-lg">
            <p className="text-gray-400">No tasks found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
