"use client"

import { useState, useEffect } from "react"
import { useGoals } from "@/contexts/goal-context"
import { GoalCard } from "@/components/goals/goal-card"
import { GoalForm } from "@/components/goals/goal-form"
import type { Goal } from "@/types/goals"
import { Plus, ArrowLeft, Users, Heart } from "lucide-react"
import Link from "next/link"

export default function RelationshipsPage() {
  const { getGoalsByLifeArea, deleteGoal } = useGoals()
  const [goals, setGoals] = useState<Goal[]>([])
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)

  useEffect(() => {
    // Get relationship goals that are not contact-specific
    const relationshipGoals = getGoalsByLifeArea("Relationships").filter((goal) => !goal.contactId)
    setGoals(relationshipGoals)
  }, [getGoalsByLifeArea])

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
    const relationshipGoals = getGoalsByLifeArea("Relationships").filter((goal) => !goal.contactId)
    setGoals(relationshipGoals)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link href="/life-areas" className="mr-4 p-2 hover:bg-gray-800 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center mr-3">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Relationships</h1>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-6">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center mr-3">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Contact Management</h3>
            <p className="text-sm text-gray-400">
              Track individual relationships and set up recurring engagement tasks
            </p>
          </div>
        </div>
        <Link
          href="/life-areas/relationships/contacts"
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-center transition-colors"
        >
          Manage Contacts
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Relationship Goals</h2>
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
            lifeArea="Relationships"
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
            <p className="text-gray-400 mb-4">You don't have any general relationship goals yet.</p>
            <button
              onClick={() => setShowAddGoal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Relationship Goal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
