"use client"

import { useState } from "react"
import { Bell, Settings, Search } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  const [notifications, setNotifications] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400">Welcome back, Alex</p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Search className="h-5 w-5 text-gray-400" />
        </button>

        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-gray-400" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-indigo-600 rounded-full text-xs flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
              <div className="p-3 border-b border-gray-700">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-gray-700 hover:bg-gray-700/50">
                  <p className="text-sm font-medium">New goal achieved!</p>
                  <p className="text-xs text-gray-400">You completed "Read 10 pages daily" for 7 days</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 border-b border-gray-700 hover:bg-gray-700/50">
                  <p className="text-sm font-medium">Task reminder</p>
                  <p className="text-xs text-gray-400">Complete project proposal by today</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
                <div className="p-3 hover:bg-gray-700/50">
                  <p className="text-sm font-medium">Weekly review</p>
                  <p className="text-xs text-gray-400">Your weekly progress report is ready</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
              <div className="p-2 border-t border-gray-700">
                <button className="w-full text-center text-sm text-indigo-400 hover:text-indigo-300 py-1">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <Link href="/settings" className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <Settings className="h-5 w-5 text-gray-400" />
        </Link>

        <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center">
          <span className="font-medium text-sm">AJ</span>
        </div>
      </div>
    </div>
  )
}
