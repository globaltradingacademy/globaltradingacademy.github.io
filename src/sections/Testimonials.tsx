import { useState } from 'react'
import { ArrowRight, Quote } from 'lucide-react'
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
        <div className="mb-10 flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <SectionTag className="mb-4">Testimonials</SectionTag>
            <h2 className="text-2xl font-bold text-navy lg:text-4xl">What Our Students Say</h2>
          </div>
          <ArrowRight className="mt-4 hidden h-10 w-10 text-accent lg:block" />
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>
        <div className="mt-10 hidden justify-center lg:flex">
          <img src={testimonials[0].image} alt="" className="h-48 w-48 rounded-full border-4 border-accent object-cover shadow-xl" />
        </div>
      </div>
    </section>
  )
}
