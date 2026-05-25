type PageHeaderProps = {
  title: string
  subtitle: string
  centered?: boolean
}

function PageHeader({ title, subtitle, centered = false }: PageHeaderProps) {
  return (
    <section className={`container-page relative overflow-hidden pt-12 sm:pt-16 ${centered ? 'text-center' : ''}`}>
      <div className="absolute -right-14 top-7 h-28 w-28 rounded-full bg-brand-teal/80" aria-hidden="true" />
      <div
        className="abstract-ribbon absolute -left-24 top-20 h-16 w-56 rotate-[-10deg] bg-brand-orange/80"
        aria-hidden="true"
      />
      <div className="poster-dots absolute right-12 top-32 h-16 w-24 opacity-50" aria-hidden="true" />
      <div className="relative">
        <p className="eyebrow-label mb-4">Portfolio Journal</p>
        <h1 className="section-title">{title}</h1>
        <p className={`section-subtitle ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>
      </div>
    </section>
  )
}

export default PageHeader
