"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ArrowRight, HelpCircle, Lightbulb } from "lucide-react"

interface WelcomeDashboardProps {
  onDismiss: () => void
}

export function WelcomeDashboard({ onDismiss }: WelcomeDashboardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to Elev8",
      content: (
        <div className="space-y-4">
          <p>
            We've created some sample content to help you get started. You can easily replace it with your own goals,
            tasks, and life areas.
          </p>
          <p>
            This welcome guide will show you how to navigate the app and get the most out of Elev8. You can access it
            anytime from the Help menu.
          </p>
        </div>
      ),
    },
    {
      title: "Your Dashboard",
      content: (
        <div className="space-y-4">
          <p>
            Your dashboard gives you a complete overview of your goals, tasks, and progress across different life areas.
          </p>
          <p>
            <strong>Sample content is marked with a "Sample" tag</strong> - you can easily delete these items and
            replace them with your own.
          </p>
        </div>
      ),
    },
    {
      title: "Setting Goals",
      content: (
        <div className="space-y-4">
          <p>
            Goals are the foundation of your personal growth journey. Create goals that are specific, measurable, and
            time-bound.
          </p>
          <p>
            <strong>Tip:</strong> Connect your goals to specific life areas to maintain balance across all aspects of
            your life.
          </p>
        </div>
      ),
    },
    {
      title: "Daily Tasks",
      content: (
        <div className="space-y-4">
          <p>Break down your goals into manageable daily tasks to make consistent progress.</p>
          <p>
            <strong>Tip:</strong> Focus on 3-5 important tasks each day rather than overwhelming yourself with too many
            items.
          </p>
        </div>
      ),
    },
    {
      title: "Tracking Progress",
      content: (
        <div className="space-y-4">
          <p>
            Regularly check your progress in each life area to ensure you're maintaining balance and moving toward your
            goals.
          </p>
          <p>
            <strong>Tip:</strong> Schedule a weekly review to reflect on your progress and plan for the week ahead.
          </p>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onDismiss()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700 shadow-xl">
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
            {steps[currentStep].title}
          </h2>
          <button onClick={onDismiss} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">{steps[currentStep].content}</div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep ? "bg-indigo-500" : "bg-gray-600"
                  } transition-colors`}
                ></div>
              ))}
            </div>

            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center"
              >
                {currentStep < steps.length - 1 ? "Next" : "Get Started"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-indigo-900/30 p-4 rounded-b-xl flex items-center">
          <HelpCircle className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" />
          <p className="text-sm text-indigo-300">
            Need more help? Check out our{" "}
            <Link href="/help" className="underline hover:text-indigo-200">
              help center
            </Link>{" "}
            or{" "}
            <Link href="/tutorials" className="underline hover:text-indigo-200">
              video tutorials
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
