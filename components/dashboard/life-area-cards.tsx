"use client"

import type React from "react"

import { useState } from "react"
import { Book, Briefcase, Heart, Dumbbell, DollarSign, Smile, ChevronUp, ChevronDown, Plus } from "lucide-react"
import Link from "next/link"
import { SampleBadge } from "@/components/ui/sample-badge"

interface LifeArea {
  id: string
  name: string
  icon: React.ElementType
  color: string
  progress: number
  isSample?: boolean
}

export function LifeAreaCards() {
  const [expanded, setExpanded] = useState(true)
  const [lifeAreas, setLifeAreas] = useState<LifeArea[]>([
    { id: "1", name: "Career", icon: Briefcase, color: "bg-blue-500", progress: 75, isSample: true },
    { id: "2", name: "Health", icon: Dumbbell, color: "bg-green-500", progress: 60, isSample: true },
    { id: "3", name: "Relationships", icon: Heart, color: "bg-pink-500", progress: 85, isSample: true },
    { id: "4", name: "Personal Growth", icon: Book, color: "bg-purple-500", progress: 70, isSample: true },
    { id: "5", name: "Finance", icon: DollarSign, color: "bg-yellow-500", progress: 50, isSample: true },
    { id: "6", name: "Recreation", icon: Smile, color: "bg-red-500", progress: 65, isSample: true },
  ])

  const clearSampleAreas = () => {
    setLifeAreas(lifeAreas.filter((area) => !area.isSample))
  }

  const hasSampleAreas = lifeAreas.some((area) => area.isSample)

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Life Areas</h3>
        <div className="flex items-center space-x-2">
          <Link href="/life-areas" className="text-sm text-indigo-400 hover:text-indigo-300">
            View All
          </Link>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-white">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {hasSampleAreas && expanded && (
        <div className="flex justify-between items-center bg-yellow-500/10 rounded-lg p-2 text-sm mb-4">
          <span className="text-yellow-300">Sample life areas are provided to help you get started</span>
          <button onClick={clearSampleAreas} className="text-yellow-300 hover:text-yellow-200 underline text-xs">
            Clear all samples
          </button>
        </div>
      )}

      {expanded && (
        <div className="grid grid-cols-2 gap-4">
          {lifeAreas.map((area) => (
            <div
              key={area.id}
              className="bg-gray-700/50 rounded-lg p-4 hover:border-indigo-500/50 border border-transparent transition-colors"
            >
              <div className="flex items-center mb-3">
                <div className={`h-8 w-8 rounded-full ${area.color} flex items-center justify-center mr-3`}>
                  <area.icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex items-center">
                  <span className="font-medium">{area.name}</span>
                  {area.isSample && <SampleBadge className="ml-2" />}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span>{area.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${area.color}`} style={{ width: `${area.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/life-areas/new"
            className="bg-gray-700/30 rounded-lg p-4 border border-dashed border-gray-600 hover:border-indigo-500/50 transition-colors flex flex-col items-center justify-center text-gray-400 hover:text-indigo-400"
          >
            <Plus className="h-8 w-8 mb-2" />
            <span>Add Life Area</span>
          </Link>
        </div>
      )}
    </div>
  )
}
