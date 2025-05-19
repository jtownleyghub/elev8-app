"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Plus, X } from "lucide-react"

interface OnboardingGoalsProps {
  onNext: () => void
}

export function OnboardingGoals({ onNext }: OnboardingGoalsProps) {
  const [goals, setGoals] = useState<string[]>([])
  const [newGoal, setNewGoal] = useState("")

  const handleAddGoal = () => {
    if (newGoal.trim() !== "") {
      setGoals([...goals, newGoal.trim()])
      setNewGoal("")
    }
  }

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddGoal()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Set Your Goals</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          What are some goals you'd like to achieve? You can add more or change these later.
        </p>
      </div>

      <div className="mt-8">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a goal..."
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddGoal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {goals.map((goal, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
              <span className="text-white">{goal}</span>
              <button
                onClick={() => handleRemoveGoal(index)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          {goals.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No goals added yet. Add your first goal above!</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-gray-300 text-sm">
          <p>Example goals:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Run a half marathon in 6 months</li>
            <li>Learn to play the guitar</li>
            <li>Read 24 books this year</li>
            <li>Save $10,000 for a down payment</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center inline-flex items-center justify-center transition-colors"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
