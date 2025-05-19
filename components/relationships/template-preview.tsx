"use client"

import type { GoalTemplate } from "@/types/goals"
import { Clock, Calendar } from "lucide-react"

interface TemplatePreviewProps {
  template: GoalTemplate
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700">
      <h3 className="text-lg font-medium mb-2">{template.title}</h3>
      <p className="text-gray-300 mb-4">{template.description}</p>

      <div className="text-sm text-gray-400 mb-4">
        <span className="font-medium">Default Frequency:</span> {template.defaultFrequency}
      </div>

      <h4 className="font-medium text-sm mb-3">Tasks:</h4>
      <div className="space-y-3">
        {template.tasks.map((task, index) => (
          <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
            <div className="font-medium">{task.title}</div>
            <p className="text-sm text-gray-400 mt-1">{task.description}</p>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {task.suggestedDay}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {task.estimatedMins} mins
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
