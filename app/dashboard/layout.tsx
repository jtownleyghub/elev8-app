"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { BottomNav } from "@/components/layout/bottom-nav"
import { AuthCheck } from "@/components/auth/auth-check"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {!isMobile && <SidebarNav currentPath={pathname} />}
        <main className="md:ml-64 min-h-screen pb-16 md:pb-0">
          <div className="container mx-auto p-4">{children}</div>
        </main>
        {isMobile && <BottomNav currentPath={pathname} />}
      </div>
    </AuthCheck>
  )
}
