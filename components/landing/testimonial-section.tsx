export function TestimonialSection() {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What our users are saying</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of people who have transformed their lives with Elev8.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <img src="/landing/testimonial-1.png" alt="Sarah J." className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h4 className="font-bold">Sarah J.</h4>
                <p className="text-gray-400">Marketing Director</p>
              </div>
            </div>
            <p className="text-gray-300">
              "Elev8 has completely changed how I approach my personal and professional goals. I'm more organized and
              focused than ever before."
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <img src="/landing/testimonial-2.png" alt="Michael T." className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h4 className="font-bold">Michael T.</h4>
                <p className="text-gray-400">Software Engineer</p>
              </div>
            </div>
            <p className="text-gray-300">
              "I've tried many productivity apps, but Elev8 is the first one that actually helped me build lasting
              habits and achieve my goals."
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <img src="/landing/testimonial-3.png" alt="Jennifer L." className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h4 className="font-bold">Jennifer L.</h4>
                <p className="text-gray-400">Health Coach</p>
              </div>
            </div>
            <p className="text-gray-300">
              "The life areas feature has been a game-changer for me. I now have a much better balance between work,
              health, and relationships."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
