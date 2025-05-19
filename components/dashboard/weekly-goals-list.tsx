"use client"

import { useState } from "react"
import { CheckCircle, Circle, ChevronRight, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { SampleBadge } from "@/components/ui/sample-badge"

interface Goal {
  id: string
  text: string
  completed: boolean
  category: string
  dueDate: string
  isSample?: boolean
}

export function WeeklyGoalsList() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      text: "Complete project proposal",
      completed: false,
      category: "Career",
      dueDate: "Fri, Jun 18",
      isSample: true,
    },
    {
      id: "2",
      text: "Run 10 miles this week",
      completed: false,
      category: "Health",
      dueDate: "Sun, Jun 20",
      isSample: true,
    },
    {
      id: "3",
      text: "Read 'Atomic Habits'",
      completed: true,
      category: "Personal Growth",
      dueDate: "Wed, Jun 16",
      isSample: true,
    },
    {
      id: "4",
      text: "Plan anniversary dinner",
      completed: false,
      category: "Relationships",
      dueDate: "Sat, Jun 19",
      isSample: true,
    },
  ])

  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    text: "",
    category: "Career",
    dueDate: "",
  })

  const toggleGoal = (id: string) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

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
      default:
        return "bg-gray-500"
    }
  }

  const handleAddGoal = () => {
    if (newGoal.text && newGoal.dueDate) {
      const newGoalObj = {
        id: Date.now().toString(),
        text: newGoal.text,
        completed: false,
        category: newGoal.category,
        dueDate: newGoal.dueDate,
      }

      setGoals([...goals, newGoalObj])
      setNewGoal({ text: "", category: "Career", dueDate: "" })
      setShowAddGoal(false)
    }
  }

  const removeGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const clearSampleGoals = () => {
    setGoals(goals.filter((goal) => !goal.isSample))
  }

  const hasSampleGoals = goals.some((goal) => goal.isSample)

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Weekly Goals</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Goal
          </button>
          <Link href="/goals" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      {hasSampleGoals && (
        <div className="flex justify-between items-center bg-yellow-500/10 rounded-lg p-2 text-sm mb-4">
          <span className="text-yellow-300">Sample goals are provided to help you get started</span>
          <button onClick={clearSampleGoals} className="text-yellow-300 hover:text-yellow-200 underline text-xs">
            Clear all samples
          </button>
        </div>
      )}

      {showAddGoal && (
        <div className="bg-gray-700/50 p-4 rounded-lg mb-4 space-y-3">
          <input
            type="text"
            placeholder="Goal description"
            value={newGoal.text}
            onChange={(e) => setNewGoal({ ...newGoal, text: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Career">Career</option>
              <option value="Health">Health</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Relationships">Relationships</option>
              <option value="Finance">Finance</option>
            </select>

            <input
              type="text"
              placeholder="Due date (e.g. Fri, Jun 18)"
              value={newGoal.dueDate}
              onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowAddGoal(false)}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button onClick={handleAddGoal} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm">
              Add Goal
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-center p-3 rounded-lg group ${goal.completed ? "bg-gray-700/30" : "bg-gray-700/50"}`}
          >
            <button
              onClick={() => toggleGoal(goal.id)}
              className={`mr-3 ${goal.completed ? "text-indigo-400" : "text-gray-400"}`}
            >
              {goal.completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </button>

            <div className="flex-1">
              <div className="flex items-center">
                <div className={`${goal.completed ? "text-gray-400 line-through" : "text-white"}`}>{goal.text}</div>
                {goal.isSample && <SampleBadge className="ml-2" />}
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-1">
                <span className={`inline-block h-2 w-2 rounded-full mr-1 ${getCategoryColor(goal.category)}`}></span>
                {goal.category} • Due {goal.dueDate}
              </div>
            </div>

            <button
              onClick={() => removeGoal(goal.id)}
              className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        {goals.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No goals for this week. Add your first goal!</p>
          </div>
        )}
      </div>
    </div>
  )
}
