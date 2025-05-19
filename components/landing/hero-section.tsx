export function HeroSection() {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Track your goals, build habits, elevate your life
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Elev8 helps you track your personal development journey, build consistent habits, and achieve your goals
              across all areas of life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
              >
                Get Started — It's Free
              </a>
              <a
                href="/login"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium text-center"
              >
                Log In
              </a>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="/landing/hero-image.png"
              alt="Elev8 app dashboard"
              className="rounded-lg shadow-2xl"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
