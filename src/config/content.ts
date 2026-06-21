export const siteConfig = {
  name: 'Global Trading Academy',
  tagline: 'Master the Markets with Confidence',
  phone: '+91 90322 27132',
  email: 'info@globaltradingacademy.com',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210',
  address: '123 Finance Tower, Mumbai, India',
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#why-us' },
  { label: 'Contact', href: '/contact' },
]

export const courses = [
  { id: 'stock-fundamentals', label: 'Stock Market Fundamentals' },
  { id: 'technical-analysis', label: 'Technical Analysis Mastery' },
  { id: 'options-trading', label: 'Options Trading Strategies' },
  { id: 'intraday-trading', label: 'Intraday Trading Bootcamp' },
  { id: 'swing-trading', label: 'Swing Trading Essentials' },
  { id: 'crypto-basics', label: 'Cryptocurrency Basics' },
]

export const heroContent = {
  tag: "India's Leading Trading Academy",
  headline: ['Learn to Trade', 'Like a Pro', 'From Experts'],
  underlineIndex: 1,
  subtext:
    'Join thousands of students who transformed their financial journey with our expert-led courses, live market sessions, and hands-on mentorship.',
  ctaText: 'Enroll Now',
  image: '/sharoof.png',
  badges: [
    { text: '7+ Years of Experience', position: 'top-left' as const },
    { text: '4000+ Students Trained', position: 'bottom-right' as const },
  ],
}

export const freeClassBanner = {
  heading: 'Attend Your First Class Absolutely Free!',
  subtext: 'Experience our teaching methodology with a complimentary demo session.',
  ctaText: 'Book Free Demo',
}

export const carouselSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=900&h=500&fit=crop',
    alt: 'Trading floor session',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=500&fit=crop',
    alt: 'Market analysis workshop',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop',
    alt: 'Data-driven trading strategies',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&h=500&fit=crop',
    alt: 'Student success celebration',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&h=500&fit=crop',
    alt: 'Financial growth concept',
  },
]

export const courseHighlights = [
  'Live market sessions with real-time analysis',
  'Beginner to advanced structured curriculum',
  'One-on-one mentorship from SEBI-registered experts',
  'Lifetime access to course materials',
  'Paper trading simulator for risk-free practice',
  'Weekly doubt-clearing sessions',
  'Certificate upon course completion',
  'Dedicated mobile app for on-the-go learning',
]

export const whyChooseUs = [
  {
    id: 'expert-faculty',
    title: 'Expert Faculty',
    description:
      'Learn from industry veterans with decades of combined trading experience across equity, derivatives, and commodities.',
    icon: 'GraduationCap' as const,
    variant: 'accent' as const,
  },
  {
    id: 'practical-approach',
    title: 'Practical Approach',
    description:
      'Our curriculum focuses on real-world trading scenarios, not just textbook theory. Practice with live market data.',
    icon: 'Target' as const,
    variant: 'white' as const,
  },
  {
    id: 'community',
    title: 'Active Community',
    description:
      'Join a vibrant community of traders. Share ideas, discuss strategies, and grow together with peer support.',
    icon: 'Users' as const,
    variant: 'white' as const,
  },
  {
    id: 'support',
    title: '24/7 Support',
    description:
      'Get help whenever you need it. Our support team and mentors are available round the clock for your queries.',
    icon: 'Headphones' as const,
    variant: 'white' as const,
  },
]

export const appDownload = {
  heading: 'Learn Anytime, Anywhere',
  subtext:
    'Download our mobile app and access courses, live sessions, market alerts, and community discussions on the go.',
  stats: [
    { value: '4.8★', label: 'App Rating' },
    { value: '50K+', label: 'Downloads' },
    { value: '200+', label: 'Video Lessons' },
  ],
  phoneImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=700&fit=crop',
}

export const partners = [
  {
    id: 'zerodha',
    name: 'Zerodha',
    tagline: "India's largest stock broker",
    benefits: ['Zero brokerage on delivery', 'Advanced charting tools', 'Instant account opening'],
    quote: 'Trusted by over 1 crore investors nationwide.',
    bgColor: 'bg-blue-50',
    logoText: 'Z',
    logoColor: 'bg-blue-600',
  },
  {
    id: 'upstox',
    name: 'Upstox',
    tagline: 'Smart trading platform',
    benefits: ['Low brokerage fees', 'Pro trading terminal', 'Free demat account'],
    quote: 'Award-winning platform for active traders.',
    bgColor: 'bg-purple-50',
    logoText: 'U',
    logoColor: 'bg-purple-600',
  },
  {
    id: 'angelone',
    name: 'Angel One',
    tagline: 'Full-service brokerage',
    benefits: ['Research-backed recommendations', 'Advisory services', 'Multi-asset trading'],
    quote: 'Comprehensive research for informed decisions.',
    bgColor: 'bg-orange-50',
    logoText: 'A',
    logoColor: 'bg-orange-600',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Software Engineer turned Trader',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    shortQuote:
      'Global Trading Academy completely changed my approach to the markets. The practical sessions helped me build confidence...',
    fullQuote:
      'Global Trading Academy completely changed my approach to the markets. The practical sessions helped me build confidence to trade independently. Within 6 months, I was consistently profitable and even quit my day job to trade full-time. The mentorship program is unmatched.',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    shortQuote:
      'As a complete beginner, I was intimidated by trading. The structured curriculum and patient instructors made...',
    fullQuote:
      'As a complete beginner, I was intimidated by trading. The structured curriculum and patient instructors made everything click. The options trading course alone paid for itself within the first month. Highly recommend to anyone serious about learning.',
  },
]

export const countryCodes = [
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
]

export const occupations = [
  'Student',
  'Salaried Professional',
  'Business Owner',
  'Freelancer',
  'Retired',
  'Other',
]

export const footerLinks = {
  courses: courses.map((c) => ({ label: c.label, href: '/contact' })),
  useful: [
    { label: 'About Us', href: '/#why-us' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
}
