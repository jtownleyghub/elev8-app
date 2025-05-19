"use client"

import { useState, useEffect } from "react"
import { Trophy, Star, Award, ChevronUp, ChevronDown } from "lucide-react"
import { useGoals } from "@/contexts/goal-context"

export function LifeProgressTracker() {
  const [expanded, setExpanded] = useState(true)
  const { goals } = useGoals()
  const [completedGoals, setCompletedGoals] = useState(0)
  const [totalGoals, setTotalGoals] = useState(0)
  const [level, setLevel] = useState(1)
  const [nextLevelGoals, setNextLevelGoals] = useState(0)

  useEffect(() => {
    // Count completed and total goals
    const completed = goals.filter((goal) => goal.isCompleted).length
    setCompletedGoals(completed)
    setTotalGoals(goals.length)

    // Calculate level based on completed goals
    // Each level requires 5 more goals than the previous level
    let currentLevel = 1
    let goalsForNextLevel = 5
    let remainingGoals = completed

    while (remainingGoals >= goalsForNextLevel) {
      remainingGoals -= goalsForNextLevel
      currentLevel++
      goalsForNextLevel += 5
    }

    setLevel(currentLevel)
    setNextLevelGoals(goalsForNextLevel - remainingGoals)
  }, [goals])

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Your Progress</h3>
        <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-white">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {expanded && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Current Level</p>
                <p className="text-xl font-bold">Level {level}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">Next Level</p>
              <p className="text-lg">{nextLevelGoals} goals away</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  Completed Goals
                </span>
                <span className="text-sm font-medium">
                  {completedGoals}/{totalGoals}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: totalGoals > 0 ? `${(completedGoals / totalGoals) * 100}%` : "0%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm flex items-center">
                  <Award className="h-4 w-4 text-indigo-400 mr-2" />
                  Level Progress
                </span>
                <span className="text-sm font-medium">
                  {5 - (nextLevelGoals % 5)}/{5}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${((5 - (nextLevelGoals % 5)) / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-sm font-medium mb-3">Recent Achievements</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-900/60 flex items-center justify-center mr-3">
                  <Award className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Consistency Champion</p>
                  <p className="text-xs text-gray-400">Completed tasks 7 days in a row</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-purple-900/60 flex items-center justify-center mr-3">
                  <Star className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Goal Getter</p>
                  <p className="text-xs text-gray-400">Completed {completedGoals} goals</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
