import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { carouselSlides } from '../config/content'

export default function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="bg-gray-light px-4 py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl shadow-lg" ref={emblaRef}>
          <div className="flex">
            {carouselSlides.map((slide) => (
              <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                <img src={slide.image} alt={slide.alt} className="aspect-[16/9] w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {carouselSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === selectedIndex ? 'w-8 bg-accent' : 'w-2.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
