"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Trash2 } from "lucide-react"
import Link from "next/link"
import { useGoals } from "@/contexts/goal-context"
import type { Goal } from "@/types/goals"

export function WeeklyGoalsList() {
  const { goals, tasks, completeTask, deleteGoal } = useGoals()
  const [weeklyGoals, setWeeklyGoals] = useState<Goal[]>([])
  const [showAddGoal, setShowAddGoal] = useState(false)

  useEffect(() => {
    // Get goals with a target date in the current week
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay()) // Start of week (Sunday)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6) // End of week (Saturday)

    const goalsThisWeek = goals.filter((goal) => {
      if (!goal.targetDate) return false

      const targetDate = new Date(goal.targetDate)
      return targetDate >= startOfWeek && targetDate <= endOfWeek
    })

    // Sort by target date
    goalsThisWeek.sort((a, b) => {
      if (!a.targetDate) return 1
      if (!b.targetDate) return -1
      return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
    })

    setWeeklyGoals(goalsThisWeek)
  }, [goals])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Career":
        return "bg-blue-500"
      case "Health":
        return "bg-green-500"
      case "Personal Growth":
        return "bg-purple-500"
      case "Relationships":
        return "bg-pink-500"
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

  const handleDeleteGoal = (goalId: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goalId)
      setWeeklyGoals(weeklyGoals.filter((goal) => goal.id !== goalId))
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Weekly Goals</h3>
        <div className="flex items-center space-x-4">
          <Link href="/goals" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {weeklyGoals.length > 0 ? (
          weeklyGoals.map((goal) => {
            // Get tasks for this goal
            const goalTasks = tasks.filter((task) => task.goalId === goal.id)
            const completedTasks = goalTasks.filter((task) => task.isCompleted)
            const progress =
              goalTasks.length > 0 ? Math.round((completedTasks.length / goalTasks.length) * 100) : goal.progress

            return (
              <div
                key={goal.id}
                className={`flex items-start p-3 rounded-lg group ${
                  goal.isCompleted ? "bg-gray-700/30" : "bg-gray-700/50"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className={`${goal.isCompleted ? "text-gray-400 line-through" : "text-white"}`}>
                      {goal.title}
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <span
                      className={`inline-block h-2 w-2 rounded-full mr-1 ${getCategoryColor(goal.lifeArea)}`}
                    ></span>
                    {goal.lifeArea} • Due {new Date(goal.targetDate || "").toLocaleDateString()}
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${getCategoryColor(goal.lifeArea)}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="ml-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )
          })
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No goals for this week. Add your first goal!</p>
          </div>
        )}
      </div>
    </div>
  )
}
