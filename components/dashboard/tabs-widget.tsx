"use client"

import { useState } from "react"
import { Calendar, CheckCircle, Clock } from "lucide-react"
import { TodaysFocus } from "./todays-focus"
import { DailyPlanSummary } from "./daily-plan-summary"
import { CalendarWidget } from "./calendar-widget"

export function TabsWidget() {
  const [activeTab, setActiveTab] = useState("focus")

  const tabs = [
    { id: "focus", label: "Today's Focus", icon: CheckCircle },
    { id: "plan", label: "Today's Plan", icon: Clock },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ]

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              activeTab === tab.id ? "text-white border-b-2 border-indigo-500" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === "focus" && <TodaysFocus />}
        {activeTab === "plan" && <DailyPlanSummary />}
        {activeTab === "calendar" && <CalendarWidget />}
      </div>
    </div>
  )
}
