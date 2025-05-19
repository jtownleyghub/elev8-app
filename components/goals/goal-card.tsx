"use client"

import { useState } from "react"
import type { Goal, Task } from "@/types/goals"
import { useGoals } from "@/contexts/goal-context"
import { CheckCircle, ChevronDown, ChevronUp, Edit2, Trash2, Plus, Clock } from "lucide-react"
import { TaskForm } from "@/components/tasks/task-form"
import { TaskItem } from "@/components/tasks/task-item"

interface GoalCardProps {
  goal: Goal
  onEdit: (goal: Goal) => void
  onDelete: (goalId: string) => void
}

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const { tasks, addTask, updateTask, deleteTask, completeTask } = useGoals()
  const [expanded, setExpanded] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)

  // Get tasks for this goal
  const goalTasks = tasks.filter((task) => task.goalId === goal.id)
  const completedTasks = goalTasks.filter((task) => task.isCompleted)

  // Calculate progress for display
  const progress = goalTasks.length > 0 ? Math.round((completedTasks.length / goalTasks.length) * 100) : goal.progress

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

  const getGoalTypeIcon = () => {
    switch (goal.type) {
      case "Checklist":
        return <CheckCircle className="h-4 w-4 text-indigo-400" />
      case "Time-based":
        return <Clock className="h-4 w-4 text-indigo-400" />
      case "Numeric":
        return <span className="text-xs font-medium text-indigo-400">#</span>
      default:
        return null
    }
  }

  const handleAddTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    addTask(task)
    setShowAddTask(false)
  }

  const renderGoalProgress = () => {
    if (goal.type === "Checklist") {
      return (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progress</span>
            <span>
              {completedTasks.length}/{goalTasks.length}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getCategoryColor(goal.lifeArea)}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )
    } else if (goal.type === "Time-based") {
      const timeSpent = goal.timeSpent || 0
      const timeTarget = goal.timeTarget || 0
      const timeProgress = Math.min(Math.round((timeSpent / timeTarget) * 100), 100)

      return (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Time Progress</span>
            <span>
              {timeSpent}/{timeTarget} minutes
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getCategoryColor(goal.lifeArea)}`}
              style={{ width: `${timeProgress}%` }}
            ></div>
          </div>
        </div>
      )
    } else if (goal.type === "Numeric") {
      const current = goal.numericCurrent || 0
      const target = goal.numericTarget || 0
      const numericProgress = Math.min(Math.round((current / target) * 100), 100)

      return (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progress</span>
            <span>
              {current}/{target} {goal.numericUnit}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getCategoryColor(goal.lifeArea)}`}
              style={{ width: `${numericProgress}%` }}
            ></div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border ${
        goal.isCompleted ? "border-gray-700" : "border-gray-700 hover:border-indigo-500/50"
      } transition-colors`}
    >
      <div className="p-5">
        <div className="flex items-start">
          <div
            className={`h-10 w-10 rounded-full ${getCategoryColor(goal.lifeArea)} flex items-center justify-center mr-3 flex-shrink-0`}
          >
            {getGoalTypeIcon()}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-medium ${goal.isCompleted ? "text-gray-400" : "text-white"}`}>
                {goal.title}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(goal)}
                  className="p-1 text-gray-400 hover:text-indigo-400 rounded-full hover:bg-gray-700"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(goal.id)}
                  className="p-1 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
                >
                  {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-400 mt-1">
              <span className={`inline-block h-2 w-2 rounded-full mr-1 ${getCategoryColor(goal.lifeArea)}`}></span>
              {goal.lifeArea}
              {goal.targetDate && (
                <>
                  <span className="mx-2">•</span>
                  <span>Due {new Date(goal.targetDate).toLocaleDateString()}</span>
                </>
              )}
              {goal.recurrence !== "None" && (
                <>
                  <span className="mx-2">•</span>
                  <span>{goal.recurrence}</span>
                </>
              )}
            </div>

            {goal.description && (
              <p className={`mt-3 text-sm ${goal.isCompleted ? "text-gray-500" : "text-gray-300"}`}>
                {goal.description}
              </p>
            )}

            <div className="mt-4">{renderGoalProgress()}</div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-700 p-5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Tasks</h4>
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </button>
          </div>

          {showAddTask && (
            <div className="mb-4 bg-gray-700/50 p-4 rounded-lg">
              <TaskForm
                goalId={goal.id}
                category={goal.lifeArea}
                onSave={handleAddTask}
                onCancel={() => setShowAddTask(false)}
              />
            </div>
          )}

          <div className="space-y-2">
            {goalTasks.length > 0 ? (
              goalTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={completeTask}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No tasks yet. Add your first task!</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
