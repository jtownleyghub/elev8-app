"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Contact, TaskTemplate, GoalTemplate, RelationshipType } from "@/types/goals"
import { Plus, Trash2, Info, Check, Globe } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { getRelationshipTypes, getTemplatesForRelationshipType } from "@/utils/relationship-templates"
import * as Accordion from "@radix-ui/react-accordion"
import * as Switch from "@radix-ui/react-switch"

interface ContactFormProps {
  initialContact?: Contact
  onSave: (contact: Omit<Contact, "id">) => void
  onCancel: () => void
}

export function ContactForm({ initialContact, onSave, onCancel }: ContactFormProps) {
  const [name, setName] = useState(initialContact?.name || "")
  const [relationshipType, setRelationshipType] = useState<RelationshipType>(
    (initialContact?.relationshipType as RelationshipType) || "Friend",
  )
  const [engagementLevel, setEngagementLevel] = useState(initialContact?.engagementLevel || "Medium")
  const [notes, setNotes] = useState(initialContact?.notes || "")
  const [taskTemplates, setTaskTemplates] = useState<TaskTemplate[]>(initialContact?.taskTemplates || [])
  const [activeTemplateId, setActiveTemplateId] = useState(initialContact?.activeTemplateId || "")
  const [showCulturalTasks, setShowCulturalTasks] = useState(initialContact?.showCulturalTasks ?? true)

  const [availableRelationshipTypes, setAvailableRelationshipTypes] = useState<string[]>([])
  const [availableTemplates, setAvailableTemplates] = useState<GoalTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null)
  const [showTemplateDetails, setShowTemplateDetails] = useState(false)

  const [newTemplateTitle, setNewTemplateTitle] = useState("")
  const [newTemplateDescription, setNewTemplateDescription] = useState("")
  const [newTemplateFrequency, setNewTemplateFrequency] = useState<"Weekly" | "Bi-weekly" | "Monthly" | "Quarterly">(
    "Weekly",
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load relationship types and templates
  useEffect(() => {
    const types = getRelationshipTypes()
    setAvailableRelationshipTypes(types)

    // Set default relationship type if none is selected
    if (!relationshipType && types.length > 0) {
      setRelationshipType(types[0] as RelationshipType)
    }
  }, [relationshipType])

  // Update available templates when relationship type changes
  useEffect(() => {
    if (relationshipType) {
      const templates = getTemplatesForRelationshipType(relationshipType)
      setAvailableTemplates(templates)

      // Set default template if none is selected
      if (!activeTemplateId && templates.length > 0) {
        setActiveTemplateId(templates[0].templateId)
        setSelectedTemplate(templates[0])
      } else if (activeTemplateId) {
        const template = templates.find((t) => t.templateId === activeTemplateId)
        setSelectedTemplate(template || null)
      }
    }
  }, [relationshipType, activeTemplateId])

  const handleAddTemplate = () => {
    if (newTemplateTitle.trim()) {
      setTaskTemplates([
        ...taskTemplates,
        {
          id: uuidv4(),
          title: newTemplateTitle.trim(),
          description: newTemplateDescription.trim() || undefined,
          frequency: newTemplateFrequency,
        },
      ])
      setNewTemplateTitle("")
      setNewTemplateDescription("")
    }
  }

  const handleRemoveTemplate = (id: string) => {
    setTaskTemplates(taskTemplates.filter((template) => template.id !== id))
  }

  const handleTemplateSelect = (templateId: string) => {
    setActiveTemplateId(templateId)
    const template = availableTemplates.find((t) => t.templateId === templateId)
    setSelectedTemplate(template || null)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!relationshipType) {
      newErrors.relationshipType = "Relationship type is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const contactData: Omit<Contact, "id"> = {
      name,
      relationshipType,
      engagementLevel: engagementLevel as "Low" | "Medium" | "High",
      notes: notes || undefined,
      taskTemplates,
      activeTemplateId,
      showCulturalTasks,
      lastContact: initialContact?.lastContact || new Date().toISOString(),
    }

    onSave(contactData)
  }

  // Count cultural tasks in the selected template
  const culturalTaskCount = selectedTemplate?.tasks.filter((task) => task.cultural).length || 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
          Name*
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Contact name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="relationshipType" className="block text-sm font-medium text-gray-300 mb-1">
          Relationship Type*
        </label>
        <select
          id="relationshipType"
          value={relationshipType}
          onChange={(e) => setRelationshipType(e.target.value as RelationshipType)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {availableRelationshipTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.relationshipType && <p className="mt-1 text-sm text-red-400">{errors.relationshipType}</p>}
      </div>

      <div>
        <label htmlFor="engagementLevel" className="block text-sm font-medium text-gray-300 mb-1">
          Engagement Level
        </label>
        <select
          id="engagementLevel"
          value={engagementLevel}
          onChange={(e) => setEngagementLevel(e.target.value as "Low" | "Medium" | "High")}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Low">Low (Monthly contact)</option>
          <option value="Medium">Medium (Weekly contact)</option>
          <option value="High">High (Multiple times per week)</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Any notes about this contact"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Relationship Goal Template</label>

        <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Select a Template</h4>
            <button
              type="button"
              onClick={() => setShowTemplateDetails(!showTemplateDetails)}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              {showTemplateDetails ? "Hide Details" : "Show Details"}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-4">
            {availableTemplates.map((template) => (
              <div
                key={template.templateId}
                className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                  activeTemplateId === template.templateId
                    ? "bg-indigo-600/30 border border-indigo-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => handleTemplateSelect(template.templateId)}
              >
                <div>
                  <div className="font-medium">{template.title}</div>
                  <div className="text-sm text-gray-400">{template.description}</div>
                  {template.tasks.some((task) => task.cultural) && (
                    <div className="flex items-center mt-1 text-xs text-indigo-300">
                      <Globe className="h-3 w-3 mr-1" />
                      Includes cultural tasks
                    </div>
                  )}
                </div>
                {activeTemplateId === template.templateId && <Check className="h-5 w-5 text-indigo-400" />}
              </div>
            ))}
          </div>

          {selectedTemplate && (
            <Accordion.Root type="single" collapsible className="bg-gray-800 rounded-lg overflow-hidden">
              <Accordion.Item value="template-details">
                <Accordion.Trigger
                  className={`w-full p-4 flex items-center justify-between ${showTemplateDetails ? "border-b border-gray-700" : ""}`}
                >
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-indigo-400 mr-2" />
                    <span className="font-medium">{selectedTemplate.title} Details</span>
                  </div>
                  <div className="text-gray-400">{showTemplateDetails ? "▲" : "▼"}</div>
                </Accordion.Trigger>
                <Accordion.Content className={`p-4 ${showTemplateDetails ? "block" : "hidden"}`}>
                  <p className="text-sm text-gray-400 mb-2">{selectedTemplate.description}</p>
                  <p className="text-sm text-gray-400 mb-4">Frequency: {selectedTemplate.defaultFrequency}</p>

                  <h6 className="font-medium text-sm mb-2">Tasks that will be generated:</h6>
                  <div className="space-y-2">
                    {selectedTemplate.tasks.map((task, index) => (
                      <div key={index} className="bg-gray-700/50 p-2 rounded-lg">
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="text-xs text-gray-400">{task.description}</div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Suggested: {task.suggestedDay}</span>
                          <span>{task.estimatedMins} mins</span>
                        </div>
                        {task.cultural && (
                          <div className="flex items-center mt-1 text-xs text-indigo-300">
                            <Globe className="h-3 w-3 mr-1" />
                            Cultural task
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          )}

          {/* Cultural tasks toggle */}
          {culturalTaskCount > 0 && (
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-indigo-400 mr-2" />
                  <div>
                    <div className="font-medium text-sm">Cultural Tasks</div>
                    <div className="text-xs text-gray-400">
                      {showCulturalTasks
                        ? "Cultural and holiday-related tasks will be included"
                        : "Cultural and holiday-related tasks will be hidden"}
                    </div>
                  </div>
                </div>
                <Switch.Root
                  checked={showCulturalTasks}
                  onCheckedChange={setShowCulturalTasks}
                  className={`w-10 h-5 rounded-full relative ${showCulturalTasks ? "bg-indigo-600" : "bg-gray-600"}`}
                >
                  <Switch.Thumb
                    className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                      showCulturalTasks ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </Switch.Root>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Custom Task Templates (Optional)</label>

        <div className="space-y-3 mb-4">
          {taskTemplates.map((template) => (
            <div key={template.id} className="bg-gray-700/50 p-3 rounded-lg">
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="font-medium">{template.title}</div>
                  {template.description && <p className="text-sm text-gray-400 mt-1">{template.description}</p>}
                  <div className="text-xs text-gray-400 mt-1">Frequency: {template.frequency}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTemplate(template.id)}
                  className="p-1 text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {taskTemplates.length === 0 && (
            <p className="text-gray-400 text-sm">No custom task templates yet. Add some below.</p>
          )}
        </div>

        <div className="bg-gray-700/50 p-3 rounded-lg space-y-3">
          <div>
            <label htmlFor="templateTitle" className="block text-sm font-medium text-gray-300 mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="templateTitle"
              value={newTemplateTitle}
              onChange={(e) => setNewTemplateTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Call, Message, Plan dinner"
            />
          </div>

          <div>
            <label htmlFor="templateDescription" className="block text-sm font-medium text-gray-300 mb-1">
              Description (Optional)
            </label>
            <input
              type="text"
              id="templateDescription"
              value={newTemplateDescription}
              onChange={(e) => setNewTemplateDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Task description"
            />
          </div>

          <div>
            <label htmlFor="templateFrequency" className="block text-sm font-medium text-gray-300 mb-1">
              Frequency
            </label>
            <select
              id="templateFrequency"
              value={newTemplateFrequency}
              onChange={(e) =>
                setNewTemplateFrequency(e.target.value as "Weekly" | "Bi-weekly" | "Monthly" | "Quarterly")
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleAddTemplate}
            className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Task Template
          </button>
        </div>
      </div>

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
          {initialContact ? "Update Contact" : "Add Contact"}
        </button>
      </div>
    </form>
  )
}
