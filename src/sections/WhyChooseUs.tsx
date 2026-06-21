import { GraduationCap, Headphones, Target, Users, type LucideIcon } from 'lucide-react'
import { whyChooseUs } from '../config/content'
import SectionTag from '../components/SectionTag'

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Target,
  Users,
  Headphones,
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-gray-light px-4 py-12 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <SectionTag className="mb-4">Why Choose Us</SectionTag>
          <h2 className="text-2xl font-bold text-navy lg:text-4xl">The TradePro Advantage</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon]
            const isAccent = item.variant === 'accent'
            return (
              <div key={item.id} className={`rounded-2xl p-6 shadow-md ${isAccent ? 'bg-accent text-white' : 'bg-white text-navy'}`}>
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${isAccent ? 'bg-white/20' : 'bg-accent/10'}`}>
                  <Icon className={`h-6 w-6 ${isAccent ? 'text-white' : 'text-accent'}`} />
                </div>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className={`text-sm leading-relaxed ${isAccent ? 'text-white/90' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
