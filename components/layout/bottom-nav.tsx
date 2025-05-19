import Link from "next/link"
import { LayoutDashboard, Target, CheckSquare, PieChart, Users } from "lucide-react"

interface BottomNavProps {
  currentPath: string
}

export function BottomNav({ currentPath }: BottomNavProps) {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/goals", label: "Goals", icon: Target },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/life-areas", label: "Life Areas", icon: PieChart },
    { href: "/life-areas/relationships/contacts", label: "Contacts", icon: Users },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 md:hidden z-10">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center py-2 px-3 ${
              currentPath === item.href ? "text-indigo-400" : "text-gray-400"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
