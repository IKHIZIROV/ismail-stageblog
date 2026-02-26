import PageHeader from '../components/PageHeader'
import postsData from '../data/posts.json'
import type { Post } from '../types/post'

const DUTCH_LOCALE = 'nl-BE'

type WeekGroup = {
  id: string
  title: string
  shortLabel: string
  posts: Post[]
}

const WEEKLY_RECAPS: Record<string, string[]> = {
  '2026-02-02': [
    'Dit was mijn eerste echte stageweek en ik heb in korte tijd enorm veel nieuwe info gekregen.',
    'Ik kreeg onboarding over Return, leerde hoe ze projecten aanpakken, en ben meteen gestart met de technische setup van een nieuw project van scratch.',
    'Doorheen de week heb ik zowel frontend als backend verder opgezet, inclusief routing, authenticatie en validatie, en ik kreeg ook mijn eerste code review-feedback die ik direct kon verwerken.',
    'Daarnaast waren er teammomenten zoals de weekly en monthly meeting, waardoor ik ook het ritme van het bedrijf beter begon te begrijpen.',
    'Kort samengevat: veel geleerd, veel gebouwd en een heel sterke start gemaakt.',
  ],
  '2026-02-09': [
    'Deze week draaide vooral rond verder bouwen op IHH en beter begrijpen hoe alles functioneel in elkaar zit.',
    'Omdat taken soms even op waren, heb ik tijd genomen om bestaande code te verfijnen en mijn werk kwalitatief sterker te maken.',
    'In meetings kreeg ik extra context over de volledige flow van het project, waardoor ik gerichter kon verderwerken aan onder andere donations.',
    'Er zat ook een persoonlijke highlight in met de programmeerwedstrijd, gevolgd door een vlotte terugkeer naar kantoorwerk.',
    'De week sloot af met een fijne combinatie van inhoudelijke progressie, teamoverleg en een AI-gesprek over tools en vibecoding.',
  ],
  '2026-02-16': [
    'In deze week lag de focus op Qurban Management en op leren werken met Power Platform in de praktijk.',
    'Ik heb stap voor stap de UI-structuur en flow verder uitgewerkt en tegelijk tijdens de sessies met Mucahid geleerd hoe environments, solutions, forms en views effectief gebruikt worden.',
    'Er waren ook momenten waarop ik vastzat, maar met voorbeeldcode en feedback kon ik telkens weer verder en sneller beslissingen nemen.',
    'Tegen het einde van de week had ik duidelijk zicht op wat al stond en wat nog in de achterliggende logica moest gebeuren.',
    'Dit was een van de meest leerrijke weken tot nu toe, vooral omdat theorie en praktijk mooi samenkwamen.',
  ],
  '2026-02-23': [
    'Ook met minder nieuwe tickets bleef deze week productief en gefocust.',
    'Ik heb bewust tijd gestoken in het uitwerken van de Qurban-flow, kleine verbeteringen doorgevoerd en feedback op oudere pull requests afgewerkt.',
    'De thuiswerkdag gaf extra concentratie, waardoor ik merkbaar meer kon afronden op korte tijd.',
    'Door die combinatie van planning, afwerking en focus voelde de voortgang heel stabiel.',
    'Deze week bevestigde voor mij dat je ook zonder volle backlog veel waarde kan leveren door slim te blijven itereren.',
  ],
}

