"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AspirationalWelcome } from "@/components/onboarding/aspirational-welcome"
import { AspirationsSelection } from "@/components/onboarding/aspirations-selection"
import { SuggestedGoals } from "@/components/onboarding/suggested-goals"
import { PlanningStyleSelection } from "@/components/onboarding/planning-style"
import { LifeAreaFocus } from "@/components/onboarding/life-area-focus"
import { SignupLogin } from "@/components/onboarding/signup-login"
import type { PlanningStyle, LifeArea } from "@/types/goals"

const steps = [
  { id: "welcome", label: "Welcome" },
  { id: "aspirations", label: "Aspirations" },
  { id: "suggested-goals", label: "Goals" },
  { id: "planning-style", label: "Planning" },
  { id: "life-areas", label: "Life Areas" },
  { id: "signup", label: "Account" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([])
  const [planningStyle, setPlanningStyle] = useState<PlanningStyle>("Balanced")
  const [focusedLifeAreas, setFocusedLifeAreas] = useState<LifeArea[]>([])
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleAspirationSelection = (templateIds: string[]) => {
    setSelectedTemplateIds(templateIds)
    handleNext()
  }

  const handlePlanningStyleSelection = (style: PlanningStyle) => {
    setPlanningStyle(style)
    handleNext()
  }

  const handleLifeAreaSelection = (areas: LifeArea[]) => {
    setFocusedLifeAreas(areas)
    handleNext()
  }

  const handleComplete = () => {
    // In a real app, you would save the user's preferences here
    const userPreferences = {
      planningStyle,
      focusedLifeAreas,
      selectedAspirations: selectedTemplateIds,
    }

    // Save to localStorage for now
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences))

    // Redirect to dashboard
    router.push("/dashboard")
  }

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "welcome":
        return <AspirationalWelcome onNext={handleNext} />
      case "aspirations":
        return <AspirationsSelection onNext={handleAspirationSelection} />
      case "suggested-goals":
        return <SuggestedGoals selectedTemplateIds={selectedTemplateIds} onNext={handleNext} />
      case "planning-style":
        return <PlanningStyleSelection onNext={handlePlanningStyleSelection} />
      case "life-areas":
        return <LifeAreaFocus onNext={handleLifeAreaSelection} />
      case "signup":
        return <SignupLogin onComplete={handleComplete} />
      default:
        return <AspirationalWelcome onNext={handleNext} />
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    index < currentStep
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : index === currentStep
                        ? "border-indigo-500 text-indigo-500"
                        : "border-gray-600 text-gray-600"
                  }`}
                >
                  {index < currentStep ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs ${index <= currentStep ? "text-indigo-400" : "text-gray-500"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1 w-full bg-gray-700">
            <div
              className="h-1 bg-indigo-500 transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">{renderStep()}</div>
      </div>
    </div>
  )
}
