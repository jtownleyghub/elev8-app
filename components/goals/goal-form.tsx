"use client"

import type React from "react"

import { useState } from "react"
import { useGoals } from "@/contexts/goal-context"
import type { Goal, LifeArea, GoalType, RecurrenceType, ChecklistItem } from "@/types/goals"
import { Plus, Trash2, Calendar, Clock, CheckSquare, BarChart2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface GoalFormProps {
  initialGoal?: Goal
  onSave: () => void
  onCancel: () => void
  lifeArea?: LifeArea
}

export function GoalForm({ initialGoal, onSave, onCancel, lifeArea }: GoalFormProps) {
  const { addGoal, updateGoal } = useGoals()

  const [title, setTitle] = useState(initialGoal?.title || "")
  const [description, setDescription] = useState(initialGoal?.description || "")
  const [selectedLifeArea, setSelectedLifeArea] = useState<LifeArea>(lifeArea || initialGoal?.lifeArea || "Career")
  const [goalType, setGoalType] = useState<GoalType>(initialGoal?.type || "Checklist")
  const [targetDate, setTargetDate] = useState(initialGoal?.targetDate?.split("T")[0] || "")
  const [recurrence, setRecurrence] = useState<RecurrenceType>(initialGoal?.recurrence || "None")

  // Type-specific fields
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(initialGoal?.checklistItems || [])
  const [timeTarget, setTimeTarget] = useState(initialGoal?.timeTarget?.toString() || "")
  const [numericTarget, setNumericTarget] = useState(initialGoal?.numericTarget?.toString() || "")
  const [numericUnit, setNumericUnit] = useState(initialGoal?.numericUnit || "")

  const [newChecklistItem, setNewChecklistItem] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const lifeAreas: LifeArea[] = [
    "Career",
    "Health",
    "Relationships",
    "Personal Growth",
    "Finance",
    "Recreation",
    "Home",
  ]

  const goalTypes: GoalType[] = ["Checklist", "Time-based", "Numeric"]

  const recurrenceTypes: RecurrenceType[] = ["None", "Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklistItems([...checklistItems, { id: uuidv4(), text: newChecklistItem.trim(), isCompleted: false }])
      setNewChecklistItem("")
    }
  }

  const handleRemoveChecklistItem = (id: string) => {
    setChecklistItems(checklistItems.filter((item) => item.id !== id))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (goalType === "Checklist" && checklistItems.length === 0) {
      newErrors.checklistItems = "At least one checklist item is required"
    }

    if (goalType === "Time-based" && !timeTarget) {
      newErrors.timeTarget = "Time target is required"
    }

    if (goalType === "Numeric" && !numericTarget) {
      newErrors.numericTarget = "Numeric target is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const goalData: Omit<Goal, "id" | "createdAt" | "updatedAt" | "progress" | "isCompleted"> = {
      title,
      description,
      lifeArea: selectedLifeArea,
      type: goalType,
      recurrence,
      ...(targetDate ? { targetDate: new Date(targetDate).toISOString() } : {}),
    }

    // Add type-specific fields
    if (goalType === "Checklist") {
      goalData.checklistItems = checklistItems
    } else if (goalType === "Time-based") {
      goalData.timeTarget = Number.parseInt(timeTarget)
      goalData.timeSpent = 0
    } else if (goalType === "Numeric") {
      goalData.numericTarget = Number.parseFloat(numericTarget)
      goalData.numericCurrent = 0
      goalData.numericUnit = numericUnit
    }

    if (initialGoal) {
      updateGoal({
        ...initialGoal,
        ...goalData,
        progress: initialGoal.progress,
        isCompleted: initialGoal.isCompleted,
      })
    } else {
      addGoal({
        ...goalData,
        isCompleted: false,
      })
    }

    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Goal Title*
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter goal title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your goal"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lifeArea" className="block text-sm font-medium text-gray-300 mb-1">
            Life Area*
          </label>
          <select
            id="lifeArea"
            value={selectedLifeArea}
            onChange={(e) => setSelectedLifeArea(e.target.value as LifeArea)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={!!lifeArea} // Disable if lifeArea is provided as prop
          >
            {lifeAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="goalType" className="block text-sm font-medium text-gray-300 mb-1">
            Goal Type*
          </label>
          <div className="flex space-x-2">
            {goalTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setGoalType(type)}
                className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center ${
                  goalType === type ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {type === "Checklist" && <CheckSquare className="h-4 w-4 mr-2" />}
                {type === "Time-based" && <Clock className="h-4 w-4 mr-2" />}
                {type === "Numeric" && <BarChart2 className="h-4 w-4 mr-2" />}
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="targetDate" className="block text-sm font-medium text-gray-300 mb-1">
            Target Date (Optional)
          </label>
          <div className="relative">
            <input
              type="date"
              id="targetDate"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="recurrence" className="block text-sm font-medium text-gray-300 mb-1">
            Recurrence
          </label>
          <select
            id="recurrence"
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value as RecurrenceType)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {recurrenceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Type-specific fields */}
      {goalType === "Checklist" && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Checklist Items*</label>
          <div className="space-y-2">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    setChecklistItems(
                      checklistItems.map((i) => (i.id === item.id ? { ...i, text: e.target.value } : i)),
                    )
                  }}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveChecklistItem(item.id)}
                  className="ml-2 p-2 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center">
              <input
                type="text"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                placeholder="Add new item"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddChecklistItem()
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddChecklistItem}
                className="ml-2 p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {errors.checklistItems && <p className="mt-1 text-sm text-red-400">{errors.checklistItems}</p>}
          </div>
        </div>
      )}

      {goalType === "Time-based" && (
        <div>
          <label htmlFor="timeTarget" className="block text-sm font-medium text-gray-300 mb-1">
            Time Target (minutes)*
          </label>
          <input
            type="number"
            id="timeTarget"
            value={timeTarget}
            onChange={(e) => setTimeTarget(e.target.value)}
            min="1"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 60 for 1 hour"
          />
          {errors.timeTarget && <p className="mt-1 text-sm text-red-400">{errors.timeTarget}</p>}
        </div>
      )}

      {goalType === "Numeric" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="numericTarget" className="block text-sm font-medium text-gray-300 mb-1">
              Target Value*
            </label>
            <input
              type="number"
              id="numericTarget"
              value={numericTarget}
              onChange={(e) => setNumericTarget(e.target.value)}
              min="0"
              step="any"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., 10"
            />
            {errors.numericTarget && <p className="mt-1 text-sm text-red-400">{errors.numericTarget}</p>}
          </div>
          <div>
            <label htmlFor="numericUnit" className="block text-sm font-medium text-gray-300 mb-1">
              Unit (Optional)
            </label>
            <input
              type="text"
              id="numericUnit"
              value={numericUnit}
              onChange={(e) => setNumericUnit(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., miles, books, pounds"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          {initialGoal ? "Update Goal" : "Create Goal"}
        </button>
      </div>
    </form>
  )
}
