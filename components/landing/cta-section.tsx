import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-700/60 text-indigo-200 text-sm font-medium mb-4">
          Get Started Today
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to elevate your life?</h2>
        <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are achieving their goals and building better habits with Elev8.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/onboarding"
            className="bg-white text-indigo-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg inline-flex items-center justify-center transition-colors"
          >
            Get Started For Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/login"
            className="bg-indigo-800 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Log In
          </Link>
        </div>
        <p className="text-indigo-200 mt-6">No credit card required. Free plan available.</p>
      </div>
    </section>
  )
}
