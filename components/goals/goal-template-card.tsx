"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, ChevronDown, ChevronUp, Check } from "lucide-react"
import { useGoals } from "@/contexts/goal-context"
import type { GoalTemplate, LifeArea } from "@/types/goals"

interface GoalTemplateCardProps {
  template: GoalTemplate
  onApply?: () => void
}

export function GoalTemplateCard({ template, onApply }: GoalTemplateCardProps) {
  const { applyGoalTemplate } = useGoals()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleApply = () => {
    if (template.templateId && template.lifeArea) {
      applyGoalTemplate(template.templateId, template.lifeArea as LifeArea)
      if (onApply) onApply()
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-colors">
      <div className="flex items-center p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
          <Image
            src={template.image || `/placeholder.svg?height=64&width=64&query=${encodeURIComponent(template.title)}`}
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
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {isExpanded && (
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
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleApply}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center transition-colors"
            >
              Start This Goal
              <Check className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
