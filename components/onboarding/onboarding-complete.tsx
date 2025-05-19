"use client"

import { ArrowRight, CheckCircle, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"

interface OnboardingCompleteProps {
  onComplete: () => void
}

export function OnboardingComplete({ onComplete }: OnboardingCompleteProps) {
  const router = useRouter()

  const handleGoToDashboard = () => {
    // Set authentication
    localStorage.setItem("isLoggedIn", "true")

    // Set first-time user flag
    localStorage.setItem("isFirstTimeUser", "true")

    // Call the onComplete prop
    onComplete()

    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">You're All Set!</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          Your Elev8 account has been created successfully. You're ready to start your personal growth journey.
        </p>
      </div>

      <div className="bg-indigo-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Lightbulb className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-indigo-300 font-medium mb-1">What to expect next:</p>
            <ul className="text-indigo-200 text-sm space-y-1">
              <li>• We've created sample content to help you get started</li>
              <li>• A quick tour will guide you through the main features</li>
              <li>• You can easily replace sample content with your own</li>
              <li>• Help is always available in the dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Set Goals</h3>
          <p className="text-gray-300 text-sm">Create and track your personal and professional goals.</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Build Habits</h3>
          <p className="text-gray-300 text-sm">Develop positive habits with our tracking tools.</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-300 text-sm">Monitor your progress and celebrate your achievements.</p>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleGoToDashboard}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center inline-flex items-center justify-center transition-colors"
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
