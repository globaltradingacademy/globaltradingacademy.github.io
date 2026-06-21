import { partners } from '../config/content'
import SectionTag from '../components/SectionTag'
import CTAButton from '../components/CTAButton'

export default function PartnerCards() {
  return (
    <section className="px-4 py-12 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <SectionTag className="mb-4">Partner Brokers</SectionTag>
          <h2 className="text-2xl font-bold text-navy lg:text-4xl">Open a Free Demat Account</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Start your trading journey with our trusted partner brokers. Exclusive benefits for TradePro students.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <div key={partner.id} className={`flex flex-col rounded-2xl p-6 shadow-md ${partner.bgColor}`}>
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white ${partner.logoColor}`}>
                  {partner.logoText}
                </div>
                <div>
                  <h3 className="font-bold text-navy">{partner.name}</h3>
                  <p className="text-xs text-gray-500">{partner.tagline}</p>
                </div>
              </div>
              <ul className="mb-4 flex-1 space-y-2">
                {partner.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 text-accent">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mb-4 text-sm italic text-gray-500">&ldquo;{partner.quote}&rdquo;</p>
              <CTAButton href="#" className="w-full text-center">Open Now</CTAButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
