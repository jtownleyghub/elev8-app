import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 px-4 md:px-6" id="hero">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-sm font-medium mb-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2"></span>
              New: Goal Templates Library
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Track your goals, build habits, elevate your life
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Elev8 helps you track your personal development journey, build consistent habits, and achieve your goals
              across all areas of life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/onboarding"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center inline-flex items-center justify-center transition-colors"
              >
                Get Started — It's Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors"
              >
                Log In
              </Link>
            </div>
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center text-gray-300">
                <CheckCircle className="h-5 w-5 text-indigo-400 mr-2" />
                <span>Goal tracking</span>
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="h-5 w-5 text-indigo-400 mr-2" />
                <span>Habit building</span>
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="h-5 w-5 text-indigo-400 mr-2" />
                <span>Life balance</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-xl opacity-75"></div>
            <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
              <img
                src="/goals-tasks-dashboard.png"
                alt="Elev8 app dashboard"
                className="rounded-lg w-full"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
