export function FeatureSection() {
  return (
    <section className="py-20 px-4 md:px-6 bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to reach your potential</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive toolkit helps you stay organized, motivated, and on track to achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <img
              src="/landing/feature-1.png"
              alt="Goal tracking"
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <h3 className="text-2xl font-bold mb-3">Goal Tracking</h3>
            <p className="text-gray-300">
              Set meaningful goals across different life areas and track your progress with visual dashboards.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <img
              src="/landing/feature-2.png"
              alt="Task management"
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <h3 className="text-2xl font-bold mb-3">Task Management</h3>
            <p className="text-gray-300">
              Break down your goals into actionable tasks and manage your daily priorities effectively.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <img src="/landing/feature-3.png" alt="Life balance" className="w-full h-48 object-cover rounded-lg mb-6" />
            <h3 className="text-2xl font-bold mb-3">Life Balance</h3>
            <p className="text-gray-300">
              Maintain balance across all areas of your life with our life wheel visualization and insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
