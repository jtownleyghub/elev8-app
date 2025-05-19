"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Book, Briefcase, Heart, Dumbbell, DollarSign, Smile, Home, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useGoals } from "@/contexts/goal-context"
import type { LifeArea } from "@/types/goals"

export function LifeAreaCards() {
  const { goals } = useGoals()
  const [expanded, setExpanded] = useState(true)
  const [lifeAreaStats, setLifeAreaStats] = useState<Record<LifeArea, { count: number; progress: number }>>({
    Career: { count: 0, progress: 0 },
    Health: { count: 0, progress: 0 },
    Relationships: { count: 0, progress: 0 },
    "Personal Growth": { count: 0, progress: 0 },
    Finance: { count: 0, progress: 0 },
    Recreation: { count: 0, progress: 0 },
    Home: { count: 0, progress: 0 },
  })

  useEffect(() => {
    // Calculate stats for each life area
    const stats: Record<LifeArea, { count: number; progress: number }> = {
      Career: { count: 0, progress: 0 },
      Health: { count: 0, progress: 0 },
      Relationships: { count: 0, progress: 0 },
      "Personal Growth": { count: 0, progress: 0 },
      Finance: { count: 0, progress: 0 },
      Recreation: { count: 0, progress: 0 },
      Home: { count: 0, progress: 0 },
    }

    goals.forEach((goal) => {
      stats[goal.lifeArea].count += 1
      stats[goal.lifeArea].progress += goal.progress
    })

    // Calculate average progress
    Object.keys(stats).forEach((area) => {
      const lifeArea = area as LifeArea
      if (stats[lifeArea].count > 0) {
        stats[lifeArea].progress = Math.round(stats[lifeArea].progress / stats[lifeArea].count)
      }
    })

    setLifeAreaStats(stats)
  }, [goals])

  const lifeAreaIcons: Record<LifeArea, React.ElementType> = {
    Career: Briefcase,
    Health: Dumbbell,
    Relationships: Heart,
    "Personal Growth": Book,
    Finance: DollarSign,
    Recreation: Smile,
    Home: Home,
  }

  const getLifeAreaColor = (area: LifeArea) => {
    switch (area) {
      case "Career":
        return "bg-blue-500"
      case "Health":
        return "bg-green-500"
      case "Relationships":
        return "bg-pink-500"
      case "Personal Growth":
        return "bg-purple-500"
      case "Finance":
        return "bg-yellow-500"
      case "Recreation":
        return "bg-red-500"
      case "Home":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLifeAreaSlug = (area: LifeArea) => {
    return area.toLowerCase().replace(/\s+/g, "-")
  }

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

      {expanded && (
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(lifeAreaStats).map((area) => {
            const lifeArea = area as LifeArea
            const stats = lifeAreaStats[lifeArea]
            const Icon = lifeAreaIcons[lifeArea]
            const color = getLifeAreaColor(lifeArea)
            const slug = getLifeAreaSlug(lifeArea)

            return (
              <Link
                key={lifeArea}
                href={`/life-areas/${slug}`}
                className="bg-gray-700/50 rounded-lg p-4 hover:border-indigo-500/50 border border-transparent transition-colors"
              >
                <div className="flex items-center mb-3">
                  <div className={`h-8 w-8 rounded-full ${color} flex items-center justify-center mr-3`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">{lifeArea}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span>{stats.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${stats.progress}%` }}></div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
