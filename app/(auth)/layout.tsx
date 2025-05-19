import type React from "react"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Here you would check if the user is authenticated
  // For now, we'll just render the children
  return <>{children}</>
}
