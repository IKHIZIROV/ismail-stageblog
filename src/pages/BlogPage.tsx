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
    'Week 4 begon met minder nieuwe tickets in DevOps, maar ik ben wel gefocust blijven doorwerken op IHH.',
    'Ik heb de Qurban-flow verder uitgewerkt, open feedback van eerdere pull requests verwerkt en verschillende kleine verbeteringen doorgevoerd zodat alles consistenter werd.',
    'De thuiswerkdag gaf veel concentratie en zorgde ervoor dat ik in korte tijd merkbaar meer kon afwerken op het Qurban-gedeelte.',
    'Daarnaast had ik samen met Efekan een briefing over PortOfX, een logistiek templateproject waarvoor we een reeks DevOps-aanpassingen zullen doen zodra we extra uitleg krijgen.',
    'Tegelijk bleef ik afstemmen met Mucahid over de timing van IHH. Omdat de deadline dichterbij komt, is de focus nu: Qurban volledig afwerken en daarna strak doorpakken op de resterende logica.',
    'De week sloot af met mijn eerste intervisiemoment op school, waar ik met medestudenten en mijn stagebegeleider terugblikte op de eerste vier stageweken. Het was interessant om ervaringen te vergelijken en nieuwe inzichten mee te nemen.',
  ],
  '2026-03-02': [
    'Week 5 was inhoudelijk rustiger, maar daarom niet nutteloos. Ik heb vooral verder gewerkt aan IHH en meerdere kleine stukjes opgeschoond, verbeterd en consistenter gemaakt.',
    'Er zaten geen grote nieuwe features of opvallende meetings in deze week, waardoor de focus vooral lag op rustig doorwerken en details afwerken.',
    'Halverwege de week was ik een dag afwezig omdat ik met vrienden naar Moving Forward in Antwerp Expo ging. Dat was interessant omdat ik daar andere bedrijven leerde kennen en al wat kon rondkijken naar opportuniteiten voor later.',
    'Na die onderbreking heb ik de draad gewoon weer opgepikt en verder gedaan waar ik gebleven was.',
    'Het was dus vooral een week van gestage vooruitgang: minder grote momenten, maar wel nuttig om het project verder te verfijnen.',
  ],
  '2026-03-09': [
    'Week 6 verliep opnieuw rustig en draaide bijna volledig rond verder bouwen aan IHH.',
    'Deze week voelde meer als een lange reeks gefocuste werkdagen dan als een week vol meetings of grote gebeurtenissen, maar dat had ook zijn voordelen.',
    'Ik kon veel langer in hetzelfde werkritme blijven en zo kleine verbeteringen, afwerkingen en openstaande zaken stap voor stap aanpakken.',
    'Hoewel er inhoudelijk minder "grote" updates waren, merkte ik wel dat het project stabiel vooruitging.',
    'Dat maakte deze week minder opvallend, maar wel nuttig: gewoon consequent blijven werken en het project stukje bij beetje dichter bij afwerking brengen.',
  ],
  '2026-03-16': [
    'Week 7 draaide opnieuw volledig rond IHH, maar deze keer met heel concrete feedback van Mucahid die het project eens grondig bekeek.',
    'Ik kreeg extra punten mee zoals nieuwe pagina\'s en een mailfeature, waardoor het project weer een stuk realistischer en completer werd. Voor dat mailgedeelte heb ik met Resend gewerkt, wat ook technisch interessant was.',
    'De rest van de week stond vooral in het teken van die nieuwe feedback verwerken, verder bouwen en zorgen dat alles proper in de bestaande flow paste.',
    'Het was geen week vol grote meetings, maar wel eentje waarin het project inhoudelijk sterker werd door gerichte verbeteringen.',
    'Je voelde duidelijk dat de focus steeds meer verschoof van "iets bouwen" naar "iets degelijk afwerken".',
  ],
  '2026-03-23': [
    'Week 8 was een drukke en belangrijke week voor IHH, vooral omdat er meerdere feedbackmomenten en evaluaties samenkwamen.',
    'Het begon met een check-in van Mucahid over de status van het project, gevolgd door een demo waarin veel feedback en nieuwe todo\'s naar boven kwamen.',
    'Na die demo heb ik gericht gewerkt aan de belangrijkste opmerkingen, zoals de donor details-pagina en andere openstaande punten die snel aangepakt moesten worden.',
    'Tussendoor waren er ook bredere momenten buiten het project zelf: een teamlunch, voorbereiding op Power Automate, mijn tussentijdse evaluatie en de monthly connect met uitleg over Odoo.',
    'Deze week voelde intens, maar ook heel nuttig. Er kwam veel tegelijk op mij af, maar net daardoor kreeg ik een duidelijker beeld van wat nog moet gebeuren en waar ik al goed sta.',
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

const stageStartWeek =
  posts.length > 0 ? getWeekStart(parsePostIdToDate(posts[posts.length - 1].id)) : new Date()

function getWeekNumber(weekId: string): number {
  const weekDate = parsePostIdToDate(weekId)
  const diffMs = weekDate.getTime() - stageStartWeek.getTime()
  return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1
}

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
                <section key={group.id} id={`week-${group.id}`} className="space-y-6 scroll-mt-24">
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
                              <div className="relative min-w-0 flex-1 overflow-hidden rounded-r-2xl bg-white pr-0">
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
