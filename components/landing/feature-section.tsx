import { BarChart2, Calendar, Clock, Compass, Layout, Target } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set meaningful goals across different life areas and track your progress with visual dashboards.",
    },
    {
      icon: Calendar,
      title: "Task Management",
      description: "Break down your goals into actionable tasks and manage your daily priorities effectively.",
    },
    {
      icon: Compass,
      title: "Life Balance",
      description: "Maintain balance across all areas of your life with our life wheel visualization and insights.",
    },
    {
      icon: Clock,
      title: "Habit Building",
      description: "Create and maintain positive habits with streak tracking and gentle reminders.",
    },
    {
      icon: BarChart2,
      title: "Progress Analytics",
      description: "Visualize your progress over time with beautiful charts and actionable insights.",
    },
    {
      icon: Layout,
      title: "Customizable Dashboard",
      description: "Personalize your dashboard to focus on what matters most to you.",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 bg-gray-900" id="features">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to reach your potential</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive toolkit helps you stay organized, motivated, and on track to achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 hover:border-indigo-500/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-indigo-900/50 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