function parsePostIdToDate(id: string) {
  const [year, month, day] = id.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatDateLong(date: Date) {
  return new Intl.DateTimeFormat(DUTCH_LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatDateShort(date: Date) {
  return new Intl.DateTimeFormat(DUTCH_LOCALE, {
    day: 'numeric',
    month: 'short',
  }).format(date)
}

function formatDateId(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getWeekStart(date: Date) {
  const mondayOffset = (date.getDay() + 6) % 7
  const monday = new Date(date)
  monday.setDate(date.getDate() - mondayOffset)
  return monday
}

function getWeeklyRecap(group: WeekGroup): string[] {
  const presetRecap = WEEKLY_RECAPS[group.id]
  if (presetRecap) return presetRecap

  const highlights = group.posts
    .slice(0, 2)
    .map((post) => post.title.toLowerCase())
    .join(' en ')

  if (highlights.length === 0) {
    return ['Deze week heb ik verder gewerkt aan mijn stageproject en stap voor stap vooruitgang geboekt.']
  }

  return [
    `Deze week draaide vooral rond ${highlights}.`,
    'Ik heb verder gebouwd, bijgeleerd en de basis gelegd voor de volgende stappen.',
  ]
}

const posts = [...(postsData as Post[])].sort(
  (a, b) => parsePostIdToDate(b.id).getTime() - parsePostIdToDate(a.id).getTime(),
)

const weekGroups = posts.reduce<WeekGroup[]>((groups, post) => {
  const postDate = parsePostIdToDate(post.id)
  const weekStart = getWeekStart(postDate)
  const weekId = formatDateId(weekStart)
  const existingGroup = groups.find((group) => group.id === weekId)

  if (existingGroup) {
    existingGroup.posts.push(post)
    return groups
  }

  groups.push({
    id: weekId,
    title: `Week van ${formatDateLong(weekStart)}`,
    shortLabel: `Week ${formatDateShort(weekStart)}`,
    posts: [post],
  })

  return groups
}, [])

const stageStartWeek = posts.length > 0
  ? getWeekStart(parsePostIdToDate(posts[posts.length - 1].id))
  : new Date()

function getWeekNumber(weekId: string): number {
  const weekDate = parsePostIdToDate(weekId)
  const diffMs = weekDate.getTime() - stageStartWeek.getTime()
  return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1
}

/** Bepaalt het dagnummer van een post (dag 1 = eerste stagedag). Posts staan op datum aflopend. */
function getDayNumber(postId: string): number {
  const index = posts.findIndex((p) => p.id === postId)
  return index === -1 ? 1 : posts.length - index
}

function BlogPage() {
  return (
    <>
      <PageHeader
        title="Stageblog voor mijn stage bij Return"
        subtitle="Welkom op mijn stageblog. Hier vindt u per week en per dag mijn taken, leerpunten en voortgang tijdens mijn stage bij Return."
        centered
      />

      <section className="container-page pb-16 pt-10">
        {posts.length === 0 ? (
          <div className="card-surface p-8 text-center">
            <h2 className="text-xl font-semibold text-brand-navy">Nog geen posts</h2>
            <p className="mt-2 text-slate-600">Voeg een item toe aan src/data/posts.json om je eerste blogpost te tonen.</p>
          </div>
        ) : (
          <div className="xl:grid xl:grid-cols-[224px_minmax(0,1fr)] xl:items-start xl:gap-8">
            <aside className="card-surface mb-8 p-4 xl:sticky xl:top-24 xl:mb-0">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-cyan">Snel Naar Week</h2>
              <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 xl:block xl:space-y-2 xl:overflow-visible xl:pb-0">
                {weekGroups.map((group) => (
                  <a
                    key={group.id}
                    href={`#week-${group.id}`}
                    className="inline-flex shrink-0 items-center rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-brand-navy xl:flex"
                  >
                    {group.shortLabel}
                    <span className="ml-2 text-xs text-slate-500">({group.posts.length})</span>
                  </a>
                ))}
              </nav>
            </aside>

            <div className="mx-auto w-full max-w-4xl space-y-10 sm:space-y-12 xl:max-w-none">
              {weekGroups.map((group) => (
                <section
                  key={group.id}
                  id={`week-${group.id}`}
                  className="space-y-6 scroll-mt-24"
                >
                  <header className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3">
                    <h3 className="text-xl font-semibold text-brand-navy">{group.title}</h3>
                  </header>

                  <article className="rounded-2xl border border-brand-cyan/30 bg-cyan-50 p-6 sm:p-8">
                    <div className="space-y-4">
                      <div className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan to-brand-dark px-4 text-center sm:h-52">
                        <span className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                          Weekly Recap {getWeekNumber(group.id)}
                        </span>
                      </div>
                      <div className="rounded-xl border border-cyan-100 bg-white/70 p-5 sm:p-6">
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand-cyan">Samenvatting van de week</p>
                        <div className="mt-4 space-y-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                          {getWeeklyRecap(group).map((paragraph, index) => (
                            <p key={`${group.id}-recap-${index}`}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>

                  <div className="space-y-6">
                    {group.posts.map((post) => {
                      const dayNumber = getDayNumber(post.id)
                      const customImages = post.images.filter(
                        (img) => img.trim().length > 0 && !img.includes('return-logo'),
                      )
                      const hasCustomImage = customImages.length > 0

                      return (
                        <article key={`${post.id}-full`} className="card-surface overflow-hidden">
                          <div className="flex h-44 border-b border-slate-200 bg-slate-50 sm:h-56">
                            <div className="flex shrink-0 items-center pl-6 sm:pl-8 md:min-w-[200px]">
                              <span className="text-6xl font-bold tracking-tight text-brand-cyan sm:text-7xl md:text-8xl">
                                Dag {dayNumber}
                              </span>
                            </div>
                            {hasCustomImage && (
                              <div className="relative flex-1 min-w-0 overflow-hidden rounded-r-2xl bg-white pr-0">
                                <img
                                  src={customImages[0]}
                                  alt=""
                                  className="h-full w-full object-contain object-right"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </div>

                          <div className="p-5 sm:p-6">
                            <p className="text-sm font-semibold uppercase tracking-wide text-brand-cyan">{post.date}</p>
                            <h2 className="mt-2 text-xl font-semibold text-brand-navy sm:text-2xl">{post.title}</h2>

                            <div className="mt-4 space-y-4 leading-relaxed text-slate-700">
                              {post.content.map((paragraph) => (
                                <p key={`${post.id}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default BlogPage
