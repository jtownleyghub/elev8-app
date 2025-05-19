"use client"

import { useState } from "react"
import { ArrowRight, Calendar, Sliders, Shuffle } from "lucide-react"
import type { PlanningStyle } from "@/types/goals"

interface PlanningStyleProps {
  onNext: (planningStyle: PlanningStyle) => void
}

export function PlanningStyleSelection({ onNext }: PlanningStyleProps) {
  const [selectedStyle, setSelectedStyle] = useState<PlanningStyle | null>(null)

  const handleNext = () => {
    if (selectedStyle) {
      onNext(selectedStyle)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">How do you want to stay on track?</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          Choose how you'd like Elev8 to help you manage your goals and tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div
          className={`p-6 rounded-lg cursor-pointer transition-all ${
            selectedStyle === "Automated"
              ? "bg-indigo-900/40 border-2 border-indigo-500"
              : "bg-gray-800/50 border border-gray-700 hover:border-indigo-400"
          }`}
          onClick={() => setSelectedStyle("Automated")}
        >
          <div className="flex justify-center mb-4">
            <Calendar className="h-12 w-12 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Plan everything for me</h3>
          <p className="text-gray-300 text-center">
            Elev8 will automatically schedule tasks based on your availability, priorities, and deadlines.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg cursor-pointer transition-all ${
            selectedStyle === "Manual"
              ? "bg-indigo-900/40 border-2 border-indigo-500"
              : "bg-gray-800/50 border border-gray-700 hover:border-indigo-400"
          }`}
          onClick={() => setSelectedStyle("Manual")}
        >
          <div className="flex justify-center mb-4">
            <Sliders className="h-12 w-12 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Let me stay in control</h3>
          <p className="text-gray-300 text-center">
            You'll manually schedule and organize your tasks, with suggestions from Elev8 when needed.
          </p>
        </div>

        <div
          className={`p-6 rounded-lg cursor-pointer transition-all ${
            selectedStyle === "Balanced"
              ? "bg-indigo-900/40 border-2 border-indigo-500"
              : "bg-gray-800/50 border border-gray-700 hover:border-indigo-400"
          }`}
          onClick={() => setSelectedStyle("Balanced")}
        >
          <div className="flex justify-center mb-4">
            <Shuffle className="h-12 w-12 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-center mb-3">Blend of both</h3>
          <p className="text-gray-300 text-center">
            Elev8 will suggest schedules, but you'll have the final say on when and how tasks are organized.
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          disabled={!selectedStyle}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors ${
            !selectedStyle ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
