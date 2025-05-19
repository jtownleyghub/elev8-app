"use client"

import type React from "react"

import { useState } from "react"
import { HelpCircle, X } from "lucide-react"

interface HelpTooltipProps {
  title: string
  content: string | React.ReactNode
  position?: "top" | "right" | "bottom" | "left"
}

export function HelpTooltip({ title, content, position = "top" }: HelpTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 mb-2"
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2"
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2 mt-2"
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2"
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2"
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-indigo-400 transition-colors"
        aria-label="Help"
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 ${getPositionClasses()}`}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{title}</h4>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="text-sm text-gray-300">{content}</div>
        </div>
      )}
    </div>
  )
}
