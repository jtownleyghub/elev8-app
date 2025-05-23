"use client"

import { useState, useEffect } from "react"
import { useGoals } from "@/contexts/goal-context"
import { GoalCard } from "@/components/goals/goal-card"
import { GoalForm } from "@/components/goals/goal-form"
import type { Goal, LifeArea } from "@/types/goals"
import { Plus, Filter } from "lucide-react"

export default function GoalsPage() {
  const { goals, deleteGoal } = useGoals()
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([])
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [filterLifeArea, setFilterLifeArea] = useState<LifeArea | "All">("All")

  useEffect(() => {
    if (filterLifeArea === "All") {
      setFilteredGoals(goals)
    } else {
      setFilteredGoals(goals.filter((goal) => goal.lifeArea === filterLifeArea))
    }
  }, [goals, filterLifeArea])

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal)
    setShowAddGoal(true)
  }

  const handleDeleteGoal = (goalId: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goalId)
    }
  }

  const handleSaveGoal = () => {
    setShowAddGoal(false)
    setEditingGoal(null)
  }

  const lifeAreas: (LifeArea | "All")[] = [
    "All",
    "Career",
    "Health",
    "Relationships",
    "Personal Growth",
    "Finance",
    "Recreation",
    "Home",
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Goals</h1>
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

      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="h-4 w-4 text-gray-400 mr-1" />
        <span className="text-sm text-gray-400">Filter:</span>
        {lifeAreas.map((area) => (
          <button
            key={area}
            onClick={() => setFilterLifeArea(area)}
            className={`px-3 py-1 rounded-full text-sm ${
              filterLifeArea === area ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      {showAddGoal && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">{editingGoal ? "Edit Goal" : "Create New Goal"}</h2>
          <GoalForm
            initialGoal={editingGoal || undefined}
            onSave={handleSaveGoal}
            onCancel={() => {
              setShowAddGoal(false)
              setEditingGoal(null)
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
          ))
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
            <p className="text-gray-400 mb-4">
              {filterLifeArea === "All"
                ? "You don't have any goals yet."
                : `You don't have any ${filterLifeArea.toLowerCase()} goals yet.`}
            </p>
            <button
              onClick={() => {
                setEditingGoal(null)
                setShowAddGoal(true)
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Goal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
