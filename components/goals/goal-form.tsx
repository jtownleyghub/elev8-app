"use client"

import type React from "react"

import { useState } from "react"
import { useGoals } from "@/contexts/goal-context"
import type { Goal, LifeArea } from "@/types/goals"

interface GoalFormProps {
  onSave?: () => void
  onCancel?: () => void
  initialData?: Partial<Goal>
  isOnboarding?: boolean
}

export function GoalForm({ onSave, onCancel, initialData, isOnboarding = false }: GoalFormProps) {
  const { addGoal, updateGoal } = useGoals()
  const [formData, setFormData] = useState<Partial<Goal>>(
    initialData || {
      title: "",
      description: "",
      lifeArea: "Personal Growth",
      type: "Checklist",
      recurrence: "None",
    },
  )

  const lifeAreas: LifeArea[] = [
    "Personal Growth",
    "Health & Fitness",
    "Career & Work",
    "Finances",
    "Relationships",
    "Recreation & Leisure",
    "Contribution & Impact",
    "Spirituality",
  ]

  const goalTypes = ["Checklist", "Numeric", "Time-based"]
  const recurrenceOptions = ["None", "Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.id) {
      updateGoal(formData as Goal)
    } else {
      addGoal(formData as Omit<Goal, "id" | "createdAt" | "updatedAt" | "progress">)
    }
    if (onSave) onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Goal Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="What do you want to achieve?"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your goal in more detail..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lifeArea" className="block text-sm font-medium text-gray-300 mb-1">
            Life Area
          </label>
          <select
            id="lifeArea"
            name="lifeArea"
            value={formData.lifeArea}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {lifeAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
            Goal Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {goalTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="recurrence" className="block text-sm font-medium text-gray-300 mb-1">
          Recurrence
        </label>
        <select
          id="recurrence"
          name="recurrence"
          value={formData.recurrence}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {recurrenceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
        >
          {formData.id ? "Update Goal" : "Add Goal"}
        </button>
      </div>
    </form>
  )
}
