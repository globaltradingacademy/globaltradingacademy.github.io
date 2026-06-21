import { Link, type LinkProps } from 'react-router-dom'
import { useRef, useState } from 'react'

type CTAButtonVariant = 'solid' | 'outline'

interface CTAButtonProps {
  children: React.ReactNode
  variant?: CTAButtonVariant
  href?: string
  to?: LinkProps['to']
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  onClick?: () => void
}

const base =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<CTAButtonVariant, string> = {
  solid: 'bg-accent text-white hover:bg-accent/90 shadow-md hover:shadow-lg',
  outline: 'border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white',
}

function MagnetWrapper({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const rect = wrapper.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Magnet strength - adjust as needed
    const strength = 0.3
    setTransform(`translate(${x * strength}px, ${y * strength}px)`)
  }

  const handleMouseLeave = () => {
    setTransform('')
  }

  return (
    <div
      ref={wrapperRef}
      style={{ transform, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default function CTAButton({
  children,
  variant = 'solid',
  href,
  to,
  type = 'button',
  disabled,
  className = '',
  onClick,
}: CTAButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  const buttonElement = (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )

  const linkElement = to ? (
    <Link to={to} className={classes}>
      {children}
    </Link>
  ) : null

  const anchorElement = href ? (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : null

  const content = to ? linkElement : href ? anchorElement : buttonElement

  return <MagnetWrapper disabled={disabled}>{content}</MagnetWrapper>
}
