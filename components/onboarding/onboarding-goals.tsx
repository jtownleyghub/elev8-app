"use client"

import { useState } from "react"
import { ArrowRight, Plus } from "lucide-react"
import { GoalForm } from "@/components/goals/goal-form"
import { useGoals } from "@/contexts/goal-context"
import type { Goal } from "@/types/goals"

interface OnboardingGoalsProps {
  onNext: () => void
}

export function OnboardingGoals({ onNext }: OnboardingGoalsProps) {
  const { goals } = useGoals()
  const [showGoalForm, setShowGoalForm] = useState(false)

  // Filter goals created during this onboarding session
  // We'll consider goals created in the last hour as part of this session
  const oneHourAgo = new Date()
  oneHourAgo.setHours(oneHourAgo.getHours() - 1)

  const onboardingGoals = goals.filter((goal) => {
    const createdAt = new Date(goal.createdAt)
    return createdAt > oneHourAgo
  })

  const handleAddGoal = () => {
    setShowGoalForm(true)
  }

  const handleGoalSaved = () => {
    setShowGoalForm(false)
  }

  const handleCancelGoal = () => {
    setShowGoalForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Set Your Goals</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          What are some goals you'd like to achieve? Add goals using our goal creation form.
        </p>
      </div>

      {showGoalForm ? (
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create a New Goal</h2>
          <GoalForm onSave={handleGoalSaved} onCancel={handleCancelGoal} isOnboarding={true} />
        </div>
      ) : (
        <div className="mt-8">
          {onboardingGoals.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Goals</h2>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {onboardingGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
                    <div>
                      <h3 className="font-medium text-white">{goal.title}</h3>
                      <p className="text-sm text-gray-300">{goal.lifeArea}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getGoalTypeColor(goal.type)}`}>{goal.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-800/50 rounded-lg">
              <p className="text-gray-300 mb-4">You haven't added any goals yet.</p>
              <p className="text-gray-400 mb-6">Goals help you track progress in different areas of your life.</p>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleAddGoal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add a Goal
            </button>
          </div>

          {onboardingGoals.length > 0 && (
            <div className="mt-4 text-gray-300 text-sm">
              <p>
                You've added {onboardingGoals.length} goal{onboardingGoals.length !== 1 ? "s" : ""}. You can add more
                goals or continue to the next step.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center inline-flex items-center justify-center transition-colors ${
            onboardingGoals.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={onboardingGoals.length === 0}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Helper function to get color based on goal type
function getGoalTypeColor(type: Goal["type"]) {
  switch (type) {
    case "Checklist":
      return "bg-emerald-500/20 text-emerald-300"
    case "Time-based":
      return "bg-blue-500/20 text-blue-300"
    case "Numeric":
      return "bg-amber-500/20 text-amber-300"
    default:
      return "bg-gray-500/20 text-gray-300"
  }
}
