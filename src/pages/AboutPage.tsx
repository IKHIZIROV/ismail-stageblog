import PageHeader from '../components/PageHeader'

function AboutPage() {
  return (
    <>
      <PageHeader
        title="Over mij"
        subtitle="Compacte cv met mijn profiel, opleiding, ervaring en technische skills."
      />

      <section className="container-page pb-16 pt-10">
        <div className="grid gap-8 xl:grid-cols-[1fr_1.4fr]">
          <aside className="card-surface p-6">
            <img
              src="/images/profile-pic.jpeg"
              alt="Profielfoto"
              className="h-64 w-full rounded-[1.25rem] border border-brand-navy/10 object-cover object-top sm:h-72"
            />
            <h2 className="mt-5 text-2xl font-semibold text-brand-navy">Ismail Khizirov</h2>
            <p className="mt-2 font-medium text-brand-muted">Graduate Programming Student - AP Hogeschool</p>
            <div className="mt-6 space-y-2 text-sm text-brand-muted">
              <p>Adres: Jan Moorkensstraat 12, 2600 Berchem</p>
              <p>Telefoon: 0471 65 04 47</p>
              <p>E-mail: ismailkhizirov@gmail.com</p>
              <p>
                LinkedIn:{' '}
                <a
                  href="https://www.linkedin.com/in/ismail-khizirov/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-blue hover:underline"
                >
                  linkedin.com/in/ismail-khizirov
                </a>
              </p>
              <p>
                GitHub:{' '}
                <a
                  href="https://github.com/IKHIZIROV"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-blue hover:underline"
                >
                  github.com/IKHIZIROV
                </a>
              </p>
            </div>
          </aside>

          <div className="space-y-6">
            <article className="card-surface p-6">
              <h3 className="text-xl font-semibold text-brand-navy">Profiel</h3>
              <p className="mt-4 leading-relaxed text-brand-muted">
                Ik ben een 21-jarige student Graduate Programming aan AP Hogeschool. Ik heb ervaring in .NET,
                webdevelopment en game development, en ik wil mijn technische skills verder verdiepen via
                praktijkgerichte projecten.
              </p>
            </article>

            <article className="card-surface p-6">
              <h3 className="text-xl font-semibold text-brand-navy">Opleiding</h3>
              <ul className="mt-4 space-y-2 text-brand-muted">
                <li><span className="font-semibold text-brand-navy">AP Hogeschool:</span> Graduate Programming (huidig, 2e jaar)</li>
                <li><span className="font-semibold text-brand-navy">AP Hogeschool:</span> Bachelor IT & Software (2 jaar, niet afgerond)</li>
                <li><span className="font-semibold text-brand-navy">Secundair:</span> Business Diploma</li>
              </ul>
            </article>

            <article className="card-surface p-6">
              <h3 className="text-xl font-semibold text-brand-navy">Werkervaring</h3>
              <ul className="mt-4 space-y-2 text-brand-muted">
                <li><span className="font-semibold text-brand-navy">Flora Carpets (2021 - september 2025):</span> Industrial Photography, IT-technician en Odoo web designer</li>
                <li><span className="font-semibold text-brand-navy">Quick Berchem Pulhof (2023 - 2024):</span> Student worker</li>
                <li><span className="font-semibold text-brand-navy">Greencare, Stad Mortsel (zomer 2022):</span> Student worker</li>
              </ul>
            </article>

            <article className="card-surface p-6">
              <h3 className="text-xl font-semibold text-brand-navy">Projecten & skills</h3>
              <ul className="mt-4 space-y-2 text-brand-muted">
                <li><span className="font-semibold text-brand-navy">Projecten:</span> UEFN (Verse), Roblox Studio (Luau), websites, JS-games en API-projecten</li>
                <li><span className="font-semibold text-brand-navy">Programmeertalen:</span> C#, JavaScript, TypeScript, HTML, CSS, SQL, Verse, Luau</li>
                <li><span className="font-semibold text-brand-navy">Frameworks & libraries:</span> React, Next.js, React Native, Node.js, Express.js, Hono, ASP.NET, TanStack Query, TanStack Router, Zod, Drizzle ORM</li>
                <li><span className="font-semibold text-brand-navy">Databases:</span> PostgreSQL, MongoDB</li>
                <li><span className="font-semibold text-brand-navy">DevOps & tools:</span> Git, GitHub, Azure DevOps, Docker, Docker Compose, Odoo, Postman, VS Code</li>
                <li><span className="font-semibold text-brand-navy">Testing:</span> Basiskennis van unit testing en end-to-end testing</li>
                <li><span className="font-semibold text-brand-navy">Talen:</span> Nederlands, Engels, Frans, Russisch, Tsjetsjeens, Turks en Duits</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage
