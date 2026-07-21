import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/" aria-label="Go to home" className="shrink-0 no-underline">
      <span className="bg-linear-to-r from-cream to-bronze bg-clip-text pr-1 text-xl lg:text-2xl font-medium uppercase tracking-[0.15em] text-transparent">
        Faatano
      </span>
    </Link>
  )
}
