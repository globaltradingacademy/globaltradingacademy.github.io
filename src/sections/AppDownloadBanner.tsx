import { appDownload } from '../config/content'

export default function AppDownloadBanner() {
  return (
    <section className="bg-navy chart-pattern px-4 py-12 text-white lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl">
            <img src={appDownload.phoneImage} alt="TradePro mobile app" className="aspect-[9/16] w-full object-cover" />
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold lg:text-4xl">{appDownload.heading}</h2>
          <p className="mb-8 text-white/80 lg:text-lg">{appDownload.subtext}</p>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <a href="#" className="rounded-xl bg-black/40 px-5 py-3 text-center text-sm font-medium hover:bg-black/50">App Store</a>
            <a href="#" className="rounded-xl bg-black/40 px-5 py-3 text-center text-sm font-medium hover:bg-black/50">Google Play</a>
          </div>
          <div className="flex gap-8">
            {appDownload.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-accent lg:text-3xl">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
