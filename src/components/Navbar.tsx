import { ViewTransitionNavLink } from './ViewTransitionLink'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Over', to: '/over' },
  { label: 'Blog', to: '/blog' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-brand-navy/10 bg-brand-cream/88 shadow-soft backdrop-blur-md">
      <div className="h-1 w-full bg-brand-teal" />
      <div className="container-page flex min-h-14 items-center justify-between gap-4 py-3 sm:min-h-16 sm:py-4">
        <ViewTransitionNavLink
          to="/"
          className="group flex items-center gap-3 rounded-2xl outline-none transition focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
        >
          <span className="grid h-9 w-9 grid-cols-2 grid-rows-2 overflow-hidden rounded-2xl border border-brand-navy/10 bg-brand-paper shadow-soft">
            <span className="bg-brand-teal" />
            <span className="rounded-bl-2xl bg-brand-blue" />
            <span className="rounded-tr-2xl bg-brand-coral" />
            <span className="bg-brand-purple" />
          </span>
          <span className="flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-normal text-brand-navy sm:text-2xl">RETURN</span>
            <span className="hidden font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted sm:block">
              Stageblog
            </span>
          </span>
        </ViewTransitionNavLink>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Hoofdnavigatie">
          {links.map((link) => (
            <ViewTransitionNavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'rounded-2xl px-3 py-2 text-sm font-semibold outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream sm:px-4',
                  isActive
                    ? 'bg-brand-blue text-white shadow-button'
                    : 'text-brand-muted hover:bg-brand-paper hover:text-brand-navy active:bg-brand-sand',
                ].join(' ')
              }
            >
              {link.label}
            </ViewTransitionNavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
