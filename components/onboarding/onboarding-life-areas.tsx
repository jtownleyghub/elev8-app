"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

interface OnboardingLifeAreasProps {
  onNext: () => void
}

interface LifeArea {
  id: string
  name: string
  color: string
  selected: boolean
}

export function OnboardingLifeAreas({ onNext }: OnboardingLifeAreasProps) {
  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>([
    { id: "career", name: "Career", color: "bg-blue-500", selected: true },
    { id: "health", name: "Health & Fitness", color: "bg-green-500", selected: true },
    { id: "relationships", name: "Relationships", color: "bg-pink-500", selected: true },
    { id: "personal", name: "Personal Growth", color: "bg-purple-500", selected: true },
    { id: "finance", name: "Finance", color: "bg-yellow-500", selected: true },
    { id: "recreation", name: "Recreation", color: "bg-red-500", selected: true },
    { id: "spiritual", name: "Spiritual", color: "bg-teal-500", selected: false },
    { id: "community", name: "Community", color: "bg-orange-500", selected: false },
  ])

  const toggleLifeArea = (id: string) => {
    setLifeAreas(lifeAreas.map((area) => (area.id === id ? { ...area, selected: !area.selected } : area)))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Life Areas</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          Select the areas of life you want to focus on. You can customize these later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {lifeAreas.map((area) => (
          <div
            key={area.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              area.selected
                ? `border-${area.color.split("-")[1]}-500 bg-${area.color.split("-")[1]}-500/20`
                : "border-gray-700 bg-gray-800"
            }`}
            onClick={() => toggleLifeArea(area.id)}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${area.color} mr-3`}></div>
              <span className="text-white font-medium">{area.name}</span>
            </div>
          </div>
        ))}
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
