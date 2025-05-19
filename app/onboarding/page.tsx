"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { OnboardingWelcome } from "@/components/onboarding/onboarding-welcome"
import { OnboardingGoals } from "@/components/onboarding/onboarding-goals"
import { OnboardingLifeAreas } from "@/components/onboarding/onboarding-life-areas"
import { OnboardingAccount } from "@/components/onboarding/onboarding-account"
import { OnboardingComplete } from "@/components/onboarding/onboarding-complete"

const steps = [
  { id: "welcome", label: "Welcome" },
  { id: "goals", label: "Goals" },
  { id: "life-areas", label: "Life Areas" },
  { id: "account", label: "Account" },
  { id: "complete", label: "Complete" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleComplete = () => {
    // In a real app, you would save the user's data here
    router.push("/dashboard")
  }

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "welcome":
        return <OnboardingWelcome onNext={handleNext} />
      case "goals":
        return <OnboardingGoals onNext={handleNext} />
      case "life-areas":
        return <OnboardingLifeAreas onNext={handleNext} />
      case "account":
        return <OnboardingAccount onNext={handleNext} />
      case "complete":
        return <OnboardingComplete onComplete={handleComplete} />
      default:
        return <OnboardingWelcome onNext={handleNext} />
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl">
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
                  {index < currentStep ? <CheckCircle className="h-5 w-5" /> : <span>{index + 1}</span>}
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
