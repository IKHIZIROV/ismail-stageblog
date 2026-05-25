function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-brand-navy/10 bg-brand-sand/60">
      <div className="absolute -right-10 top-4 h-24 w-24 rounded-full bg-brand-coral/70" aria-hidden="true" />
      <div
        className="poster-dots absolute -left-8 bottom-3 h-20 w-32 opacity-60"
        aria-hidden="true"
      />
      <div className="container-page relative py-7 text-center text-sm font-medium text-brand-muted sm:text-left">
        <p>Stageblog - Dagelijkse updates over mijn software engineering stage.</p>
      </div>
    </footer>
  )
}

export default Footer

