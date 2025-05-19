"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DirectDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Set authentication and redirect to dashboard
    localStorage.setItem("isLoggedIn", "true")
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white">Redirecting to dashboard...</div>
    </div>
  )
}
