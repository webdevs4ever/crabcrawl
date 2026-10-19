import { useMemo, useState } from 'react'
import { Search, X, MapPin, Clock3, Sparkles, RotateCcw } from 'lucide-react'

const SOURCES = [
  { name: 'Baltimore Magazine', short: 'BaltMag' },
  { name: 'Baltimore Fishbowl', short: 'Fishbowl' },
  { name: 'Eating Baltimore', short: 'Eating Bmore' },
  { name: 'The Baltimore Banner', short: 'The Banner' },
]

const ARTICLES = [
  {
    id: 1,
    source: 'Baltimore Magazine',
    title: 'Where to Find Great Steamed Crabs Around Baltimore',
    dek: 'A neighborhood-first guide to mallets, brown paper, Old Bay, and the tables Baltimoreans swear by.',
    neighborhood: 'Baltimore City + County',
    read: '6 min',
    tags: ['steamed crabs', 'crab houses', 'old bay'],
  },
  {
    id: 2,
    source: 'Baltimore Fishbowl',
    title: 'Crab Cake Check: Five Local Spots Worth the Detour',
    dek: 'A quick look at jumbo-lump favorites, neighborhood institutions, and a few newer contenders.',
    neighborhood: 'Multiple neighborhoods',
    read: '4 min',
    tags: ['crab cakes', 'jumbo lump', 'restaurants'],
  },
  {
    id: 3,
    source: 'Eating Baltimore',
    title: 'The Baltimore Crab Feast Starter Pack',
    dek: 'What to order, what to bring, and how to build a table that feels unmistakably Baltimore.',
    neighborhood: 'Baltimore',
    read: '5 min',
    tags: ['crab feast', 'beer', 'sides'],
  },
  {
    id: 4,
    source: 'The Baltimore Banner',
    title: 'A Short List for Steamed Crabs, Crab Soup, and Everything In Between',
    dek: 'Beyond the bushel: dishes that put blue crab front and center.',
    neighborhood: 'Baltimore metro',
    read: '7 min',
    tags: ['crab soup', 'crab dip', 'food guide'],
  },
]

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

export default function App() {
  const [introVisible, setIntroVisible] = useState(true)
  const [query, setQuery] = useState('')
  const [activeSource, setActiveSource] = useState('All')
  const [selected, setSelected] = useState(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ARTICLES.filter((article) => {
      const sourceMatch = activeSource === 'All' || article.source === activeSource
      if (!sourceMatch) return false
      if (!q) return true
      const haystack = [article.title, article.dek, article.neighborhood, ...article.tags]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query, activeSource])

  const handleSearch = (event) => {
    event.preventDefault()
    const first = results[0] || ARTICLES[0]
    setSelected({ ...first, searchedFor: query || 'Baltimore blue crab' })
  }

  return (
    <main className="app-shell">
      <section className={`intro ${introVisible ? 'intro--visible' : 'intro--hidden'}`} aria-hidden={!introVisible}>
        <video
          autoPlay
          muted
          playsInline
          src="/crab-intro.mp4"
          onEnded={() => setIntroVisible(false)}
          className="intro__video"
        />
        <div className="intro__scrim" />
        <button className="intro__skip" onClick={() => setIntroVisible(false)}>
          Skip intro
        </button>
      </section>

      <section className={`landing ${introVisible ? '' : 'landing--ready'}`}>
        <div className="grain" />
        <header className="nav">
          <a className="brand" href="#top" aria-label="Crabwise Baltimore home">
            <span className="brand__mark">🦀</span>
            <span>CRABWISE</span>
          </a>
          <div className="nav__city"><MapPin size={15} /> Baltimore, MD</div>
        </header>

        <div className="hero" id="top">
          <div className="hero__eyebrow"><Sparkles size={15} /> Baltimore crab search, minus the tourist traps</div>
          <h1>Ask Baltimore<br /><span>anything crab.</span></h1>
          <p className="hero__lede">
            Search a curated set of local food sources for crab houses, crab cakes, steamed crabs,
            soups, dips, neighborhood picks, and the stories behind them.
          </p>

          <div className="search-stage">
            <form className="search" onSubmit={handleSearch}>
              <Search size={22} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “best crab cakes near Fells Point”"
                aria-label="Search crab-related Baltimore food coverage"
              />
              <button type="submit">Search</button>
            </form>

            {selected && (
              <article className="article-modal" role="dialog" aria-modal="false" aria-label="Article preview">
                <div className="article-modal__topline">
                  <span className="source-pill">{selected.source}</span>
                  <button className="icon-button" onClick={() => setSelected(null)} aria-label="Close article preview">
                    <X size={18} />
                  </button>
                </div>
                <p className="article-modal__kicker">Top result for “{selected.searchedFor}”</p>
                <h2>{selected.title}</h2>
                <div className="article-meta">
                  <span><MapPin size={14} /> {selected.neighborhood}</span>
                  <span><Clock3 size={14} /> {selected.read}</span>
                </div>
                <p>{lorem}</p>
                <p>{lorem}</p>
                <div className="article-modal__footer">
                  <span>Prototype article body • Lorem ipsum placeholder</span>
                  <button onClick={() => setSelected(null)}>Close preview</button>
                </div>
              </article>
            )}
          </div>

          <div className="source-row" aria-label="Food sources">
            <button
              className={`source-chip ${activeSource === 'All' ? 'source-chip--active' : ''}`}
              onClick={() => setActiveSource('All')}
            >
              All sources
            </button>
            {SOURCES.map((source) => (
              <button
                key={source.name}
                className={`source-chip ${activeSource === source.name ? 'source-chip--active' : ''}`}
                onClick={() => setActiveSource(source.name)}
              >
                {source.short}
              </button>
            ))}
          </div>

          <div className="results-head">
            <span>{results.length} local reads</span>
            <button className="replay" onClick={() => setIntroVisible(true)}><RotateCcw size={15}/> Replay crab intro</button>
          </div>

          <div className="cards">
            {results.map((article) => (
              <button
                className="article-card"
                key={article.id}
                onClick={() => setSelected({ ...article, searchedFor: query || 'Baltimore blue crab' })}
              >
                <div className="article-card__source">{article.source}</div>
                <h3>{article.title}</h3>
                <p>{article.dek}</p>
                <div className="article-card__meta">
                  <span>{article.neighborhood}</span>
                  <span>{article.read}</span>
                </div>
              </button>
            ))}
            {!results.length && (
              <div className="empty-state">No mock results yet. Try “crab cakes,” “steamed crabs,” “crab soup,” or switch back to All sources.</div>
            )}
          </div>
        </div>

        <footer>
          <span>Crabwise Baltimore — storyboard prototype</span>
          <span>Sources shown are editorial targets; search is mocked in this build.</span>
        </footer>
      </section>
    </main>
  )
}
