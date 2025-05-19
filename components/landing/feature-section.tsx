import { Calendar, Clock, Compass, Star, Lightbulb, Heart } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: Star,
      title: "Dream Tracking",
      description: "Set meaningful aspirational goals and track your journey toward achieving your dreams.",
    },
    {
      icon: Calendar,
      title: "Daily Task Management",
      description: "Efficiently handle your daily responsibilities while making space for what truly matters.",
    },
    {
      icon: Compass,
      title: "Life Balance",
      description: "Find harmony between your daily obligations and your long-term aspirations.",
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "Our AI helps you find time for your dreams in your busy schedule, one step at a time.",
    },
    {
      icon: Lightbulb,
      title: "Inspiration Library",
      description: "Browse hundreds of aspirational goals and bucket list ideas to discover what moves you.",
    },
    {
      icon: Heart,
      title: "Progress Celebration",
      description: "Celebrate milestones on your journey to achieving your most meaningful dreams.",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6 bg-gray-900" id="features">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Balance daily life. Make time for dreams.</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive toolkit helps you manage the everyday while creating space for what truly matters to you.
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
