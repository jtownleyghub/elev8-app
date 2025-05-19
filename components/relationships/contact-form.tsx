"use client"

import type React from "react"

import { useState } from "react"
import type { Contact, TaskTemplate } from "@/types/goals"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface ContactFormProps {
  initialContact?: Contact
  onSave: (contact: Omit<Contact, "id">) => void
  onCancel: () => void
}

export function ContactForm({ initialContact, onSave, onCancel }: ContactFormProps) {
  const [name, setName] = useState(initialContact?.name || "")
  const [relationship, setRelationship] = useState(initialContact?.relationship || "")
  const [engagementLevel, setEngagementLevel] = useState(initialContact?.engagementLevel || "Medium")
  const [notes, setNotes] = useState(initialContact?.notes || "")
  const [taskTemplates, setTaskTemplates] = useState<TaskTemplate[]>(initialContact?.taskTemplates || [])

  const [newTemplateTitle, setNewTemplateTitle] = useState("")
  const [newTemplateDescription, setNewTemplateDescription] = useState("")
  const [newTemplateFrequency, setNewTemplateFrequency] = useState<"Weekly" | "Bi-weekly" | "Monthly" | "Quarterly">(
    "Weekly",
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!relationship.trim()) {
      newErrors.relationship = "Relationship type is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const contactData: Omit<Contact, "id"> = {
      name,
      relationship,
      engagementLevel: engagementLevel as "Low" | "Medium" | "High",
      notes: notes || undefined,
      taskTemplates,
      lastContact: initialContact?.lastContact || new Date().toISOString(),
    }

    onSave(contactData)
  }

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
        <label htmlFor="relationship" className="block text-sm font-medium text-gray-300 mb-1">
          Relationship*
        </label>
        <input
          type="text"
          id="relationship"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., Friend, Partner, Family"
        />
        {errors.relationship && <p className="mt-1 text-sm text-red-400">{errors.relationship}</p>}
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
        <label className="block text-sm font-medium text-gray-300 mb-3">Task Templates</label>

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
            <p className="text-gray-400 text-sm">No task templates yet. Add some below.</p>
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
            Add Task Template
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
