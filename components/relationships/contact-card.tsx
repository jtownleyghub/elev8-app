"use client"

import { useState } from "react"
import type { Contact } from "@/types/goals"
import { useGoals } from "@/contexts/goal-context"
import { Edit2, Trash2, ChevronDown, ChevronUp, Clock, Calendar } from "lucide-react"

interface ContactCardProps {
  contact: Contact
  onEdit: (contact: Contact) => void
  onDelete: (contactId: string) => void
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  const { tasks, completeTask } = useGoals()
  const [expanded, setExpanded] = useState(false)

  // Find the relationship goal for this contact
  const { goals } = useGoals()
  const relationshipGoal = goals.find((goal) => goal.contactId === contact.id)

  // Get tasks for this contact's goal
  const contactTasks = relationshipGoal
    ? tasks.filter((task) => task.goalId === relationshipGoal.id && !task.isCompleted)
    : []

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
              <span>{contact.relationship}</span>
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
                      <div className="text-white">{task.title}</div>
                      {task.description && <p className="text-xs text-gray-400 mt-1">{task.description}</p>}
                      {task.dueDate && (
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-2">No upcoming tasks</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Task Templates</h4>
            <div className="space-y-2">
              {contact.taskTemplates.length > 0 ? (
                contact.taskTemplates.map((template) => (
                  <div key={template.id} className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="font-medium">{template.title}</div>
                    {template.description && <p className="text-sm text-gray-400 mt-1">{template.description}</p>}
                    <div className="text-xs text-gray-400 mt-1">Frequency: {template.frequency}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-2">No task templates</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
