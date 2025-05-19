"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import type { LifeArea } from "@/types/goals"

interface LifeAreaFocusProps {
  onNext: (focusedAreas: LifeArea[]) => void
}

export function LifeAreaFocus({ onNext }: LifeAreaFocusProps) {
  const [selectedAreas, setSelectedAreas] = useState<LifeArea[]>(["Health", "Career", "Relationships"])

  const lifeAreas: { id: LifeArea; name: string; color: string }[] = [
    { id: "Career", name: "Career & Work", color: "bg-blue-500" },
    { id: "Health", name: "Health & Fitness", color: "bg-green-500" },
    { id: "Relationships", name: "Relationships", color: "bg-pink-500" },
    { id: "Personal Growth", name: "Personal Growth", color: "bg-purple-500" },
    { id: "Finance", name: "Finance", color: "bg-yellow-500" },
    { id: "Recreation", name: "Recreation", color: "bg-red-500" },
    { id: "Home", name: "Home", color: "bg-orange-500" },
    { id: "Travel", name: "Travel", color: "bg-teal-500" },
  ]

  const toggleArea = (area: LifeArea) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area))
    } else {
      setSelectedAreas([...selectedAreas, area])
    }
  }

  const handleNext = () => {
    onNext(selectedAreas)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">What parts of life matter most to you right now?</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          Select the areas of life you want to focus on. This helps us prioritize and suggest relevant goals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {lifeAreas.map((area) => (
          <div
            key={area.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedAreas.includes(area.id)
                ? `border-${area.color.split("-")[1]}-500 bg-${area.color.split("-")[1]}-500/20`
                : "border-gray-700 bg-gray-800"
            }`}
            onClick={() => toggleArea(area.id)}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${area.color} mr-3`}></div>
              <span className="text-white font-medium">{area.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <p className="text-gray-400 text-sm">
          {selectedAreas.length} of {lifeAreas.length} selected
        </p>
        <button
          onClick={handleNext}
          disabled={selectedAreas.length === 0}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors ${
            selectedAreas.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
