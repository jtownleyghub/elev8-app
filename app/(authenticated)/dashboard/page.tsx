"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TimeWeatherWidget } from "@/components/dashboard/time-weather-widget"
import { TabsWidget } from "@/components/dashboard/tabs-widget"
import { LifeProgressTracker } from "@/components/dashboard/life-progress-tracker"
import { LifeAreaCards } from "@/components/dashboard/life-area-cards"
import { WeeklyGoalsList } from "@/components/dashboard/weekly-goals-list"
import { WelcomeDashboard } from "@/components/onboarding/welcome-dashboard"
import { FeatureTour } from "@/components/ui/feature-tour"
import { Info, HelpCircle } from "lucide-react"
import { useGoals } from "@/contexts/goal-context"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcomeDashboard, setShowWelcomeDashboard] = useState(false)
  const [showFeatureTour, setShowFeatureTour] = useState(false)
  const { generateTasksFromTemplates } = useGoals()

  useEffect(() => {
    // Check if first time user
    const isFirstTimeUser = localStorage.getItem("isFirstTimeUser") === "true"

    // Generate tasks from templates for relationship goals
    generateTasksFromTemplates()

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)

      // Show welcome dashboard for first time users
      if (isFirstTimeUser) {
        setShowWelcomeDashboard(true)
        // Remove first time user flag
        localStorage.setItem("isFirstTimeUser", "false")
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [generateTasksFromTemplates])

  const handleDismissWelcome = () => {
    setShowWelcomeDashboard(false)
    // Start feature tour after welcome dashboard is dismissed
    setShowFeatureTour(true)
  }

  const handleCompleteTour = () => {
    setShowFeatureTour(false)
  }

  // Define feature tour steps
  const tourSteps = [
    {
      target: "[data-tour='dashboard-header']",
      title: "Dashboard Overview",
      content: "This is your dashboard where you can see all your goals, tasks, and progress at a glance.",
      position: "bottom" as const,
    },
    {
      target: "[data-tour='today-focus']",
      title: "Today's Focus",
      content: "Manage your daily tasks here. Click the checkbox to mark tasks as complete.",
      position: "right" as const,
    },
    {
      target: "[data-tour='life-areas']",
      title: "Life Areas",
      content: "Track your progress across different areas of your life to maintain balance.",
      position: "left" as const,
    },
    {
      target: "[data-tour='weekly-goals']",
      title: "Weekly Goals",
      content: "Set and track your weekly goals here. Sample goals are provided to help you get started.",
      position: "top" as const,
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showWelcomeDashboard && <WelcomeDashboard onDismiss={handleDismissWelcome} />}
      {showFeatureTour && <FeatureTour steps={tourSteps} onComplete={handleCompleteTour} isOpen={showFeatureTour} />}

      <div data-tour="dashboard-header">
        <DashboardHeader />
      </div>

      <div className="bg-indigo-900/30 p-4 rounded-xl mb-6 flex items-start">
        <Info className="h-5 w-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-indigo-300 font-medium">Welcome to your dashboard!</p>
          <p className="text-indigo-200 text-sm mt-1">
            We've created some sample content to help you get started. Items marked with a "Sample" tag can be deleted
            or replaced with your own content.
          </p>
          <button
            onClick={() => setShowFeatureTour(true)}
            className="text-indigo-300 text-sm mt-2 flex items-center hover:text-indigo-200"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            Take a tour of the dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TimeWeatherWidget />
          <div data-tour="today-focus">
            <TabsWidget />
          </div>
          <div data-tour="weekly-goals">
            <WeeklyGoalsList />
          </div>
        </div>

        <div className="space-y-6">
          <LifeProgressTracker />
          <div data-tour="life-areas">
            <LifeAreaCards />
          </div>
        </div>
      </div>
    </div>
  )
}
