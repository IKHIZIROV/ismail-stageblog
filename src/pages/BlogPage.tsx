import { useMemo, useState } from 'react'
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

type WeeklyRecap = {
  category: string
  tags: string[]
  content: string[]
}

const WEEKLY_RECAPS: Record<string, WeeklyRecap> = {
  '2026-02-02': {
    category: 'code',
    tags: ["onboarding","setup","code","team"],
    content: [
    'Dit was mijn eerste echte stageweek en ik heb in korte tijd enorm veel nieuwe info gekregen.',
    'Ik kreeg onboarding over Return, leerde hoe ze projecten aanpakken, en ben meteen gestart met de technische setup van een nieuw project van scratch.',
    'Doorheen de week heb ik zowel frontend als backend verder opgezet, inclusief routing, authenticatie en validatie, en ik kreeg ook mijn eerste code review-feedback die ik direct kon verwerken.',
    'Daarnaast waren er teammomenten zoals de weekly en monthly meeting, waardoor ik ook het ritme van het bedrijf beter begon te begrijpen.',
    'Kort samengevat: veel geleerd, veel gebouwd en een heel sterke start gemaakt.',
    ],
  },
  '2026-02-09': {
    category: 'code',
    tags: ["ihh","code","lessons-learned","team"],
    content: [
    'Deze week draaide vooral rond verder bouwen op IHH en beter begrijpen hoe alles functioneel in elkaar zit.',
    'Omdat taken soms even op waren, heb ik tijd genomen om bestaande code te verfijnen en mijn werk kwalitatief sterker te maken.',
    'In meetings kreeg ik extra context over de volledige flow van het project, waardoor ik gerichter kon verderwerken aan onder andere donations.',
    'Er zat ook een persoonlijke highlight in met de programmeerwedstrijd, gevolgd door een vlotte terugkeer naar kantoorwerk.',
    'De week sloot af met een fijne combinatie van inhoudelijke progressie, teamoverleg en een AI-gesprek over tools en vibecoding.',
    ],
  },
  '2026-02-16': {
    category: 'power platform',
    tags: ["power-platform","ihh","learning","code"],
    content: [
    'In deze week lag de focus op Qurban Management en op leren werken met Power Platform in de praktijk.',
    'Ik heb stap voor stap de UI-structuur en flow verder uitgewerkt en tegelijk tijdens de sessies met Mucahid geleerd hoe environments, solutions, forms en views effectief gebruikt worden.',
    'Er waren ook momenten waarop ik vastzat, maar met voorbeeldcode en feedback kon ik telkens weer verder en sneller beslissingen nemen.',
    'Tegen het einde van de week had ik duidelijk zicht op wat al stond en wat nog in de achterliggende logica moest gebeuren.',
    'Dit was een van de meest leerrijke weken tot nu toe, vooral omdat theorie en praktijk mooi samenkwamen.',
    ],
  },
  '2026-02-23': {
    category: 'reflectie',
    tags: ["ihh","qurban","intervisie","planning"],
    content: [
    'Week 4 begon met minder nieuwe tickets in DevOps, maar ik ben wel gefocust blijven doorwerken op IHH.',
    'Ik heb de Qurban-flow verder uitgewerkt, open feedback van eerdere pull requests verwerkt en verschillende kleine verbeteringen doorgevoerd zodat alles consistenter werd.',
    'De thuiswerkdag gaf veel concentratie en zorgde ervoor dat ik in korte tijd merkbaar meer kon afwerken op het Qurban-gedeelte.',
    'Daarnaast had ik samen met Efekan een briefing over PortOfX, een logistiek templateproject waarvoor we een reeks DevOps-aanpassingen zullen doen zodra we extra uitleg krijgen.',
    'Tegelijk bleef ik afstemmen met Mucahid over de timing van IHH. Omdat de deadline dichterbij komt, is de focus nu: Qurban volledig afwerken en daarna strak doorpakken op de resterende logica.',
    'De week sloot af met mijn eerste intervisiemoment op school, waar ik met medestudenten en mijn stagebegeleider terugblikte op de eerste vier stageweken. Het was interessant om ervaringen te vergelijken en nieuwe inzichten mee te nemen.',
    ],
  },
  '2026-03-02': {
    category: 'reflectie',
    tags: ["ihh","focus","event","vooruitgang"],
    content: [
    'Week 5 was inhoudelijk rustiger, maar daarom niet nutteloos. Ik heb vooral verder gewerkt aan IHH en meerdere kleine stukjes opgeschoond, verbeterd en consistenter gemaakt.',
    'Er zaten geen grote nieuwe features of opvallende meetings in deze week, waardoor de focus vooral lag op rustig doorwerken en details afwerken.',
    'Halverwege de week was ik een dag afwezig omdat ik met vrienden naar Moving Forward in Antwerp Expo ging. Dat was interessant omdat ik daar andere bedrijven leerde kennen en al wat kon rondkijken naar opportuniteiten voor later.',
    'Na die onderbreking heb ik de draad gewoon weer opgepikt en verder gedaan waar ik gebleven was.',
    'Het was dus vooral een week van gestage vooruitgang: minder grote momenten, maar wel nuttig om het project verder te verfijnen.',
    ],
  },
  '2026-03-09': {
    category: 'code',
    tags: ["ihh","focus","vooruitgang","afwerking"],
    content: [
    'Week 6 verliep opnieuw rustig en draaide bijna volledig rond verder bouwen aan IHH.',
    'Deze week voelde meer als een lange reeks gefocuste werkdagen dan als een week vol meetings of grote gebeurtenissen, maar dat had ook zijn voordelen.',
    'Ik kon veel langer in hetzelfde werkritme blijven en zo kleine verbeteringen, afwerkingen en openstaande zaken stap voor stap aanpakken.',
    'Hoewel er inhoudelijk minder "grote" updates waren, merkte ik wel dat het project stabiel vooruitging.',
    'Dat maakte deze week minder opvallend, maar wel nuttig: gewoon consequent blijven werken en het project stukje bij beetje dichter bij afwerking brengen.',
    ],
  },
  '2026-03-16': {
    category: 'lessons learned',
    tags: ["ihh","feedback","mail","features"],
    content: [
    'Week 7 draaide opnieuw volledig rond IHH, maar deze keer met heel concrete feedback van Mucahid die het project eens grondig bekeek.',
    'Ik kreeg extra punten mee zoals nieuwe pagina\'s en een mailfeature, waardoor het project weer een stuk realistischer en completer werd. Voor dat mailgedeelte heb ik met Resend gewerkt, wat ook technisch interessant was.',
    'De rest van de week stond vooral in het teken van die nieuwe feedback verwerken, verder bouwen en zorgen dat alles proper in de bestaande flow paste.',
    'Het was geen week vol grote meetings, maar wel eentje waarin het project inhoudelijk sterker werd door gerichte verbeteringen.',
    'Je voelde duidelijk dat de focus steeds meer verschoof van "iets bouwen" naar "iets degelijk afwerken".',
    ],
  },
  '2026-03-23': {
    category: 'lessons learned',
    tags: ["ihh","demo","feedback","team"],
    content: [
    'Week 8 was een drukke en belangrijke week voor IHH, vooral omdat er meerdere feedbackmomenten en evaluaties samenkwamen.',
    'Het begon met een check-in van Mucahid over de status van het project, gevolgd door een demo waarin veel feedback en nieuwe todo\'s naar boven kwamen.',
    'Na die demo heb ik gericht gewerkt aan de belangrijkste opmerkingen, zoals de donor details-pagina en andere openstaande punten die snel aangepakt moesten worden.',
    'Tussendoor waren er ook bredere momenten buiten het project zelf: een teamlunch, voorbereiding op Power Automate, mijn tussentijdse evaluatie en de monthly connect met uitleg over Odoo.',
    'Deze week voelde intens, maar ook heel nuttig. Er kwam veel tegelijk op mij af, maar net daardoor kreeg ik een duidelijker beeld van wat nog moet gebeuren en waar ik al goed sta.',
    ],
  },
  '2026-03-30': {
    category: 'deployment',
    tags: ["ihh","demo","hosting","power-platform"],
    content: [
    'Week 9 voelde als een heel belangrijke week voor IHH, omdat het project nu echt meer naar buiten begon te komen.',
    'Ik heb eerst een demo voorbereid voor de verantwoordelijke van IHH, tussendoor nog een klantofferte nagekeken met foute berekeningen, en daarna de applicatie tijdelijk gehost zodat de demo vlot kon doorgaan.',
    'De meeting zelf verliep sterk: de klant was tevreden, er kwam bruikbare feedback uit, en tegelijk werd het project ook technisch steeds serieuzer door de discussies rond hosting en deployment.',
    'Later in de week heb ik IHH eerst op Vercel en Neon gezet en daarna opnieuw moeten verhuizen naar Railway, waar uiteindelijk de testomgeving live stond op een eigen domein.',
    'Daarnaast bleef ook de Power Platform-opleiding verderlopen met Power Automate, web resources en de eerste theoretische introducties rond plugins. Het was dus een week met veel context switches, maar wel een week waar ik veel van heb geleerd.',
    ],
  },
  '2026-04-06': {
    category: 'power platform',
    tags: ["plugins","ihh","familiehulp","learning"],
    content: [
    'Week 10 begon rustig met Paasmaandag, maar werd daarna meteen een week van nieuwe technologie en nieuwe klanten.',
    'Op IHH verwerkte ik nog extra testfeedback, zoals nieuwe velden voor general donations, en tegelijk leerde ik via Talha steeds meer over plugins, XrmToolBox en early-bound werken.',
    'Daarna kwam er meteen een nieuwe uitdaging bij: mijn eerste echte plugin-opdracht voor Universiteit Antwerpen. Dat ging nog niet vlot, omdat ik tegelijk moest zoeken naar de juiste repo, de juiste binding-aanpak en de nodige toegangen.',
    'Alsof dat nog niet genoeg was, werd ik daarna ook toegewezen aan een nieuwe klant, Familiehulp, waar ik twee dagen per week plugins zal bouwen.',
    'Deze week voelde dus als een echte overgangsweek: IHH liep nog door, maar tegelijk begon ik al duidelijk de overstap te maken naar een nieuwe fase met meer pluginwerk en meerdere klanten.',
    ],
  },
  '2026-04-13': {
    category: 'klantwerk',
    tags: ["familiehulp","plugins","testing","wins"],
    content: [
    'Week 11 draaide bijna volledig rond een grote en technisch best zware plugin-opdracht voor Familiehulp.',
    'In het begin had ik nog hulp nodig van Ibo voor zaken zoals early-bound generatie en de algemene setup, maar daarna kon ik de plugin steeds zelfstandiger verder uitwerken.',
    'Gaandeweg werd duidelijk hoe groot en complex de opdracht eigenlijk was. Net daardoor was het extra sterk dat Mucahid en Talha op het einde tevreden waren over zowel mijn aanpak als mijn code.',
    'De week eindigde met grondige testing, een push naar de branch en daarnaast ook nog een informatieve workshop over AI en AI-tools.',
    'Voor mij voelde dit als een belangrijke week, omdat ik hier duidelijk merkte dat ik technisch gegroeid ben en moeilijkere taken beter begin te beheersen.',
    ],
  },
  '2026-04-20': {
    category: 'klantwerk',
    tags: ["ggz","familiehulp","ihh","contextswitch"],
    content: [
    'Week 12 was opnieuw erg afwisselend, met werk voor meerdere klanten door elkaar.',
    'Ik moest snel schakelen tussen GGZ, IHH en Familiehulp: een custom portal aanpassen en hosten voor een dringende demo, nieuwe donation-logica uitwerken in IHH, en tegelijk meerdere plugins voor Familiehulp bouwen en testen.',
    'Vooral die contextswitches maakten de week intens, maar ook leerrijk. Ik merkte dat ik steeds sneller kon overschakelen tussen verschillende codebasissen en verschillende soorten opdrachten.',
    'Tussendoor waren er ook weer vaste teammomenten zoals de weekly meeting en de Monthly Connect, waar codekwaliteit en AI-gebruik opnieuw sterk benadrukt werden.',
    'Deze week voelde druk, maar tegelijk ook als een bewijs dat ik stilaan met meer verantwoordelijkheid en meerdere parallelle taken kan omgaan.',
    ],
  },
  '2026-04-27': {
    category: 'klantwerk',
    tags: ["familiehulp","ihh","testing","focus"],
    content: [
    'Week 13 begon met het afronden van de laatste plugin voor Familiehulp en schakelde daarna weer meer terug naar IHH.',
    'De plugin-testing was technisch lastig, vooral omdat ik via API-calls en read-only velden moest controleren of alles juist werkte, maar uiteindelijk kreeg ik ook dat laatste stuk afgewerkt.',
    'Daarna heb ik opnieuw focus gelegd op IHH door feedback verder te verwerken, features af te ronden en de testomgeving bij te werken.',
    'Later in de week kwam er alweer nieuw pluginwerk voor Familiehulp bij, waarbij ik hulp kreeg van Ibo en tegelijk ook bleef nadenken over hoe de code proper en herbruikbaar kon blijven.',
    'De week eindigde met een feestdag op vrijdag, waardoor het een wat kortere maar nog altijd goed gevulde werkweek was.',
    ],
  },
  '2026-05-04': {
    category: 'reflectie',
    tags: ["familiehulp","ihh","intervisie","weekly"],
    content: [
    'Week 14 draaide opnieuw rond schakelen tussen meerdere klanten, praktische opvolging en reflectie op mijn stage.',
    'Ik werkte verder aan Familiehulp en IHH, met aandacht voor import, hosting, productiechecks en kleine technische opvolgingen.',
    'Op vrijdag had ik ook een intervisiemoment op school. Daar merkte ik hoe verschillend stages kunnen zijn afhankelijk van sector, bedrijf en soort werk.',
    'Die vergelijking was nuttig, omdat ik mijn eigen traject bij Return daardoor beter kon plaatsen. Daarna ging ik opnieuw naar kantoor om mijn taken af te ronden en de weekly mee te volgen.',
    'Deze week voelde als een combinatie van doorwerken, terugblikken en stilaan afronden richting de laatste stagedagen.',
    ],
  },
  '2026-05-11': {
    category: 'wins',
    tags: ["familiehulp","webresources","custom-api","wins","reflectie"],
    content: [
    'De laatste stageweek bracht nog verrassend veel nieuwe Power Platform-concepten samen.',
    'Ik bouwde voor Familiehulp webresources, registreerde ze via XrmToolBox en kreeg opnieuw concrete feedback op mijn code. Vooral de fout rond een pre-image en een onnodige Retrieve() was een duidelijke les die ik zal onthouden.',
    'Daarna kreeg ik een grotere taak rond een custom API, een HTML webresource en uiteindelijk een custom process/action. Met uitleg van Turab en Talha kon ik dat stap voor stap begrijpen en werkend krijgen.',
    'De week eindigde rustig door de feestdag en mijn laatste stagedag, maar ook heel positief: ik mocht bij Return blijven als jobstudent en kreeg een bonus voor mijn werk bij Familiehulp.',
    'Het was een sterke afsluiter van mijn stage: veel geleerd, fouten gemaakt, beter geworden en uiteindelijk met vertrouwen verder kunnen gaan.',
    ],
  },
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
  if (presetRecap) return presetRecap.content

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

function getWeeklyCategory(group: WeekGroup) {
  return WEEKLY_RECAPS[group.id]?.category ?? group.posts[0]?.category ?? 'reflectie'
}

function getWeeklyTags(group: WeekGroup) {
  const presetTags = WEEKLY_RECAPS[group.id]?.tags ?? []
  if (presetTags.length > 0) return presetTags

  const postTags = group.posts.flatMap((post) => [post.category, ...post.tags])
  return Array.from(new Set(postTags)).filter(Boolean).slice(0, 6)
}

function normalizeFilterValue(value: string) {
  return value.trim().toLowerCase()
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

const categoryOptions = Array.from(
  new Set([...posts.map((post) => post.category), ...weekGroups.map((group) => getWeeklyCategory(group))]),
).sort((a, b) => a.localeCompare(b, DUTCH_LOCALE))

const tagOptions = Array.from(
  new Set([...posts.flatMap((post) => post.tags), ...weekGroups.flatMap((group) => getWeeklyTags(group))]),
).sort((a, b) => a.localeCompare(b, DUTCH_LOCALE))

function matchesPost(post: Post, searchQuery: string, category: string, tag: string) {
  const matchesCategory = category === 'all' || normalizeFilterValue(post.category) === category
  const normalizedTags = post.tags.map(normalizeFilterValue)
  const matchesTag = tag === 'all' || normalizedTags.includes(tag)
  const searchText = [post.title, post.date, post.excerpt, post.category, ...post.tags, ...post.content]
    .join(' ')
    .toLowerCase()

  return matchesCategory && matchesTag && searchText.includes(searchQuery)
}

function matchesWeeklyRecap(group: WeekGroup, searchQuery: string, category: string, tag: string) {
  const weeklyCategory = normalizeFilterValue(getWeeklyCategory(group))
  const weeklyTags = getWeeklyTags(group).map(normalizeFilterValue)
  const matchesCategory = category === 'all' || weeklyCategory === category
  const matchesTag = tag === 'all' || weeklyTags.includes(tag)
  const searchText = [
    group.title,
    `Weekly Recap ${getWeekNumber(group.id)}`,
    getWeeklyCategory(group),
    ...getWeeklyTags(group),
    ...getWeeklyRecap(group),
  ]
    .join(' ')
    .toLowerCase()

  return matchesCategory && matchesTag && searchText.includes(searchQuery)
}

function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTag, setActiveTag] = useState('all')

  const normalizedSearchQuery = normalizeFilterValue(searchQuery)
  const filteredWeekGroups = useMemo(
    () =>
      weekGroups
        .map((group) => {
          const showRecap = matchesWeeklyRecap(group, normalizedSearchQuery, activeCategory, activeTag)
          const filteredPosts = group.posts.filter((post) =>
            matchesPost(post, normalizedSearchQuery, activeCategory, activeTag),
          )

          return showRecap || filteredPosts.length > 0 ? { ...group, posts: filteredPosts, showRecap } : null
        })
        .filter((group): group is WeekGroup & { showRecap: boolean } => group !== null),
    [activeCategory, activeTag, normalizedSearchQuery],
  )
  const hasActiveFilters = searchQuery.length > 0 || activeCategory !== 'all' || activeTag !== 'all'

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
            <p className="mt-2 text-brand-muted">Voeg een item toe aan src/data/posts.json om je eerste blogpost te tonen.</p>
          </div>
        ) : (
          <>
            <div className="card-surface mb-8 p-5 sm:p-6">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px_auto] lg:items-end">
                <label className="block">
                  <span className="eyebrow-label text-brand-purple">Zoeken</span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Zoek op titel, inhoud, tags..."
                    className="mt-2 w-full rounded-2xl border border-brand-navy/10 bg-brand-cream px-4 py-3 text-sm font-semibold text-brand-navy outline-none transition placeholder:text-brand-muted/60 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </label>

                <label className="block">
                  <span className="eyebrow-label text-brand-blue">Categorie</span>
                  <select
                    value={activeCategory}
                    onChange={(event) => setActiveCategory(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-brand-navy/10 bg-brand-cream px-4 py-3 text-sm font-semibold text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  >
                    <option value="all">Alle categorieën</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={normalizeFilterValue(category)}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="eyebrow-label text-brand-coral">Tag</span>
                  <select
                    value={activeTag}
                    onChange={(event) => setActiveTag(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-brand-navy/10 bg-brand-cream px-4 py-3 text-sm font-semibold text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  >
                    <option value="all">Alle tags</option>
                    {tagOptions.map((tag) => (
                      <option key={tag} value={normalizeFilterValue(tag)}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('all')
                    setActiveTag('all')
                  }}
                  disabled={!hasActiveFilters}
                  className="btn-secondary disabled:pointer-events-none disabled:opacity-50"
                >
                  Reset
                </button>
              </div>
            </div>

            {filteredWeekGroups.length === 0 ? (
              <div className="card-surface p-8 text-center">
                <h2 className="text-xl font-semibold text-brand-navy">Geen resultaten</h2>
                <p className="mt-2 text-brand-muted">
                  Pas je zoekterm, categorie of tag aan om opnieuw blogposts te tonen.
                </p>
              </div>
            ) : (
          <div className="lg:grid lg:grid-cols-[208px_minmax(0,1fr)] lg:items-start lg:gap-8">
            <aside className="card-surface mb-8 p-4 lg:sticky lg:top-20 lg:mb-0 lg:self-start lg:p-3">
              <h2 className="eyebrow-label text-brand-blue lg:text-[0.65rem]">Snel Naar Week</h2>
              <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:mt-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
                {filteredWeekGroups.map((group) => (
                  <a
                    key={group.id}
                    href={`#week-${group.id}`}
                    className="inline-flex shrink-0 items-center rounded-2xl px-3 py-2 text-sm font-semibold text-brand-muted transition hover:bg-brand-sand hover:text-brand-navy lg:flex lg:justify-between lg:px-2.5 lg:py-1.5 lg:text-xs"
                  >
                    {group.shortLabel}
                    <span className="ml-2 text-xs text-brand-muted/70 lg:text-[0.7rem]">
                      ({group.posts.length + (group.showRecap ? 1 : 0)})
                    </span>
                  </a>
                ))}
              </nav>
            </aside>

            <div className="mx-auto w-full max-w-4xl space-y-10 sm:space-y-12 lg:max-w-none">
              {filteredWeekGroups.map((group) => (
                <section key={group.id} id={`week-${group.id}`} className="space-y-6 scroll-mt-24">
                  <header className="rounded-[1.25rem] border border-brand-navy/10 bg-brand-sand/70 px-4 py-3">
                    <h3 className="text-xl font-semibold text-brand-navy">{group.title}</h3>
                  </header>

                  {group.showRecap ? (
                  <article className="relative overflow-hidden rounded-[1.75rem] border border-brand-navy/10 bg-brand-paper/75 p-6 shadow-card sm:p-8">
                    <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-brand-teal/80" aria-hidden="true" />
                    <div
                      className="abstract-ribbon absolute -left-20 bottom-10 h-14 w-60 rotate-[8deg] bg-brand-purple/75"
                      aria-hidden="true"
                    />
                    <div className="space-y-4">
                      <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-[1.25rem] bg-brand-navy px-4 text-center sm:h-52">
                        <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-brand-coral" aria-hidden="true" />
                        <div
                          className="abstract-ribbon absolute -right-12 bottom-8 h-14 w-52 bg-brand-blue"
                          aria-hidden="true"
                        />
                        <span className="relative text-2xl font-bold leading-tight text-white sm:text-3xl">
                          Weekly Recap {getWeekNumber(group.id)}
                        </span>
                      </div>
                      <div className="rounded-[1.25rem] border border-brand-navy/10 bg-brand-cream/80 p-5 sm:p-6">
                        <p className="eyebrow-label text-brand-coral">Samenvatting van de week</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
                            {getWeeklyCategory(group)}
                          </span>
                          {getWeeklyTags(group).map((tag) => (
                            <span
                              key={`${group.id}-weekly-${tag}`}
                              className="rounded-full border border-brand-navy/10 bg-brand-paper px-3 py-1 text-xs font-semibold text-brand-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 space-y-3 text-base leading-relaxed text-brand-muted sm:text-lg">
                          {getWeeklyRecap(group).map((paragraph, index) => (
                            <p key={`${group.id}-recap-${index}`}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                  ) : null}

                  <div className="space-y-6">
                    {group.posts.map((post) => {
                      const dayNumber = getDayNumber(post.id)
                      const customImages = post.images.filter(
                        (img) => img.trim().length > 0 && !img.includes('return-logo'),
                      )
                      const hasCustomImage = customImages.length > 0

                      return (
                        <article key={`${post.id}-full`} className="card-surface overflow-hidden">
                          <div className="flex h-44 border-b border-brand-navy/10 bg-brand-sand/55 sm:h-56">
                            <div className="flex shrink-0 items-center pl-6 sm:pl-8 md:min-w-[200px]">
                              <span className="text-6xl font-bold tracking-tight text-brand-blue sm:text-7xl md:text-8xl">
                                Dag {dayNumber}
                              </span>
                            </div>
                            {hasCustomImage && (
                              <div className="relative min-w-0 flex-1 overflow-hidden rounded-r-[1.75rem] bg-brand-paper pr-0">
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
                            <p className="eyebrow-label text-brand-coral">{post.date}</p>
                            <h2 className="mt-2 text-xl font-semibold text-brand-navy sm:text-2xl">{post.title}</h2>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="rounded-full bg-brand-purple px-3 py-1 text-xs font-semibold text-white">
                                {post.category}
                              </span>
                              {post.tags.map((tag) => (
                                <span
                                  key={`${post.id}-${tag}`}
                                  className="rounded-full border border-brand-navy/10 bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-muted"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="mt-4 space-y-4 leading-relaxed text-brand-muted">
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
          </>
        )}
      </section>
    </>
  )
}

export default BlogPage
