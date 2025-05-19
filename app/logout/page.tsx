"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear authentication
    localStorage.removeItem("isLoggedIn")

    // Redirect to home page
    router.push("/")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white">Logging out...</div>
    </div>
  )
}
