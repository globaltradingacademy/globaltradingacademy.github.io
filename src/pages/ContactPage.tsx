import { Link } from 'react-router-dom'
import { ChevronRight, Mail, Phone } from 'lucide-react'
import SectionTag from '../components/SectionTag'
import CTAButton from '../components/CTAButton'
import ContactForm from '../components/ContactForm'
import { siteConfig } from '../config/content'

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy chart-pattern px-4 py-10 text-white lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-4 flex items-center gap-1 text-sm text-white/70">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Contact Us</span>
          </nav>
          <h1 className="text-3xl font-bold lg:text-4xl">Contact Us</h1>
        </div>
      </section>

      <section className="bg-surface px-4 py-10 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-navy p-6 text-white shadow-lg lg:p-8">
            <SectionTag className="mb-4">Get in Touch</SectionTag>
            <h2 className="mb-4 text-2xl font-bold lg:text-3xl">We&apos;d Love to Hear From You</h2>
            <p className="mb-8 text-white/80">
              Have questions about our courses? Want to schedule a demo class? Reach out and our team will get back to you within 24 hours.
            </p>
            <div className="mb-6 space-y-4">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-white/90 hover:text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Call Support</p>
                  <p className="font-medium">{siteConfig.phone}</p>
                </div>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-white/90 hover:text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Email Support</p>
                  <p className="font-medium">{siteConfig.email}</p>
                </div>
              </a>
            </div>
            <p className="mb-6 text-sm text-white/70">
              Not sure which course is right for you? Book a free demo class and experience our teaching style firsthand.
            </p>
            <CTAButton href="#" variant="outline" className="border-white text-white hover:bg-white hover:text-navy">
              Download E-Brochure
            </CTAButton>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg lg:p-8">
            <h2 className="mb-6 text-xl font-bold text-navy">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
