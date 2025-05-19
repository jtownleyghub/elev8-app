"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudDrizzle } from "lucide-react"

export function TimeWeatherWidget() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [greeting, setGreeting] = useState("")
  const [weatherIcon, setWeatherIcon] = useState<React.ElementType>(Cloud)

  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    // Set initial greeting
    updateGreeting(new Date())

    // Randomly select a weather icon for demo purposes
    const weatherIcons = [Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle]
    const randomIcon = weatherIcons[Math.floor(Math.random() * weatherIcons.length)]
    setWeatherIcon(randomIcon)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    updateGreeting(currentTime)
  }, [currentTime])

  const updateGreeting = (date: Date) => {
    const hours = date.getHours()
    if (hours < 12) {
      setGreeting("Good morning")
    } else if (hours < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Mock weather data
  const weather = {
    temp: Math.floor(Math.random() * 30) + 60, // Random temperature between 60-90
    condition: "Partly Cloudy",
    icon: weatherIcon,
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{formatTime(currentTime)}</h2>
          <p className="text-gray-400">{formatDate(currentTime)}</p>
          <p className="text-xl mt-2">{greeting}, Alex</p>
        </div>

        <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
          <weather.icon className="h-8 w-8 text-indigo-400 mr-3" />
          <div>
            <p className="text-2xl font-bold">{weather.temp}°</p>
            <p className="text-gray-400">{weather.condition}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
