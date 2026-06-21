interface SectionTagProps {
  children: React.ReactNode
  className?: string
}

export default function SectionTag({ children, className = '' }: SectionTagProps) {
  return (
    <span
      className={`inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white ${className}`}
    >
      {children}
    </span>
  )
}
