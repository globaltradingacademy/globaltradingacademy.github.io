import { useEffect, useRef, useState } from 'react'
import { heroContent } from '../config/content'
import CTAButton from '../components/CTAButton'
import SectionTag from '../components/SectionTag'

export default function HeroSection() {
  const { tag, headline, underlineIndex, subtext, ctaText, image, badges } = heroContent
  const [isRevealed, setIsRevealed] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-gray-light px-4 py-12 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTag className="mb-8 text-lg px-6 py-2">{tag}</SectionTag>
          <h1 className="mb-6 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-5xl">
            {headline.map((line, i) => (
              <span key={line} className="inline">
                {i === underlineIndex ? (
                  <span className="underline decoration-accent decoration-4 underline-offset-4">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-600">{subtext}</p>
          <CTAButton to="/contact" className="px-8 py-4 text-sm">{ctaText}</CTAButton>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-sm">
          <img
            ref={imageRef}
            src={image}
            alt="Students learning trading"
            className={`aspect-[3/4] w-full object-cover ${isRevealed ? 'reveal-from-bottom' : ''}`}
          />
          {badges.map((badge) => (
            <div
              key={badge.text}
              className={`absolute rounded-xl bg-white px-4 py-3 text-sm font-bold text-navy shadow-lg ${
                badge.position === 'top-left' ? '-left-2 top-4 lg:-left-6 lg:top-8' : '-right-2 bottom-4 lg:-right-6 lg:bottom-8'
              }`}
            >
              <span className="text-accent">✦</span> {badge.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
