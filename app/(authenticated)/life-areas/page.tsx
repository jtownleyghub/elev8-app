"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useGoals } from "@/contexts/goal-context"
import type { LifeArea } from "@/types/goals"
import { ChevronRight, Briefcase, Heart, Dumbbell, Book, DollarSign, Smile, Home } from "lucide-react"
import Link from "next/link"

export default function LifeAreasPage() {
  const { goals } = useGoals()
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Life Areas</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full ${color} flex items-center justify-center mr-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-medium">{lifeArea}</h2>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Goals</span>
                  <span>{stats.count}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span>{stats.progress}%</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${color}`} style={{ width: `${stats.progress}%` }}></div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
