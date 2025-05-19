"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowRight, Check, ChevronDown, ChevronUp, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import { getTemplateById } from "@/utils/goal-templates"
import { useGoals } from "@/contexts/goal-context"
import type { GoalTemplate, LifeArea } from "@/types/goals"

interface SuggestedGoalsProps {
  selectedTemplateIds: string[]
  onNext: () => void
}

export function SuggestedGoals({ selectedTemplateIds, onNext }: SuggestedGoalsProps) {
  const { applyGoalTemplate } = useGoals()
  const [suggestedTemplates, setSuggestedTemplates] = useState<GoalTemplate[]>([])
  const [expandedTemplates, setExpandedTemplates] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load templates based on selected template IDs
    const templates = selectedTemplateIds
      .map((id) => getTemplateById(id))
      .filter((template): template is GoalTemplate => template !== null)

    setSuggestedTemplates(templates)
    setIsLoading(false)
  }, [selectedTemplateIds])

  const toggleExpand = (templateId: string) => {
    if (expandedTemplates.includes(templateId)) {
      setExpandedTemplates(expandedTemplates.filter((id) => id !== templateId))
    } else {
      setExpandedTemplates([...expandedTemplates, templateId])
    }
  }

  const toggleGoalSelection = (templateId: string) => {
    if (selectedGoals.includes(templateId)) {
      setSelectedGoals(selectedGoals.filter((id) => id !== templateId))
    } else {
      setSelectedGoals([...selectedGoals, templateId])
    }
  }

  const handleNext = () => {
    // Apply selected goal templates
    selectedGoals.forEach((templateId) => {
      const template = getTemplateById(templateId)
      if (template && template.lifeArea) {
        applyGoalTemplate(templateId, template.lifeArea as LifeArea)
      }
    })

    onNext()
  }

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading suggested goals...</div>
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Your Suggested Goals</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          Based on your aspirations, we've suggested these goals to help you get started. Select the ones you'd like to
          add to your dashboard.
        </p>
      </div>

      <div className="space-y-4 mt-8">
        {suggestedTemplates.map((template) => (
          <div
            key={template.templateId}
            className={`bg-gray-800 rounded-lg overflow-hidden border ${
              selectedGoals.includes(template.templateId) ? "border-indigo-500" : "border-gray-700"
            }`}
          >
            <div className="flex items-center p-4 cursor-pointer" onClick={() => toggleExpand(template.templateId)}>
              <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                <Image
                  src={
                    template.image || `/placeholder.svg?height=64&width=64&query=${encodeURIComponent(template.title)}`
                  }
                  alt={template.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">{template.title}</h3>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs mr-3">{template.lifeArea}</span>
                  <span className="flex items-center mr-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    {template.duration}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {template.defaultFrequency}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleGoalSelection(template.templateId)
                  }}
                  className={`mr-4 p-2 rounded-full ${
                    selectedGoals.includes(template.templateId)
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {selectedGoals.includes(template.templateId) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </button>
                {expandedTemplates.includes(template.templateId) ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            {expandedTemplates.includes(template.templateId) && (
              <div className="p-4 border-t border-gray-700">
                <p className="text-gray-300 mb-4">{template.description}</p>
                <h4 className="text-white font-medium mb-2">Key Tasks:</h4>
                <ul className="space-y-2">
                  {template.tasks.slice(0, 5).map((task) => (
                    <li key={task.title} className="flex items-start">
                      <div className="h-5 w-5 rounded-full border border-gray-600 flex-shrink-0 mt-0.5 mr-2"></div>
                      <div>
                        <div className="text-white text-sm font-medium">{task.title}</div>
                        <div className="text-gray-400 text-xs">{task.estimatedMins} mins</div>
                      </div>
                    </li>
                  ))}
                  {template.tasks.length > 5 && (
                    <li className="text-indigo-400 text-sm">+ {template.tasks.length - 5} more tasks</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <p className="text-gray-400 text-sm">
          {selectedGoals.length} of {suggestedTemplates.length} selected
        </p>
        <button
          onClick={handleNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors"
        >
          {selectedGoals.length > 0 ? "Add Selected Goals & Continue" : "Skip for Now"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
