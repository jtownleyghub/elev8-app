"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface AspirationalWelcomeProps {
  onNext: () => void
}

export function AspirationalWelcome({ onNext }: AspirationalWelcomeProps) {
  return (
    <div className="space-y-8 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="relative h-32 w-32">
            <Image src="/placeholder-owuda.png" alt="Elev8 Logo" fill className="object-contain" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Let's design a life that's truly yours</h1>
        <p className="text-gray-300 text-lg">
          Elev8 helps you turn your aspirations into achievable goals with structured plans and daily guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors">
          <div className="text-indigo-400 text-2xl font-bold mb-2">Dream</div>
          <p className="text-gray-300">Identify your aspirations and what truly matters to you</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors">
          <div className="text-indigo-400 text-2xl font-bold mb-2">Plan</div>
          <p className="text-gray-300">Transform aspirations into structured, achievable goals</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors">
          <div className="text-indigo-400 text-2xl font-bold mb-2">Achieve</div>
          <p className="text-gray-300">Stay on track with daily guidance and progress tracking</p>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium text-lg inline-flex items-center justify-center transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
