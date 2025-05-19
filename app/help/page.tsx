"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Book,
  Video,
  HelpCircle,
  Search,
  ChevronRight,
  Lightbulb,
  Compass,
  Target,
  CheckSquare,
  PieChart,
  BarChart2,
} from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const helpCategories = [
    {
      title: "Getting Started",
      icon: Compass,
      color: "bg-blue-500",
      items: [
        { title: "Welcome to Elev8", link: "/help/welcome" },
        { title: "Setting Up Your Account", link: "/help/account-setup" },
        { title: "Understanding the Dashboard", link: "/help/dashboard" },
        { title: "Sample Content Guide", link: "/help/sample-content" },
      ],
    },
    {
      title: "Goals",
      icon: Target,
      color: "bg-green-500",
      items: [
        { title: "Creating Effective Goals", link: "/help/creating-goals" },
        { title: "Tracking Goal Progress", link: "/help/goal-progress" },
        { title: "Goal Categories", link: "/help/goal-categories" },
        { title: "Goal Templates", link: "/help/goal-templates" },
      ],
    },
    {
      title: "Tasks",
      icon: CheckSquare,
      color: "bg-purple-500",
      items: [
        { title: "Daily Task Management", link: "/help/daily-tasks" },
        { title: "Task Prioritization", link: "/help/task-priority" },
        { title: "Recurring Tasks", link: "/help/recurring-tasks" },
        { title: "Task Categories", link: "/help/task-categories" },
      ],
    },
    {
      title: "Life Areas",
      icon: PieChart,
      color: "bg-pink-500",
      items: [
        { title: "Understanding Life Areas", link: "/help/life-areas" },
        { title: "Creating Custom Life Areas", link: "/help/custom-life-areas" },
        { title: "Life Balance Analysis", link: "/help/life-balance" },
        { title: "Life Area Goals", link: "/help/life-area-goals" },
      ],
    },
    {
      title: "Analytics",
      icon: BarChart2,
      color: "bg-yellow-500",
      items: [
        { title: "Progress Reports", link: "/help/progress-reports" },
        { title: "Understanding Your Data", link: "/help/understanding-data" },
        { title: "Exporting Reports", link: "/help/exporting-reports" },
        { title: "Setting Benchmarks", link: "/help/benchmarks" },
      ],
    },
  ]

  const quickTips = [
    "Connect your goals to specific life areas for better balance",
    "Review your progress weekly to stay on track",
    "Break down large goals into smaller, manageable tasks",
    "Use the dashboard to get a quick overview of your progress",
    "Clear sample content once you've added your own goals and tasks",
  ]

  // Filter categories and items based on search query
  const filteredCategories = searchQuery
    ? helpCategories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((category) => category.items.length > 0)
    : helpCategories

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Help Center</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Find answers to common questions and learn how to get the most out of Elev8.
        </p>

        <div className="mt-6 max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-indigo-900/60 flex items-center justify-center mb-4">
            <Book className="h-6 w-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">User Guide</h3>
          <p className="text-gray-300 mb-4">Comprehensive documentation on how to use all features of Elev8.</p>
          <Link href="/help/user-guide" className="text-indigo-400 hover:text-indigo-300 flex items-center mt-auto">
            Read the guide <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-purple-900/60 flex items-center justify-center mb-4">
            <Video className="h-6 w-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
          <p className="text-gray-300 mb-4">Watch step-by-step tutorials on how to use Elev8 effectively.</p>
          <Link href="/help/tutorials" className="text-indigo-400 hover:text-indigo-300 flex items-center mt-auto">
            Watch tutorials <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-green-900/60 flex items-center justify-center mb-4">
            <HelpCircle className="h-6 w-6 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">FAQ</h3>
          <p className="text-gray-300 mb-4">Find answers to frequently asked questions about Elev8.</p>
          <Link href="/help/faq" className="text-indigo-400 hover:text-indigo-300 flex items-center mt-auto">
            View FAQ <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Help Topics</h2>

          {filteredCategories.length > 0 ? (
            <div className="space-y-8">
              {filteredCategories.map((category) => (
                <div
                  key={category.title}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className={`h-10 w-10 rounded-full ${category.color} flex items-center justify-center mr-3`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.link}
                        className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                      >
                        <span className="flex-1">{item.title}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
              <p className="text-gray-300 mb-4">No help topics found matching "{searchQuery}"</p>
              <button onClick={() => setSearchQuery("")} className="text-indigo-400 hover:text-indigo-300">
                Clear search
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
            <div className="flex items-center mb-4">
              <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
              <h3 className="text-xl font-semibold">Quick Tips</h3>
            </div>
            <ul className="space-y-3">
              {quickTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 mt-2 mr-2"></span>
                  <span className="text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-900/30 rounded-xl p-6 border border-indigo-800/50">
            <h3 className="text-xl font-semibold mb-4">Need More Help?</h3>
            <p className="text-indigo-200 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Link
              href="/contact"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-center transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
