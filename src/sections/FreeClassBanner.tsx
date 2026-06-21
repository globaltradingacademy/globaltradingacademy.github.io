import { freeClassBanner } from '../config/content'
import CTAButton from '../components/CTAButton'

export default function FreeClassBanner() {
  return (
    <section className="px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white px-6 py-10 text-center shadow-lg lg:px-12 lg:py-12">
        <h2 className="mb-3 text-2xl font-bold text-navy lg:text-3xl">{freeClassBanner.heading}</h2>
        <p className="mb-6 text-gray-600">{freeClassBanner.subtext}</p>
        <CTAButton to="/contact">{freeClassBanner.ctaText}</CTAButton>
      </div>
    </section>
  )
}
