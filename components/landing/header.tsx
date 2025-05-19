export function Header() {
  return (
    <header className="py-6 px-4 md:px-6 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img src="/landing/logo.png" alt="Elev8 Logo" className="h-10" />
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white">
              Features
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-white">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white">
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <a href="/login" className="text-gray-300 hover:text-white">
              Log In
            </a>
            <a href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
