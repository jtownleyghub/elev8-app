"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useGoals } from "@/contexts/goal-context"
import { GoalCard } from "@/components/goals/goal-card"
import { GoalForm } from "@/components/goals/goal-form"
import type { Goal, LifeArea } from "@/types/goals"
import { Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LifeAreaPage() {
  const params = useParams()
  const areaSlug = params.area as string
  const { getGoalsByLifeArea, deleteGoal } = useGoals()

  const [lifeArea, setLifeArea] = useState<LifeArea>("Career")
  const [goals, setGoals] = useState<Goal[]>([])
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)

  useEffect(() => {
    // Convert slug to proper life area
    const area = (areaSlug.charAt(0).toUpperCase() + areaSlug.slice(1)) as LifeArea
    setLifeArea(area)

    // Get goals for this life area
    const areaGoals = getGoalsByLifeArea(area)
    setGoals(areaGoals)
  }, [areaSlug, getGoalsByLifeArea])

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal)
    setShowAddGoal(true)
  }

  const handleDeleteGoal = (goalId: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goalId)
      setGoals(goals.filter((goal) => goal.id !== goalId))
    }
  }

  const handleSaveGoal = () => {
    setShowAddGoal(false)
    setEditingGoal(null)

    // Refresh goals
    const areaGoals = getGoalsByLifeArea(lifeArea)
    setGoals(areaGoals)
  }

  const getLifeAreaColor = (area: string) => {
    switch (area) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link href="/life-areas" className="mr-4 p-2 hover:bg-gray-800 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center">
          <div className={`h-8 w-8 rounded-full ${getLifeAreaColor(lifeArea)} mr-3`}></div>
          <h1 className="text-2xl font-bold">{lifeArea} Goals</h1>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-400">Manage your goals related to {lifeArea.toLowerCase()}.</p>
        <button
          onClick={() => {
            setEditingGoal(null)
            setShowAddGoal(true)
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Goal
        </button>
      </div>

      {showAddGoal && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">{editingGoal ? "Edit Goal" : "Create New Goal"}</h2>
          <GoalForm
            initialGoal={editingGoal || undefined}
            lifeArea={lifeArea}
            onSave={handleSaveGoal}
            onCancel={() => {
              setShowAddGoal(false)
              setEditingGoal(null)
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
          ))
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
            <p className="text-gray-400 mb-4">You don't have any {lifeArea.toLowerCase()} goals yet.</p>
            <button
              onClick={() => setShowAddGoal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First {lifeArea} Goal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
