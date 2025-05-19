import Link from "next/link"
import {
  LayoutDashboard,
  Target,
  CheckSquare,
  PieChart,
  Calendar,
  Settings,
  BarChart2,
  HelpCircle,
  LogOut,
  Users,
  FileText,
  BookTemplate,
} from "lucide-react"

interface SidebarNavProps {
  currentPath: string
}

export function SidebarNav({ currentPath }: SidebarNavProps) {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/goals", label: "Goals", icon: Target },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/life-areas", label: "Life Areas", icon: PieChart },
    { href: "/life-areas/relationships/contacts", label: "Contacts", icon: Users },
    { href: "/templates", label: "Templates", icon: FileText },
    { href: "/templates/browse", label: "Goal Library", icon: BookTemplate },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/analytics", label: "Analytics", icon: BarChart2 },
  ]

  const bottomNavItems = [
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/help", label: "Help", icon: HelpCircle },
    { href: "/logout", label: "Logout", icon: LogOut },
  ]

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 z-10">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-700">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-indigo-500"
            >
              <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
            </svg>
            <span className="font-bold text-xl">Elev8</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                currentPath === item.href ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
              <span className="font-medium">AJ</span>
            </div>
            <div>
              <p className="font-medium">Alex Johnson</p>
              <p className="text-sm text-gray-400">Level 7</p>
            </div>
          </div>

          <nav className="space-y-1">
            {bottomNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentPath === item.href ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
