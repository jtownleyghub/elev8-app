"use client"

import { useState, useEffect } from "react"
import { useGoals } from "@/contexts/goal-context"
import { TaskItem } from "@/components/tasks/task-item"
import { TaskForm } from "@/components/tasks/task-form"
import type { Task, LifeArea } from "@/types/goals"
import { Plus, Filter, Calendar, CheckCircle } from "lucide-react"

export default function TasksPage() {
  const { tasks, goals, addTask, updateTask, deleteTask, completeTask } = useGoals()
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [showAddTask, setShowAddTask] = useState(false)
  const [filterCategory, setFilterCategory] = useState<LifeArea | "All">("All")
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Completed">("Pending")
  const [selectedGoalId, setSelectedGoalId] = useState<string>("")

  useEffect(() => {
    let filtered = tasks

    // Filter by category
    if (filterCategory !== "All") {
      filtered = filtered.filter((task) => task.category === filterCategory)
    }

    // Filter by status
    if (filterStatus === "Pending") {
      filtered = filtered.filter((task) => !task.isCompleted)
    } else if (filterStatus === "Completed") {
      filtered = filtered.filter((task) => task.isCompleted)
    }

    setFilteredTasks(filtered)
  }, [tasks, filterCategory, filterStatus])

  const handleSaveTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    addTask(taskData)
    setShowAddTask(false)
  }

  const categories: (LifeArea | "All")[] = [
    "All",
    "Career",
    "Health",
    "Relationships",
    "Personal Growth",
    "Finance",
    "Recreation",
    "Home",
  ]

  const statuses = ["All", "Pending", "Completed"]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-400">Category:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                filterCategory === category ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <CheckCircle className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-400">Status:</span>
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as "All" | "Pending" | "Completed")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === status ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {showAddTask && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Create New Task</h2>

          <div className="mb-4">
            <label htmlFor="goalSelect" className="block text-sm font-medium text-gray-300 mb-1">
              Select Goal (Optional)
            </label>
            <select
              id="goalSelect"
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">No specific goal</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title} ({goal.lifeArea})
                </option>
              ))}
            </select>
          </div>

          <TaskForm
            goalId={selectedGoalId || goals[0]?.id || ""}
            category={selectedGoalId ? goals.find((g) => g.id === selectedGoalId)?.lifeArea || "Career" : "Career"}
            onSave={handleSaveTask}
            onCancel={() => setShowAddTask(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          <>
            {/* Today's tasks */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-indigo-400 mr-2" />
                <h2 className="text-xl font-medium">Today</h2>
              </div>
              <div className="space-y-2">
                {filteredTasks
                  .filter((task) => {
                    if (!task.dueDate) return false
                    const today = new Date().toISOString().split("T")[0]
                    return task.dueDate.startsWith(today)
                  })
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onComplete={completeTask}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
              </div>
            </div>

            {/* Upcoming tasks */}
            <div>
              <h2 className="text-xl font-medium mb-3">Upcoming</h2>
              <div className="space-y-2">
                {filteredTasks
                  .filter((task) => {
                    if (!task.dueDate) return true // Tasks without due date
                    const today = new Date().toISOString().split("T")[0]
                    return task.dueDate > today
                  })
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onComplete={completeTask}
                      onUpdate={updateTask}
                      onDelete={deleteTask}
                    />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
            <p className="text-gray-400 mb-4">
              {filterStatus === "Pending"
                ? "You don't have any pending tasks."
                : filterStatus === "Completed"
                  ? "You don't have any completed tasks."
                  : "You don't have any tasks yet."}
            </p>
            <button
              onClick={() => setShowAddTask(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Task
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
