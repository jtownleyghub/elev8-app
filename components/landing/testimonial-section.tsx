import { Star } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah J.",
      role: "Marketing Director",
      image: "/professional-woman-headshot.png",
      content:
        "Elev8 helped me balance my demanding career with my dream of writing a novel. I'm now halfway through my manuscript while still excelling at work!",
      stars: 5,
    },
    {
      name: "Michael T.",
      role: "Software Engineer",
      image: "/professional-man-headshot.png",
      content:
        "I always wanted to travel to Japan but never found the time. Elev8 helped me plan and save for my dream trip while managing my daily responsibilities.",
      stars: 5,
    },
    {
      name: "Jennifer L.",
      role: "Health Coach",
      image: "/diverse-professional-woman-headshots.png",
      content:
        "Thanks to Elev8, I finally ran my first marathon! The app helped me balance my training schedule with client work and family time.",
      stars: 5,
    },
  ]

  return (
    <section className="py-20 px-4 md:px-6" id="testimonials">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 text-sm font-medium mb-4">
            Dream Achievers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real people. Real dreams achieved.</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands who have turned their aspirations into reality while mastering their daily lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
