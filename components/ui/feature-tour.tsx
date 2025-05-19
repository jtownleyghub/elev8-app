"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, ArrowLeft } from "lucide-react"

interface TourStep {
  target: string
  title: string
  content: string
  position: "top" | "right" | "bottom" | "left"
}

interface FeatureTourProps {
  steps: TourStep[]
  onComplete: () => void
  isOpen: boolean
}

export function FeatureTour({ steps, onComplete, isOpen }: FeatureTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!isOpen) return

    const positionTooltip = () => {
      const step = steps[currentStep]
      const targetElement = document.querySelector(step.target)

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect()
        const tooltipWidth = 300
        const tooltipHeight = 150
        const spacing = 12

        let top = 0
        let left = 0

        switch (step.position) {
          case "top":
            top = rect.top - tooltipHeight - spacing
            left = rect.left + rect.width / 2 - tooltipWidth / 2
            break
          case "right":
            top = rect.top + rect.height / 2 - tooltipHeight / 2
            left = rect.right + spacing
            break
          case "bottom":
            top = rect.bottom + spacing
            left = rect.left + rect.width / 2 - tooltipWidth / 2
            break
          case "left":
            top = rect.top + rect.height / 2 - tooltipHeight / 2
            left = rect.left - tooltipWidth - spacing
            break
        }

        // Adjust if tooltip goes off screen
        if (left < 0) left = spacing
        if (top < 0) top = spacing
        if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - spacing
        if (top + tooltipHeight > window.innerHeight) top = window.innerHeight - tooltipHeight - spacing

        setPosition({ top, left })

        // Add highlight to target element
        targetElement.classList.add("ring-2", "ring-indigo-500", "ring-offset-2", "ring-offset-gray-900")
      }
    }

    positionTooltip()

    // Clean up highlight when step changes
    return () => {
      const step = steps[currentStep]
      const targetElement = document.querySelector(step.target)
      if (targetElement) {
        targetElement.classList.remove("ring-2", "ring-indigo-500", "ring-offset-2", "ring-offset-gray-900")
      }
    }
  }, [currentStep, isOpen, steps])

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div
      className="fixed z-50 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 w-[300px]"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{steps[currentStep].title}</h3>
        <button onClick={handleSkip} className="text-gray-400 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-gray-300 mb-4">{steps[currentStep].content}</p>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {currentStep + 1} of {steps.length}
        </div>
        <div className="flex space-x-2">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <button onClick={handleNext} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
