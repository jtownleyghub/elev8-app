export function CTASection() {
  return (
    <section className="py-20 px-4 md:px-6 bg-indigo-900">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to elevate your life?</h2>
        <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are achieving their goals and building better habits with Elev8.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/signup"
            className="bg-white text-indigo-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-lg"
          >
            Get Started For Free
          </a>
          <a
            href="/login"
            className="bg-indigo-800 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium text-lg"
          >
            Log In
          </a>
        </div>
      </div>
    </section>
  )
}
