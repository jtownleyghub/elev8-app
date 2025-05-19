"use client"

import { ArrowRight } from "lucide-react"

interface OnboardingWelcomeProps {
  onNext: () => void
}

export function OnboardingWelcome({ onNext }: OnboardingWelcomeProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Elev8</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          Your personal growth journey starts here. Let's set up your account to get the most out of Elev8.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Track Your Goals</h3>
          <p className="text-gray-300">Set meaningful goals and track your progress with visual dashboards.</p>
        </div>
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Build Habits</h3>
          <p className="text-gray-300">Create and maintain positive habits with streak tracking and reminders.</p>
        </div>
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Balance Your Life</h3>
          <p className="text-gray-300">Maintain balance across all areas of your life with our life wheel.</p>
        </div>
        <div className="bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">See Your Progress</h3>
          <p className="text-gray-300">Visualize your progress over time with beautiful charts and insights.</p>
        </div>
      </div>

      <div className="bg-indigo-900/30 p-4 rounded-lg mt-6">
        <p className="text-indigo-300 text-sm">
          <strong>Note:</strong> We'll create some sample content to help you get started. You can easily replace it
          with your own goals and tasks later.
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center inline-flex items-center justify-center transition-colors"
        >
          Let's Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
