"use client"

import type React from "react"
import { Plus } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon: React.ReactNode
  actionLabel: string
  onAction: () => void
}

export function EmptyState({ title, description, icon, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-700/50 mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
      <button
        onClick={onAction}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        {actionLabel}
      </button>
    </div>
  )
}
