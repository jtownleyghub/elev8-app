"use client"

import { useState } from "react"
import { getRelationshipTypes, getTemplatesForRelationshipType } from "@/utils/relationship-templates"
import { TemplatePreview } from "@/components/relationships/template-preview"
import type { GoalTemplate } from "@/types/goals"
import { Filter } from "lucide-react"

export default function TemplatesPage() {
  const relationshipTypes = getRelationshipTypes()
  const [selectedType, setSelectedType] = useState<string>(relationshipTypes[0] || "")
  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null)

  const templates = selectedType ? getTemplatesForRelationshipType(selectedType) : []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Relationship Templates</h1>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="h-4 w-4 text-gray-400 mr-1" />
        <span className="text-sm text-gray-400">Filter:</span>
        {relationshipTypes.map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type)
              setSelectedTemplate(null)
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedType === type ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700">
            <h2 className="text-xl font-medium mb-4">Available Templates</h2>
            <div className="space-y-2">
              {templates.map((template) => (
                <div
                  key={template.templateId}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedTemplate?.templateId === template.templateId
                      ? "bg-indigo-600/30 border border-indigo-500"
                      : "bg-gray-700/50 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="font-medium">{template.title}</div>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedTemplate ? (
            <TemplatePreview template={selectedTemplate} />
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
              <p className="text-gray-400">Select a template to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
