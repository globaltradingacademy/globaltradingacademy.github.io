import { useState } from 'react'
import { Quote } from 'lucide-react'
import { testimonials } from '../config/content'
import SectionTag from '../components/SectionTag'

function TestimonialCard({
  name,
  role,
  image,
  shortQuote,
  fullQuote,
}: {
  name: string
  role: string
  image: string
  shortQuote: string
  fullQuote: string
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-md lg:p-8">
      <Quote className="mb-4 h-8 w-8 text-accent/30" />
      <p className="mb-4 text-sm leading-relaxed text-gray-600 lg:text-base">
        {expanded ? fullQuote : shortQuote}
      </p>
      <button type="button" onClick={() => setExpanded(!expanded)} className="mb-6 text-sm font-semibold text-accent hover:underline">
        {expanded ? 'Read less' : 'Read more'}
      </button>
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="h-14 w-14 rounded-full object-cover lg:h-16 lg:w-16" />
        <div>
          <p className="font-bold text-navy">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-gray-light px-4 py-12 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center lg:text-left">
          <SectionTag className="mb-4">Testimonials</SectionTag>
          <h2 className="text-2xl font-bold text-navy lg:text-4xl">What Our Students Say</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
          <div className="lg:col-span-2 grid gap-8 lg:grid-cols-2">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 rounded-full blur-3xl opacity-60 scale-110"></div>
              <img
                src="/testimonial.png"
                alt="Testimonial"
                className="relative h-[300px] w-[300px] lg:h-[450px] lg:w-[450px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
