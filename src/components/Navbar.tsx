import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { courses, navLinks, siteConfig } from '../config/content'
import CTAButton from './CTAButton'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    setCoursesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
              <img src="/logo.jpeg" alt="Global Trading Academy" className="h-10 w-10 rounded-lg object-contain" />
              <span className="text-lg font-bold text-navy">{siteConfig.name}</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === link.href ? 'text-accent' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-accent"
              >
                Courses Offered
                <ChevronDown className={`h-4 w-4 transition-transform ${coursesOpen ? 'rotate-180' : ''}`} />
              </button>
              {coursesOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      to="/contact"
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-accent"
                    >
                      {course.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:block">
            <CTAButton href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>
              <Phone className="mr-2 inline h-4 w-4" />
              Call Us Now
            </CTAButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-navy lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} aria-hidden />
          <div className="absolute right-0 top-0 flex h-full w-[min(320px,85vw)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <img src="/logo.jpeg" alt="Global Trading Academy" className="h-8 w-8 rounded-lg object-contain" />
                <span className="font-bold text-navy">{siteConfig.name}</span>
              </div>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t pt-4">
                <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Courses Offered
                </p>
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    {course.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="border-t p-4">
              <CTAButton href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="w-full">
                <Phone className="mr-2 inline h-4 w-4" />
                Call Us Now
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
