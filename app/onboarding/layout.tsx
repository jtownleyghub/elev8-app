import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GoalProvider } from "@/contexts/goal-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Onboarding - Elev8",
  description: "Set up your Elev8 account and start your personal growth journey",
}

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <GoalProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-indigo-500"
              >
                <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
              </svg>
              <span className="font-bold text-xl text-white">Elev8</span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </GoalProvider>
  )
}
