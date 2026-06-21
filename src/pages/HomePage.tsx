import HeroSection from '../sections/HeroSection'
import FreeClassBanner from '../sections/FreeClassBanner'
import ImageCarousel from '../sections/ImageCarousel'
import CourseHighlights from '../sections/CourseHighlights'
import WhyChooseUs from '../sections/WhyChooseUs'
import AppDownloadBanner from '../sections/AppDownloadBanner'
import PartnerCards from '../sections/PartnerCards'
import Testimonials from '../sections/Testimonials'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FreeClassBanner />
      <ImageCarousel />
      <CourseHighlights />
      <WhyChooseUs />
      <AppDownloadBanner />
      <PartnerCards />
      <Testimonials />
    </>
  )
}
