"use client"

import { useState } from "react"
import type { Contact } from "@/types/goals"
import { useGoals } from "@/contexts/goal-context"
import {
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  Globe,
} from "lucide-react"
import { getTemplateById, getTemplatesForRelationshipType } from "@/utils/relationship-templates"

interface ContactCardProps {
  contact: Contact
  onEdit: (contact: Contact) => void
  onDelete: (contactId: string) => void
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  const { tasks, goals, completeTask, applyTemplateToContact, pauseRelationshipGoal, toggleCulturalTasks } = useGoals()
  const [expanded, setExpanded] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)

  // Find the relationship goal for this contact
  const relationshipGoal = goals.find((goal) => goal.contactId === contact.id)

  // Get tasks for this contact's goal
  const contactTasks = relationshipGoal
    ? tasks.filter((task) => task.goalId === relationshipGoal.id && !task.isCompleted)
    : []

  // Get the active template
  const activeTemplate = contact.activeTemplateId ? getTemplateById(contact.activeTemplateId) : null

  // Count cultural tasks
  const culturalTaskCount = activeTemplate?.tasks.filter((task) => task.cultural).length || 0

  const getEngagementLevelColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatLastContact = (dateString?: string) => {
    if (!dateString) return "Never"

    const lastContact = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - lastContact.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  const handlePauseToggle = () => {
    if (relationshipGoal) {
      pauseRelationshipGoal(relationshipGoal.id, !relationshipGoal.isPaused)
    }
  }

  const handleChangeTemplate = (templateId: string) => {
    applyTemplateToContact(contact.id, templateId)
    setShowTemplateSelector(false)
  }

  const handleToggleCulturalTasks = () => {
    if (contact.id) {
      toggleCulturalTasks(contact.id, !contact.showCulturalTasks)
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-colors">
      <div className="p-5">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-white font-medium">{contact.name.charAt(0)}</span>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{contact.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(contact)}
                  className="p-1 text-gray-400 hover:text-indigo-400 rounded-full hover:bg-gray-700"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(contact.id)}
                  className="p-1 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
                >
                  {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-400 mt-1">
              <span>{contact.relationshipType}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <span
                  className={`inline-block h-2 w-2 rounded-full mr-1 ${getEngagementLevelColor(contact.engagementLevel)}`}
                ></span>
                {contact.engagementLevel} engagement
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-400 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Last contact: {formatLastContact(contact.lastContact)}</span>
            </div>

            {contact.notes && <p className="mt-3 text-sm text-gray-300">{contact.notes}</p>}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-700 p-5">
          {/* Active Template Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Active Goal Template</h4>
              <div className="flex space-x-2">
                {relationshipGoal && (
                  <button
                    onClick={handlePauseToggle}
                    className={`flex items-center text-sm ${
                      relationshipGoal.isPaused
                        ? "text-indigo-400 hover:text-indigo-300"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    {relationshipGoal.isPaused ? (
                      <>
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Resume
                      </>
                    ) : (
                      <>
                        <PauseCircle className="h-4 w-4 mr-1" />
                        Pause
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                  className="flex items-center text-sm text-indigo-400 hover:text-indigo-300"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Change
                </button>
              </div>
            </div>

            {activeTemplate ? (
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <div className="font-medium">{activeTemplate.title}</div>
                <p className="text-sm text-gray-400 mt-1">{activeTemplate.description}</p>
                <div className="text-xs text-gray-400 mt-1">Frequency: {activeTemplate.defaultFrequency}</div>

                {/* Cultural tasks toggle */}
                {culturalTaskCount > 0 && (
                  <div className="flex items-center justify-between mt-2 p-2 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <Globe className="h-3 w-3 text-indigo-400 mr-1" />
                      <span className="text-xs">Cultural tasks</span>
                    </div>
                    <button
                      onClick={handleToggleCulturalTasks}
                      className={`text-xs ${contact.showCulturalTasks ? "text-indigo-400" : "text-gray-400"}`}
                    >
                      {contact.showCulturalTasks ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                )}

                {relationshipGoal?.isPaused && (
                  <div className="mt-2 text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded inline-flex items-center">
                    <PauseCircle className="h-3 w-3 mr-1" />
                    Paused
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                <p className="text-gray-400">No active template selected</p>
                <button
                  onClick={() => setShowTemplateSelector(true)}
                  className="mt-2 text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Select a template
                </button>
              </div>
            )}

            {/* Template Selector */}
            {showTemplateSelector && (
              <div className="mt-3 bg-gray-700/30 p-3 rounded-lg">
                <h5 className="text-sm font-medium mb-2">Select a Template</h5>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {contact.relationshipType &&
                    getTemplatesForRelationshipType(contact.relationshipType).map((template) => (
                      <div
                        key={template.templateId}
                        className={`p-2 rounded-lg cursor-pointer ${
                          contact.activeTemplateId === template.templateId
                            ? "bg-indigo-600/30 border border-indigo-500"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={() => handleChangeTemplate(template.templateId)}
                      >
                        <div className="font-medium text-sm">{template.title}</div>
                        <div className="text-xs text-gray-400">{template.description}</div>
                        {template.tasks.some((task) => task.cultural) && (
                          <div className="flex items-center mt-1 text-xs text-indigo-300">
                            <Globe className="h-3 w-3 mr-1" />
                            Includes cultural tasks
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Upcoming Tasks</h4>
            <div className="space-y-2">
              {contactTasks.length > 0 ? (
                contactTasks.map((task) => (
                  <div key={task.id} className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                    <button onClick={() => completeTask(task.id)} className="text-gray-400 mr-3">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-400"></div>
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className={`${task.isCompleted ? "text-gray-400 line-through" : "text-white"}`}>
                          {task.title}
                        </span>
                        {task.fromTemplate && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/60 text-indigo-300">
                            Template
                          </span>
                        )}
                        {task.cultural && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/60 text-purple-300">
                            Cultural
                          </span>
                        )}
                      </div>
                      {task.description && (
                        <p className={`text-xs mt-1 ${task.isCompleted ? "text-gray-500" : "text-gray-400"}`}>
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        {task.dueDate && (
                          <div className="flex items-center mr-3">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        )}
                        {task.estimatedMins && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.estimatedMins} mins
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : relationshipGoal?.isPaused ? (
                <p className="text-yellow-300 text-center py-2 bg-yellow-500/10 rounded-lg">
                  Tasks are paused. Resume the template to generate new tasks.
                </p>
              ) : (
                <p className="text-gray-400 text-center py-2">No upcoming tasks</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Custom Task Templates</h4>
            <div className="space-y-2">
              {contact.taskTemplates && contact.taskTemplates.length > 0 ? (
                contact.taskTemplates.map((template) => (
                  <div key={template.id} className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="font-medium">{template.title}</div>
                    {template.description && <p className="text-sm text-gray-400 mt-1">{template.description}</p>}
                    <div className="text-xs text-gray-400 mt-1">Frequency: {template.frequency}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-2">No custom task templates</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
