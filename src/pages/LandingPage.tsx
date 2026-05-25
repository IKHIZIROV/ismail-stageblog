import { ViewTransitionLink } from '../components/ViewTransitionLink'
import postsData from '../data/posts.json'
import type { Post } from '../types/post'

const posts = [...(postsData as Post[])].sort(
  (a, b) => new Date(b.id).getTime() - new Date(a.id).getTime(),
)

/** Dagnummer van een post (dag 1 = eerste stagedag). Posts op datum aflopend. */
function getDayNumber(postId: string): number {
  const index = posts.findIndex((p) => p.id === postId)
  return index === -1 ? 1 : posts.length - index
}

function LandingPage() {
  const latestPost = posts[0]
  const latestDayNumber = latestPost ? getDayNumber(latestPost.id) : 0

  return (
    <>
      <section className="container-page relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div
          className="abstract-ribbon absolute -left-32 top-24 h-24 w-[28rem] rotate-[-8deg] bg-brand-teal/80"
          aria-hidden="true"
        />
        <div
          className="abstract-ribbon absolute -right-40 top-16 hidden h-28 w-[32rem] rotate-[12deg] bg-brand-purple/85 md:block"
          aria-hidden="true"
        />
        <div className="absolute -right-12 bottom-10 hidden h-64 w-64 rounded-full bg-brand-cyan/85 md:block" aria-hidden="true" />
        <div className="absolute left-[48%] top-8 h-20 w-20 rounded-full bg-brand-coral/90" aria-hidden="true" />
        <div className="poster-dots absolute bottom-8 left-8 h-28 w-36 opacity-50" aria-hidden="true" />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow-label">Software Engineering Stage</p>
            <p className="mt-3 text-lg font-semibold text-brand-muted sm:text-xl">Ismail Khizirov</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
              Dagelijkse ervaringen uit mijn stage, helder en eerlijk gedeeld.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
              Deze website is mijn stageblog. Hier documenteer ik mijn dagelijkse werk, wat ik leer, en mijn
              evolutie als software engineering intern. Zo kunnen school, mentor en begeleider mijn traject makkelijk
              opvolgen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ViewTransitionLink
                to="/blog"
                className="btn-primary"
              >
                Bekijk blogposts
              </ViewTransitionLink>
              <ViewTransitionLink
                to="/over"
                className="btn-secondary"
              >
                Meer over mij
              </ViewTransitionLink>
            </div>
          </div>

          {latestPost ? (
            <article className="card-surface overflow-hidden">
              <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-brand-navy/10 bg-brand-navy sm:h-64">
                <div className="absolute -left-12 top-10 h-32 w-32 rounded-full bg-brand-teal" aria-hidden="true" />
                <div
                  className="abstract-ribbon absolute -right-16 bottom-8 h-16 w-56 rotate-[-14deg] bg-brand-coral"
                  aria-hidden="true"
                />
                <span className="relative text-6xl font-bold tracking-tight text-brand-paper sm:text-7xl md:text-8xl">
                  Dag {latestDayNumber}
                </span>
              </div>
              <div className="p-6">
                <p className="eyebrow-label text-brand-coral">Nieuwste blogpost</p>
                <h2 className="mt-2 text-2xl font-semibold text-brand-navy">{latestPost.title}</h2>
                <p className="mt-1 text-sm font-medium text-brand-muted">{latestPost.date}</p>
                <p className="mt-4 leading-relaxed text-brand-muted">{latestPost.excerpt}</p>
                <ViewTransitionLink
                  to="/blog"
                  className="btn-primary mt-6 px-4 py-2"
                >
                  Lees verder
                </ViewTransitionLink>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-brand-navy/10 bg-brand-sand/45 py-12 sm:py-16">
        <div
          className="abstract-ribbon absolute -right-28 top-12 h-20 w-80 rotate-[8deg] bg-brand-blue/75"
          aria-hidden="true"
        />
        <div className="absolute -left-12 bottom-16 h-40 w-40 rounded-full bg-brand-orange/75" aria-hidden="true" />
        <div className="container-page relative">
          <h2 className="section-title">Stage bij Return</h2>
          <p className="section-subtitle">
            Return is het bedrijf waar ik stage loop. Hieronder een korte samenvatting gebaseerd op hun website.
          </p>

          <div className="mt-10 space-y-8">
            <div className="card-surface p-6 sm:p-8">
              <h3 className="eyebrow-label text-brand-blue">Return – Business Applications Consultancy</h3>
              <p className="mt-4 leading-relaxed text-brand-muted">
                Return is expert in bedrijfssystemen en biedt consultancy om <strong>Power Platform</strong>, <strong>Dynamics 365 CE</strong>, <strong>Business Central</strong> en <strong>Microsoft 365</strong>-implementaties te verbeteren. Ze helpen bedrijven hun processen te stroomlijnen, productiviteit te verhogen en concurrentievoordeel te versterken. <em>Optimaliseer uw bedrijfsprocessen met Return.</em>
              </p>
              <p className="mt-4 leading-relaxed text-brand-muted">
                <strong>Services:</strong> Spot consulting (strategische probleemoplossing voor Dataverse, Dynamics 365, M365), Support &amp; Maintenance voor Microsoft-technologieën, en projectbased solutions voor implementaties, migraties en maatwerk. Daarnaast publiceert Return add-ons op de Microsoft AppSource-marktplaats.
              </p>
              <p className="mt-4 leading-relaxed text-brand-muted">
                <strong>Oplossingen:</strong> CRM, Microsoft PowerApps, Dynamics 365, Digital Workplace, ERP (Business Central), Microsoft Power BI, AI (Copilot), Webshop, Academy. <em>Software oplossingen voor groot en klein</em> – Dynamics 365 voor grote spelers, PowerApps voor klein tot middelgrote organisaties.
              </p>
            </div>

            <div className="card-surface p-6 sm:p-8">
              <h3 className="eyebrow-label text-brand-purple">Ons DNA &amp; contact</h3>
              <p className="mt-4 leading-relaxed text-brand-muted">
                <strong>Efficiëntie:</strong> Return waardeert uw tijd en werkt gericht op resultaat en deadlines. Geen eindeloze discussies – ze begrijpen uw behoeften en leveren oplossingen die uw doelen ondersteunen.
              </p>
              <p className="mt-4 leading-relaxed text-brand-muted">
                <strong>Toegankelijk:</strong> Het team is bereikbaar en klaar om te helpen. Communicatie en ondersteuning staan centraal. <em>We do IT right.</em>
              </p>
              <p className="mt-4 text-brand-muted">
                Terbekehofdreef 24/4, 2610 Wilrijk, België ·{' '}
                <a href="mailto:info@return.be" className="font-semibold text-brand-blue hover:underline">info@return.be</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page relative pb-16 pt-10">
        <div className="poster-dots absolute right-4 top-0 h-24 w-28 opacity-40" aria-hidden="true" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Wat ik doe',
              text: 'Dagelijks deel ik concrete taken: featurewerk, bugfixes, meetings en technische beslissingen.',
            },
            {
              title: 'Wat ik leer',
              text: 'Per post beschrijf ik tools, frameworks en inzichten die ik tijdens mijn stage opdoe.',
            },
            {
              title: 'Waarom deze blog',
              text: 'Deze blog dient als bewijs en reflectie voor school, met een duidelijk overzicht van mijn stagegroei.',
            },
          ].map((item) => (
            <article key={item.title} className="card-surface p-6">
              <h3 className="text-xl font-semibold text-brand-navy">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-brand-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default LandingPage

