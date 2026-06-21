import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, TrendingUp } from 'lucide-react'
import { footerLinks, siteConfig } from '../config/content'

export default function Footer() {
  return (
    <footer className="bg-navy chart-pattern text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img src="/logo.jpeg" alt="Global Trading Academy" className="h-10 w-10 rounded-lg object-contain" />
              <span className="text-lg font-bold">{siteConfig.name}</span>
            </div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Our Courses</h3>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Useful Links</h3>
            <ul className="space-y-2">
              {footerLinks.useful.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/70 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Get Our App</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="rounded-xl bg-black/30 px-4 py-3 text-center text-sm font-medium hover:bg-black/40">
                Download on App Store
              </a>
              <a href="#" className="rounded-xl bg-black/30 px-4 py-3 text-center text-sm font-medium hover:bg-black/40">
                Get it on Google Play
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-sm text-white/50 sm:flex-row lg:px-8">
          <p>© 2019 Global Trading Academy. All rights reserved.</p>
          <p>Educational purposes only. Trading involves risk.</p>
        </div>
      </div>
    </footer>
  )
}
