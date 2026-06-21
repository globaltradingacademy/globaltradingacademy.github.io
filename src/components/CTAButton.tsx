import { Link, type LinkProps } from 'react-router-dom'

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

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
