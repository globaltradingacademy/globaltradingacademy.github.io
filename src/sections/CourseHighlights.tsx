import { CheckSquare } from 'lucide-react'
import { courseHighlights } from '../config/content'
import SectionTag from '../components/SectionTag'

export default function CourseHighlights() {
  return (
    <section className="px-4 py-12 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <SectionTag className="mb-4">What You Get</SectionTag>
          <h2 className="text-2xl font-bold text-navy lg:text-4xl">Everything You Need to Succeed</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {courseHighlights.map((item, index) => {
            const isAccent = index % 2 === 0
            return (
              <div
                key={item}
                className={`flex items-center gap-3 rounded-2xl px-5 py-4 ${
                  isAccent ? 'bg-accent text-white' : 'border border-gray-200 bg-white text-navy shadow-sm'
                }`}
              >
                <CheckSquare className={`h-5 w-5 shrink-0 ${isAccent ? 'text-white' : 'text-accent'}`} />
                <span className="text-sm font-medium lg:text-base">{item}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
