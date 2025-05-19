"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function DebugPage() {
  const [authStatus, setAuthStatus] = useState<string>("Checking...")

  useEffect(() => {
    // Check authentication status
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    setAuthStatus(isLoggedIn ? "Authenticated" : "Not authenticated")
  }, [])

  const handleSetAuth = () => {
    localStorage.setItem("isLoggedIn", "true")
    setAuthStatus("Authenticated")
  }

  const handleClearAuth = () => {
    localStorage.removeItem("isLoggedIn")
    setAuthStatus("Not authenticated")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Debug Page</h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
        <p className="mb-4">
          Current status:{" "}
          <span className={authStatus === "Authenticated" ? "text-green-400" : "text-red-400"}>{authStatus}</span>
        </p>

        <div className="flex space-x-4 mb-6">
          <button onClick={handleSetAuth} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
            Set Authenticated
          </button>
          <button onClick={handleClearAuth} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
            Clear Authentication
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Navigation Links</h2>
        <div className="space-y-2">
          <div>
            <Link href="/" className="text-indigo-400 hover:text-indigo-300">
              Home Page
            </Link>
          </div>
          <div>
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
              Login Page
            </Link>
          </div>
          <div>
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">
              Signup Page
            </Link>
          </div>
          <div>
            <Link href="/onboarding" className="text-indigo-400 hover:text-indigo-300">
              Onboarding Page
            </Link>
          </div>
          <div>
            <Link href="/dashboard" className="text-indigo-400 hover:text-indigo-300">
              Dashboard Page
            </Link>
          </div>
          <div>
            <Link href="/direct-dashboard" className="text-indigo-400 hover:text-indigo-300">
              Direct Dashboard Access (sets auth and redirects)
            </Link>
          </div>
          <div>
            <Link href="/logout" className="text-indigo-400 hover:text-indigo-300">
              Logout Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
