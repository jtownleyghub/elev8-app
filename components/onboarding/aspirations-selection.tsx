"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import { getAspirationalTemplates } from "@/utils/goal-templates"
import type { GoalTemplate } from "@/types/goals"

interface AspirationsSelectionProps {
  onNext: (selectedTemplateIds: string[]) => void
}

export function AspirationsSelection({ onNext }: AspirationsSelectionProps) {
  const [aspirationalTemplates, setAspirationalTemplates] = useState<GoalTemplate[]>([])
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load aspirational templates
    const templates = getAspirationalTemplates()
    setAspirationalTemplates(templates)
    setIsLoading(false)
  }, [])

  const toggleTemplate = (templateId: string) => {
    if (selectedTemplates.includes(templateId)) {
      setSelectedTemplates(selectedTemplates.filter((id) => id !== templateId))
    } else {
      setSelectedTemplates([...selectedTemplates, templateId])
    }
  }

  const handleNext = () => {
    if (selectedTemplates.length >= 3) {
      onNext(selectedTemplates)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading aspirations...</div>
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Choose Your Aspirations</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          Select at least 3 aspirations that resonate with you. These will help us suggest goals that align with your
          vision for your life.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {aspirationalTemplates.map((template) => (
          <div
            key={template.templateId}
            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
              selectedTemplates.includes(template.templateId) ? "ring-4 ring-indigo-500" : "ring-1 ring-gray-700"
            }`}
            onClick={() => toggleTemplate(template.templateId)}
          >
            <div className="relative h-48 w-full">
              <Image
                src={
                  template.image || `/placeholder.svg?height=192&width=300&query=${encodeURIComponent(template.title)}`
                }
                alt={template.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-lg">{template.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-2">{template.description}</p>
            </div>
            {selectedTemplates.includes(template.templateId) && (
              <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <p className="text-gray-400 text-sm">
          {selectedTemplates.length} of {aspirationalTemplates.length} selected
          {selectedTemplates.length < 3 && <span className="text-yellow-500 ml-2">Please select at least 3</span>}
        </p>
        <button
          onClick={handleNext}
          disabled={selectedTemplates.length < 3}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors ${
            selectedTemplates.length < 3 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
