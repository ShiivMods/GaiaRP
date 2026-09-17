import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  cults, factions, historyArchiveCategories, historyArchives, historyChapters, consciousSpecies, rmlZones, spatialBestiary, structuredFaiths, tabs, terrestrialBestiary,
} from './loreData'
import type { BestiaryType, DangerLevel, HistoryArchiveCategoryId, HistoryArchiveEntry, LoreInitialView, LorePageProps, LoreTab, ReligionKind, ReligionMode, ReligiousEntry, RmlZone, SpeciesMode } from './loreData'
export type { LoreInitialView } from './loreData'
import { DiscoveriesLore } from './DiscoveriesLore'


function initialState(view: LoreInitialView) {
  switch (view) {
    case 'history': return { tab: 'history' as LoreTab, detail: null as string | null, speciesMode: 'conscious' as SpeciesMode, bestiary: null as BestiaryType | null }
    case 'factions': return { tab: 'factions' as LoreTab, detail: null, speciesMode: 'conscious' as SpeciesMode, bestiary: null }
    case 'humanis': return { tab: 'factions' as LoreTab, detail: 'humanis', speciesMode: 'conscious' as SpeciesMode, bestiary: null }
    case 'species': return { tab: 'species' as LoreTab, detail: null, speciesMode: 'conscious' as SpeciesMode, bestiary: null }
    case 'humans': return { tab: 'species' as LoreTab, detail: 'humans', speciesMode: 'conscious' as SpeciesMode, bestiary: null }
    case 'fauna': return { tab: 'species' as LoreTab, detail: null, speciesMode: 'fauna' as SpeciesMode, bestiary: null }
    case 'fauna-terrestrial': return { tab: 'species' as LoreTab, detail: null, speciesMode: 'fauna' as SpeciesMode, bestiary: 'terrestrial' as BestiaryType }
    case 'fauna-spatial': return { tab: 'species' as LoreTab, detail: null, speciesMode: 'fauna' as SpeciesMode, bestiary: 'spatial' as BestiaryType }
    case 'religions': return { tab: 'religions' as LoreTab, detail: null, speciesMode: 'conscious' as SpeciesMode, bestiary: null }
    case 'discoveries': return { tab: 'discoveries' as LoreTab, detail: null, speciesMode: 'conscious' as SpeciesMode, bestiary: null }
    default: return { tab: 'history' as LoreTab, detail: null, speciesMode: 'conscious' as SpeciesMode, bestiary: null }
  }
}

export function LorePage({ initialView = 'history', onViewChange }: LorePageProps) {
  const initial = useMemo(() => initialState(initialView), [initialView])
  const [tab, setTab] = useState<LoreTab | null>(initial.tab)
  const [detail, setDetail] = useState<string | null>(initial.detail)
  const [speciesMode, setSpeciesMode] = useState<SpeciesMode>(initial.speciesMode)
  const [bestiary, setBestiary] = useState<BestiaryType | null>(initial.bestiary)
  const [religionMode, setReligionMode] = useState<ReligionMode>(null)
  const [religionDetail, setReligionDetail] = useState<ReligiousEntry | null>(null)
  const [rmlZone, setRmlZone] = useState<RmlZone | null>(null)
  const loreContentRef = useRef<HTMLDivElement | null>(null)

  const scrollLoreToTop = () => {
    requestAnimationFrame(() => {
      loreContentRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    })
  }

  const resetReligion = () => {
    setReligionMode(null)
    setReligionDetail(null)
    setRmlZone(null)
  }

  const selectTab = (nextTab: LoreTab) => {
    setTab(nextTab)
    setDetail(null)
    setBestiary(null)
    resetReligion()
    if (nextTab === 'species') setSpeciesMode('conscious')
    onViewChange?.(
      nextTab === 'history' ? 'history'
        : nextTab === 'factions' ? 'factions'
          : nextTab === 'species' ? 'species'
            : nextTab === 'religions' ? 'religions'
              : 'discoveries',
    )
  }

  const breadcrumb = useMemo(() => {
    if (!tab) return 'Page principale'
    if (tab === 'history') return 'Histoire Galactique'
    if (tab === 'factions') return detail === 'humanis' ? 'Factions > Humanis' : 'Factions'
    if (tab === 'species') {
      if (detail === 'humans') return 'Espèces > Humains'
      if (bestiary === 'terrestrial') return 'Espèces > Faune > Faune terrestre'
      if (bestiary === 'spatial') return 'Espèces > Faune > Faune spatiale'
      return speciesMode === 'fauna' ? 'Espèces > Faune' : 'Espèces > Conscientes'
    }
    if (tab === 'religions') {
      if (religionDetail) return `Religions > ${religionDetail.kind === 'structured' ? 'Fois structurées' : 'Cultes'} > ${religionDetail.name}`
      if (rmlZone) return `Rumeurs, Mythes & Légendes > ${rmlZone.name}`
      if (religionMode === 'structured') return 'Religions > Fois structurées'
      if (religionMode === 'cults') return 'Religions > Cultes'
      if (religionMode === 'rml') return 'Religions > Rumeurs, Mythes & Légendes'
      return 'Religions - Page par défaut'
    }
    return 'Découvertes et Technologies'
  }, [tab, detail, speciesMode, bestiary, religionMode, religionDetail, rmlZone])

  useEffect(() => {
    scrollLoreToTop()
  }, [tab, detail, speciesMode, bestiary, religionMode, religionDetail, rmlZone])

  return (
    <main className="lore-page">
      <section className="lore-shell">
        <div className="lore-page-title">
          <span>LORE</span>
          <strong>{breadcrumb}</strong>
        </div>

        <nav className="lore-tabs" aria-label="Sections du Lore">
          {tabs.map((item) => (
            <button key={item.id} className={tab === item.id ? 'active' : ''} onClick={() => selectTab(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="lore-content" ref={loreContentRef}>
          {!tab && <LoreLanding />}
          {tab === 'history' && <HistoryLore onNavigate={scrollLoreToTop} />}
          {tab === 'factions' && detail !== 'humanis' && <FactionDirectory onOpenHumanis={() => { setDetail('humanis'); onViewChange?.('humanis') }} />}
          {tab === 'factions' && detail === 'humanis' && (
            <HumanisDetail
              onBack={() => { setDetail(null); onViewChange?.('factions') }}
              onOpenHumans={() => { setTab('species'); setDetail('humans'); setSpeciesMode('conscious'); setBestiary(null); onViewChange?.('humans') }}
            />
          )}
          {tab === 'species' && detail !== 'humans' && !bestiary && (
            <SpeciesDirectory
              mode={speciesMode}
              onModeChange={(mode) => { setSpeciesMode(mode); setDetail(null); setBestiary(null) }}
              onOpenHumans={() => { setDetail('humans'); onViewChange?.('humans') }}
              onOpenBestiary={setBestiary}
            />
          )}
          {tab === 'species' && detail === 'humans' && (
            <HumansDetail
              onBack={() => { setDetail(null); setSpeciesMode('conscious'); onViewChange?.('species') }}
              onOpenHumanis={() => { setTab('factions'); setDetail('humanis'); setBestiary(null); onViewChange?.('humanis') }}
            />
          )}
          {tab === 'species' && bestiary && (
            <BestiaryPage type={bestiary} onBack={() => setBestiary(null)} />
          )}
          {tab === 'religions' && (
            <ReligionLore
              mode={religionMode}
              detail={religionDetail}
              zone={rmlZone}
              onSelectMode={(mode) => { setReligionMode(mode); setReligionDetail(null); setRmlZone(null) }}
              onOpenReligion={setReligionDetail}
              onBackReligion={() => setReligionDetail(null)}
              onOpenZone={setRmlZone}
              onBackZone={() => setRmlZone(null)}
              onBackMode={resetReligion}
            />
          )}
          {tab === 'discoveries' && <DiscoveriesLore />}
        </div>
      </section>
    </main>
  )
}

function LoreLanding() {
  return (
    <div className="lore-landing">
      <div className="lore-landing-mark">G</div>
      <h2>Archives de Gaïa</h2>
      <p>Le Lore rassemble les connaissances communes du forum : histoire galactique, factions, espèces, religions et découvertes.</p>
      <strong>Le Lore est régulièrement mis à jour.</strong>
    </div>
  )
}

const historyImportantEntities = [
  { label: 'Force Spatiale d’Humanis', target: 'faction:humanis-space-force' },
  { label: "Force Spatiale d'Humanis", target: 'faction:humanis-space-force' },
  { label: 'Nouvelles Guerres d’Indépendance', target: 'event:new-independence-wars' },
  { label: "Nouvelles Guerres d'Indépendance", target: 'event:new-independence-wars' },
  { label: 'Guerre d’Unification', target: 'event:unification-war' },
  { label: "Guerre d'Unification", target: 'event:unification-war' },
  { label: 'Directoire Humanis', target: 'institution:humanis-directorate' },
  { label: 'Projet Gaïa', target: 'project:gaia' },
  { label: 'Terra Invicta', target: 'ark:terra-invicta' },
  { label: 'Lucius Valen', target: 'archive:lucius-valen' },
  { label: 'Elias Kern', target: 'archive:elias-kern' },
  { label: 'Grand Vide', target: 'phenomenon:great-void' },
  { label: 'Vanguard', target: 'ark:vanguard' },
  { label: 'Exodus', target: 'ark:exodus' },
  { label: 'Orwell', target: 'ark:orwell' },
  { label: 'Aegis', target: 'ark:aegis' },
  { label: 'Humanis', target: 'faction:humanis' },
  { label: 'Vitrion', target: 'resource:vitrion' },
  { label: 'Redium', target: 'resource:redium' },
  { label: 'Hope', target: 'ark:hope' },
  { label: 'Noé', target: 'ark:noe' },
  { label: 'La Commission', target: 'archive:commission' },
  { label: 'Commission', target: 'archive:commission' },
  { label: 'Le Directoire', target: 'archive:directoire' },
  { label: 'Directoire', target: 'archive:directoire' },
  { label: 'Alecto', target: 'archive:alecto' },
  { label: 'Valen', target: 'dynasty:valen' },
  { label: 'Arven', target: 'dynasty:arven' },
  { label: 'Les Six', target: 'institution:the-six' },
].sort((a, b) => b.label.length - a.label.length)

const historyEntityRegex = new RegExp(`(${historyImportantEntities.map((entity) => entity.label.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')).join('|')})`, 'g')

function renderHistoryNames(value: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null
  let index = 0
  historyEntityRegex.lastIndex = 0

  while ((match = historyEntityRegex.exec(value)) !== null) {
    if (match.index > cursor) nodes.push(value.slice(cursor, match.index))
    const entity = historyImportantEntities.find((item) => item.label === match![0])
    nodes.push(
      <strong
        className="history-entity"
        data-lore-target={entity?.target}
        key={`${keyPrefix}-entity-${index++}`}
      >
        {match[0]}
      </strong>,
    )
    cursor = match.index + match[0].length
  }
  if (cursor < value.length) nodes.push(value.slice(cursor))
  return nodes
}

function renderHistoryInline(value: string, keyPrefix: string): ReactNode[] {
  const tokenRegex = /\*\*([\s\S]*?)\*\*/g
  const nodes: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null
  let index = 0

  while ((match = tokenRegex.exec(value)) !== null) {
    if (match.index > cursor) nodes.push(...renderHistoryNames(value.slice(cursor, match.index), `${keyPrefix}-plain-${index}`))
    nodes.push(<strong key={`${keyPrefix}-strong-${index++}`}>{match[1]}</strong>)
    cursor = match.index + match[0].length
  }
  if (cursor < value.length) nodes.push(...renderHistoryNames(value.slice(cursor), `${keyPrefix}-plain-end`))
  return nodes
}

type HistoryView = 'chronology' | 'archives'
type ArchiveCategoryFilter = 'all' | HistoryArchiveCategoryId

const importanceLabels = {
  optional: 'Optionnel',
  deep: 'Lore profond',
  essential: 'Essentiel',
} as const

function HistoryLore({ onNavigate }: { onNavigate: () => void }) {
  const [historyView, setHistoryView] = useState<HistoryView>('chronology')
  const [archiveId, setArchiveId] = useState<string | null>(null)
  const [archiveCategory, setArchiveCategory] = useState<ArchiveCategoryFilter>('all')
  const [archiveSearch, setArchiveSearch] = useState('')
  const [openChapter, setOpenChapter] = useState<string | null>(null)
  const [openPeriods, setOpenPeriods] = useState<Record<string, string | null>>({})
  const [openSubsections, setOpenSubsections] = useState<Record<string, string | null>>({})
  const [archiveEditMode, setArchiveEditMode] = useState(false)

  const togglePeriod = (chapterId: string, periodId: string) => {
    setOpenPeriods((current) => ({
      ...current,
      [chapterId]: current[chapterId] === periodId ? null : periodId,
    }))
  }

  const toggleSubsection = (periodId: string, subsectionId: string) => {
    setOpenSubsections((current) => ({
      ...current,
      [periodId]: current[periodId] === subsectionId ? null : subsectionId,
    }))
  }

  const selectedArchive = historyArchives.find((entry) => entry.id === archiveId) ?? null
  const selectedArchiveCategory = selectedArchive
    ? historyArchiveCategories.find((category) => category.id === selectedArchive.category) ?? null
    : null

  const archiveCounts = useMemo(() => {
    const counts = new Map<HistoryArchiveCategoryId, number>()
    historyArchiveCategories.forEach((category) => counts.set(category.id, 0))
    historyArchives.forEach((entry) => counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1))
    return counts
  }, [])

  const filteredArchives = useMemo(() => {
    const query = archiveSearch.trim().toLocaleLowerCase('fr')
    return historyArchives.filter((entry) => {
      if (archiveCategory !== 'all' && entry.category !== archiveCategory) return false
      if (!query) return true
      const haystack = [entry.name, entry.kind, entry.period, entry.summary, ...(entry.related ?? [])]
        .join(' ')
        .toLocaleLowerCase('fr')
      return haystack.includes(query)
    })
  }, [archiveCategory, archiveSearch])

  const activeCategory = archiveCategory === 'all'
    ? null
    : historyArchiveCategories.find((category) => category.id === archiveCategory) ?? null

  return (
    <div className="history-timeline">
      <header className="history-intro">
        <div>
          <span>CHRONOLOGIE HUMAINE</span>
          <h2>Histoire Galactique</h2>
        </div>
        <p>Chronologie générale de l’humanité et archives consacrées aux figures, événements et éléments historiques qui méritent une fiche dédiée.</p>
      </header>

      <nav className="history-secondary-tabs" aria-label="Histoire Galactique">
        <button
          className={historyView === 'chronology' ? 'active' : ''}
          onClick={() => { setHistoryView('chronology'); setArchiveId(null); onNavigate() }}
        >
          Chronologie
        </button>
        <button
          className={historyView === 'archives' ? 'active' : ''}
          onClick={() => { setHistoryView('archives'); setArchiveId(null); onNavigate() }}
        >
          Archives
        </button>
      </nav>

      {historyView === 'chronology' && (
        <>
          <div className="history-importance-legend" aria-label="Importance pour la compréhension du Lore">
            {(Object.keys(importanceLabels) as Array<keyof typeof importanceLabels>).map((level) => (
              <span key={level} className={`history-importance-item importance-${level}`}>
                <i aria-hidden="true" />
                {importanceLabels[level]}
              </span>
            ))}
          </div>

          <div className="history-major-list">
            {historyChapters.map((chapter) => {
              const chapterOpen = openChapter === chapter.id
              return (
                <section className={`history-major ${chapterOpen ? 'open' : ''}`} key={chapter.id}>
                  <button
                    className="history-major-head"
                    onClick={() => setOpenChapter(chapterOpen ? null : chapter.id)}
                    aria-expanded={chapterOpen}
                  >
                    <strong>{chapter.title}</strong>
                    <span className="history-toggle" aria-hidden="true">{chapterOpen ? '−' : '+'}</span>
                  </button>

                  {chapterOpen && (
                    <div className="history-major-body">
                      {chapter.periods.map((period) => {
                        const periodOpen = openPeriods[chapter.id] === period.id
                        const hasSubsections = Boolean(period.subsections?.length)
                        return (
                          <article className={`history-period importance-${period.importance} ${hasSubsections ? 'has-subsections' : 'simple'} ${periodOpen ? 'open' : ''}`} key={period.id}>
                            <button
                              className="history-period-head interactive"
                              onClick={() => togglePeriod(chapter.id, period.id)}
                              aria-expanded={periodOpen}
                            >
                              <span
                                className="history-period-mark"
                                title={importanceLabels[period.importance]}
                                aria-label={`Importance : ${importanceLabels[period.importance]}`}
                              />
                              <strong>{period.title}</strong>
                              <span className="history-period-toggle">{periodOpen ? 'Replier' : 'Déplier'}</span>
                            </button>

                            {periodOpen && (
                              <div className="history-period-content">
                                {period.paragraphs.length > 0 && (
                                  <div className="history-period-prose">
                                    {period.paragraphs.map((paragraph, paragraphIndex) => (
                                      <p key={`${period.id}-p-${paragraphIndex}`}>{renderHistoryInline(paragraph, `${period.id}-p-${paragraphIndex}`)}</p>
                                    ))}
                                  </div>
                                )}

                                {hasSubsections && (
                                  <div className="history-subsection-list">
                                    {period.subsections!.map((subsection) => {
                                      const subsectionOpen = openSubsections[period.id] === subsection.id
                                      return (
                                        <section className={`history-subsection ${subsectionOpen ? 'open' : ''}`} key={subsection.id}>
                                          <button
                                            className="history-subsection-head"
                                            onClick={() => toggleSubsection(period.id, subsection.id)}
                                            aria-expanded={subsectionOpen}
                                          >
                                            <h3>{subsection.title}</h3>
                                            <span>{subsectionOpen ? '−' : '+'}</span>
                                          </button>
                                          {subsectionOpen && (
                                            <div className="history-subsection-prose">
                                              {subsection.paragraphs.map((paragraph, paragraphIndex) => (
                                                <p key={`${subsection.id}-p-${paragraphIndex}`}>{renderHistoryInline(paragraph, `${subsection.id}-p-${paragraphIndex}`)}</p>
                                              ))}
                                            </div>
                                          )}
                                        </section>
                                      )
                                    })}
                                  </div>
                                )}

                                {period.concludingParagraphs && period.concludingParagraphs.length > 0 && (
                                  <div className="history-period-prose history-period-conclusion">
                                    {period.concludingParagraphs.map((paragraph, paragraphIndex) => (
                                      <p key={`${period.id}-end-${paragraphIndex}`}>{renderHistoryInline(paragraph, `${period.id}-end-${paragraphIndex}`)}</p>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </article>
                        )
                      })}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        </>
      )}

      {historyView === 'archives' && !selectedArchive && (
        <section className="history-archives">
          <div className="history-archives-head">
            <span>FICHES D’ARCHIVES</span>
            <h3>Archives historiques</h3>
            <p>Une encyclopédie interne pour les figures, événements, institutions et éléments historiques qui méritent d’être développés au-delà de la Chronologie. Sa lecture est purement optionnelle et uniquement dédiée à ceux qui veulent en apprendre plus sur le lore.</p>
          </div>

          <div className="history-archive-toolbar">
            <label className="history-archive-search">
              <span>Rechercher</span>
              <input
                type="search"
                value={archiveSearch}
                onChange={(event) => setArchiveSearch(event.target.value)}
                placeholder="Nom, événement, institution…"
              />
            </label>
          </div>

          <div className="history-archive-categories" aria-label="Catégories des Archives">
            <button
              className={archiveCategory === 'all' ? 'active' : ''}
              onClick={() => setArchiveCategory('all')}
            >
              <span>Toutes les archives</span>
              <small>{historyArchives.length}</small>
            </button>
            {historyArchiveCategories.map((category) => (
              <button
                key={category.id}
                className={archiveCategory === category.id ? 'active' : ''}
                onClick={() => setArchiveCategory(category.id)}
              >
                <span>{category.label}</span>
                <small>{archiveCounts.get(category.id) ?? 0}</small>
              </button>
            ))}
          </div>

          <div className="history-archive-section-head">
            <div>
              <span>{activeCategory ? activeCategory.label : 'Toutes les archives'}</span>
              <p>{activeCategory ? activeCategory.description : 'Parcourez l’ensemble des fiches publiées ou filtrez-les par catégorie.'}</p>
            </div>
            <strong>{filteredArchives.length} {filteredArchives.length > 1 ? 'fiches' : 'fiche'}</strong>
          </div>

          {filteredArchives.length > 0 ? (
            <div className="history-archive-list">
              {filteredArchives.map((entry) => (
                <button className="history-archive-card" key={entry.id} onClick={() => { setArchiveCategory(entry.category); setArchiveId(entry.id); setArchiveEditMode(false); onNavigate() }}>
                  <div className="history-archive-card-meta">
                    <span>{entry.kind}</span>
                    <small>{entry.period}</small>
                  </div>
                  <div className="history-archive-card-copy">
                    <strong>{entry.name}</strong>
                    <p>{entry.summary}</p>
                    {entry.related && entry.related.length > 0 && (
                      <div className="history-archive-card-tags" aria-label="Éléments liés">
                        {entry.related.slice(0, 4).map((item) => <i key={item}>{item}</i>)}
                      </div>
                    )}
                  </div>
                  <span className="history-archive-open" aria-hidden="true">Ouvrir</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="history-archive-empty">
              <strong>Aucune fiche publiée pour le moment.</strong>
              <span>La catégorie est prête à accueillir de nouvelles Archives.</span>
            </div>
          )}
        </section>
      )}

      {historyView === 'archives' && selectedArchive && (
        <article className="history-archive-detail">
          <button className="lore-back-button" onClick={() => { setArchiveId(null); setArchiveEditMode(false); onNavigate() }}>
            ← Retour à {selectedArchiveCategory?.label ?? 'Archives'}
          </button>

          <header className="history-archive-detail-head">
            <div>
              <span>{selectedArchive.kind}</span>
              <h3>{selectedArchive.name}</h3>
              <p>{selectedArchive.summary}</p>
            </div>
            <div className="history-archive-period">
              <small>Période</small>
              <strong>{selectedArchive.period}</strong>
            </div>
          </header>

          <div className="history-archive-detail-layout">
            <div className="history-archive-prose">
              {selectedArchive.paragraphs.map((paragraph, index) => (
                <p key={`${selectedArchive.id}-${index}`}>{renderHistoryInline(paragraph, `${selectedArchive.id}-${index}`)}</p>
              ))}
            </div>

            <aside className="history-archive-related">
              <div className="history-archive-admin-box">
                <button
                  type="button"
                  className={`history-archive-admin-toggle ${archiveEditMode ? 'active' : ''}`}
                  onClick={() => setArchiveEditMode((current) => !current)}
                >
                  {archiveEditMode ? 'Fermer le mode édition' : 'Mode édition'}
                </button>
                {archiveEditMode && (
                  <div className="history-archive-admin-actions">
                    <button type="button" disabled>Modifier l’archive</button>
                    <button type="button" disabled>Créer une archive</button>
                    <button type="button" disabled>Cacher / Afficher</button>
                    <button type="button" disabled>Créer une catégorie</button>
                  </div>
                )}
              </div>

              <ArchiveVisual entry={selectedArchive} />

              <span>REPÈRES</span>
              <dl>
                <div><dt>Catégorie</dt><dd>{selectedArchiveCategory?.label ?? selectedArchive.kind}</dd></div>
                <div><dt>Période</dt><dd>{selectedArchive.period}</dd></div>
              </dl>
              {selectedArchive.related && selectedArchive.related.length > 0 && (
                <div className="history-archive-related-links">
                  <strong>Éléments liés</strong>
                  {selectedArchive.related.map((item) => <span key={item}>{item}</span>)}
                </div>
              )}
            </aside>
          </div>
        </article>
      )}
    </div>
  )
}

function archiveInitials(value: string) {
  return value
    .replace(/['’]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? '')
    .join('')
}

function ArchiveVisual({ entry }: { entry: HistoryArchiveEntry }) {
  const initials = archiveInitials(entry.name)

  if (entry.image) {
    return (
      <figure className="history-archive-visual history-archive-visual-grand-avatar">
        <img src={entry.image} alt={entry.imageAlt ?? entry.name} />
      </figure>
    )
  }

  return (
    <div className="history-archive-visual history-archive-visual-placeholder" aria-label={`Illustration de ${entry.name}`}>
      <span>{initials}</span>
    </div>
  )
}

function FactionDirectory({ onOpenHumanis }: { onOpenHumanis: () => void }) {
  return (
    <div className="lore-card-grid faction-grid">
      {factions.map((faction, index) => (
        <button
          key={faction.id}
          className={`lore-poster-card faction-poster faction-poster-${index + 1} ${!faction.active ? 'placeholder' : ''}`}
          onClick={faction.active ? onOpenHumanis : undefined}
          disabled={!faction.active}
        >
          <span className="lore-poster-shade" />
          <strong>{faction.name}</strong>
          <small>{faction.subtitle}</small>
        </button>
      ))}
    </div>
  )
}

function HumanisDetail({ onBack, onOpenHumans }: { onBack: () => void; onOpenHumans: () => void }) {
  return (
    <article className="lore-detail-grid">
      <LoreIllustration label="Illustration Humanis" tall />
      <div className="lore-detail-main">
        <button className="lore-detail-back" onClick={onBack}>‹ Retour</button>
        <h2>Humanis</h2>
        <LoreTextSection title="Histoire">
          <p><strong>Jadis libérateurs, désormais une puissante administration aux habitudes autoritaires.</strong></p>
          <p>Pionniers de l’exploration et de la colonisation de <strong>Gaïa</strong>, l’on pourrait dire qu’<strong>Humanis</strong> représente aujourd’hui ce que l’Humain a toujours voulu au fond de lui : le contrôle, la richesse et la loyauté. Les lois y sont dures, mais elles s’y prétendent justes et surtout nécessaires pour ne pas répéter les erreurs du passé. Du moins, c’est ce que vous dira un politicien qui ne veut pas perdre sa précieuse place. La vérité est légèrement différente : la loi est juste tant qu’elle profite à <strong>la Commission</strong>.</p>
          <p>Héritière des <strong>Six</strong> et du <strong>Directoire</strong>, <strong>la Commission</strong> a ses yeux et ses oreilles absolument partout. Et si vous savez quelque chose qu’elle ne sait pas, il vaudrait mieux pour vous qu’il s’agisse uniquement de la recette que votre grand-mère préférée vous a léguée. La Commission ne tolère ni les agitateurs, ni les inactifs. Vous êtes en âge de travailler ? Alors faites-le.</p>
          <p>Certains diraient qu’Humanis n’a plus rien à voir avec ce qu’elle était et que les années dans le <strong>Grand Vide</strong> ont fait perdre la tête à leurs ancêtres. D’autres estiment au contraire qu’il ne s’agit que de l’évolution naturelle d’une humanité déjà en quête de contrôle au temps du <strong>Système Solaire</strong>, et que l’errance n’a fait qu’accentuer cette tendance. Au sein des <strong>Arches</strong>, les noms ont retrouvé leur importance d’antan : l’on parle à nouveau de dynasties.</p>
          <p>Vivre au sein d’Humanis signifie donc respecter scrupuleusement chacune de ses lois. Ceux qui les transgressent sont rapidement appréhendés, même pour de simples méfaits. Les criminels en tout genre sont ensuite envoyés vers <strong>Alecto</strong>, où ils exercent les métiers les plus dangereux dans les mines de <strong>Redium</strong>.</p>
        </LoreTextSection>
        <LoreTextSection title="Religion" divided>
          <p>L’État se revendique athée depuis bien avant l’Exil. Depuis ce dernier, de nouvelles croyances ont toutefois vu le jour au sein de la population.</p>
        </LoreTextSection>
      </div>
      <aside className="lore-detail-aside">
        <section>
          <h3>Espèce prédominante</h3>
          <button className="lore-crosslink" onClick={onOpenHumans}>Humains</button>
        </section>
        <section>
          <h3>Intérêts de la faction</h3>
          <p>Humanis cherche à étendre son influence à travers la galaxie, qui regorge de richesses à exploiter.</p>
          <p>Humanis est très administratif. Il n’a rien qui ne soit consigné dans ses archives.</p>
          <p>La faction récompense généreusement les citoyens les plus fidèles et productifs, mais se montre bien plus dure envers les hors-la-loi et les marginaux.</p>
        </section>
      </aside>
    </article>
  )
}

function SpeciesDirectory({
  mode,
  onModeChange,
  onOpenHumans,
  onOpenBestiary,
}: {
  mode: SpeciesMode
  onModeChange: (mode: SpeciesMode) => void
  onOpenHumans: () => void
  onOpenBestiary: (type: BestiaryType) => void
}) {
  return (
    <div className="species-directory">
      <div className="lore-subtabs">
        <button className={mode === 'conscious' ? 'active' : ''} onClick={() => onModeChange('conscious')}>Conscientes</button>
        <button className={mode === 'fauna' ? 'active' : ''} onClick={() => onModeChange('fauna')}>Faune</button>
      </div>

      {mode === 'conscious' ? (
        <div className="lore-card-grid species-grid">
          {consciousSpecies.map((species, index) => (
            <button
              key={species.id}
              className={`lore-poster-card species-poster species-poster-${index + 1} ${species.id !== 'humans' ? 'placeholder' : ''}`}
              onClick={species.id === 'humans' ? onOpenHumans : undefined}
              disabled={species.id !== 'humans'}
            >
              <span className="lore-poster-shade" />
              <strong>{species.name}</strong>
              <small>{species.subtitle}</small>
            </button>
          ))}
        </div>
      ) : (
        <div className="fauna-choice-grid">
          <button className="fauna-choice terrestrial" onClick={() => onOpenBestiary('terrestrial')}>
            <span>BESTIAIRE</span>
            <strong>Terrestre</strong>
            <small>Faune observée sur les mondes et habitats</small>
          </button>
          <button className="fauna-choice spatial" onClick={() => onOpenBestiary('spatial')}>
            <span>BESTIAIRE</span>
            <strong>Spatial</strong>
            <small>Faune rencontrée dans le vide et ses anomalies</small>
          </button>
        </div>
      )}
    </div>
  )
}

function HumansDetail({ onBack, onOpenHumanis }: { onBack: () => void; onOpenHumanis: () => void }) {
  return (
    <article className="lore-detail-grid">
      <LoreIllustration label="Illustration Humains" tall />
      <div className="lore-detail-main">
        <button className="lore-detail-back" onClick={onBack}>‹ Retour</button>
        <h2>Humains</h2>
        <LoreTextSection title="Histoire">
          <p>Le contenu historique complet de l’humanité sera ajouté lors de la rédaction finale du Lore.</p>
          <p>Cette fiche sert déjà de modèle pour les autres espèces conscientes.</p>
        </LoreTextSection>
        <LoreTextSection title="Religion" divided>
          <p>Bien qu’issus d’un État athée, les humains dispersés dans Gaïa suivent diverses croyances. La majorité de la population reste toutefois agnostique.</p>
        </LoreTextSection>
      </div>
      <aside className="lore-detail-aside">
        <section>
          <h3>Présents au sein de</h3>
          <div className="lore-link-list">
            <button className="lore-crosslink" onClick={onOpenHumanis}>Humanis</button>
            <span>Faction 2</span>
            <span>Faction 3</span>
          </div>
        </section>
        <section>
          <h3>Particularités</h3>
          <p>Les humains sont très doués pour s’adapter, y compris en milieu hostile.</p>
          <p>La grande majorité possède un besoin inné de sociabiliser.</p>
          <p>Ils sont sujets à divers besoins physiologiques comme boire, manger ou dormir.</p>
          <p>Les caractères diffèrent trop selon les individus pour permettre une observation générale.</p>
        </section>
      </aside>
    </article>
  )
}

function BestiaryPage({ type, onBack }: { type: BestiaryType; onBack: () => void }) {
  const categories = type === 'terrestrial' ? terrestrialBestiary : spatialBestiary
  const [openCategory, setOpenCategory] = useState<string | null>('predators')
  const title = type === 'terrestrial' ? 'Faune terrestre' : 'Faune spatiale'

  return (
    <div className="bestiary-page">
      <div className="bestiary-title-row">
        <button className="bestiary-back" onClick={onBack}>‹ Retour</button>
        <h2>{title}</h2>
      </div>
      <div className="lore-accordion bestiary-accordion">
        {categories.map((category) => {
          const open = openCategory === category.id
          return (
            <section className={`bestiary-category ${open ? 'open' : ''}`} key={category.id}>
              <button className="lore-accordion-head" onClick={() => setOpenCategory(open ? null : category.id)}>
                <span className="lore-arrow" aria-hidden="true">{open ? '⌄' : '⌃'}</span>
                <strong>{category.label}</strong>
              </button>
              {open && (
                <div className="bestiary-list">
                  {category.creatures.map((creature) => (
                    <article className="bestiary-entry" key={creature.id}>
                      <LoreIllustration label="Illustration" compact />
                      <div className="bestiary-copy">
                        <h3>{creature.name}</h3>
                        <p>{creature.description}</p>
                      </div>
                      <div className="bestiary-habitats">
                        <strong>Habitats connus</strong>
                        {creature.habitats.map((habitat) => <span key={habitat}>{habitat}</span>)}
                      </div>
                      <div className={`danger-badge danger-${dangerClass(creature.danger)}`}>
                        <span>Niveau de danger</span>
                        <strong>{creature.danger}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

function ReligionLore({
  mode,
  detail,
  zone,
  onSelectMode,
  onOpenReligion,
  onBackReligion,
  onOpenZone,
  onBackZone,
  onBackMode,
}: {
  mode: ReligionMode
  detail: ReligiousEntry | null
  zone: RmlZone | null
  onSelectMode: (mode: Exclude<ReligionMode, null>) => void
  onOpenReligion: (entry: ReligiousEntry) => void
  onBackReligion: () => void
  onOpenZone: (zone: RmlZone) => void
  onBackZone: () => void
  onBackMode: () => void
}) {
  if (detail) return <ReligionDetail entry={detail} onBack={onBackReligion} />
  if (zone) return <RmlZonePage zone={zone} onBack={onBackZone} />
  if (mode === 'structured') return <ReligionDirectory kind="structured" entries={structuredFaiths} onOpen={onOpenReligion} onBack={onBackMode} />
  if (mode === 'cults') return <ReligionDirectory kind="cults" entries={cults} onOpen={onOpenReligion} onBack={onBackMode} />
  if (mode === 'rml') return <RmlMap onOpenZone={onOpenZone} onBack={onBackMode} />

  return (
    <div className="religion-home">
      <div className="religion-subtabs">
        <button onClick={() => onSelectMode('structured')}>Fois structurées</button>
        <button onClick={() => onSelectMode('cults')}>Cultes</button>
        <button onClick={() => onSelectMode('rml')}>Rumeurs, Mythes & Légendes</button>
      </div>
      <div className="religion-intro">
        <h2>Religions, croyances et récits</h2>
        <div className="religion-intro-grid">
          <section>
            <h3>Fois structurées</h3>
            <p>Religions disposant d’une doctrine durable, de rites codifiés et, selon les cas, d’un clergé ou d’institutions identifiables.</p>
          </section>
          <section>
            <h3>Cultes</h3>
            <p>Groupes plus locaux, marginaux ou clandestins, souvent centrés sur une entité, un prophète, un phénomène ou une pratique particulière.</p>
          </section>
          <section>
            <h3>Rumeurs, Mythes & Légendes</h3>
            <p>Récits incertains, traditions populaires et histoires transmises dans différentes régions de la galaxie, sans validation officielle de leur véracité.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

function ReligionDirectory({ kind, entries, onOpen, onBack }: { kind: ReligionKind; entries: ReligiousEntry[]; onOpen: (entry: ReligiousEntry) => void; onBack: () => void }) {
  const title = kind === 'structured' ? 'Fois structurées' : 'Cultes'
  return (
    <div className="religion-directory">
      <div className="religion-section-header">
        <button className="lore-section-back" onClick={onBack}>‹ Retour</button>
        <div className="religion-section-title">{title}</div>
      </div>
      <div className="religion-card-grid">
        {entries.map((entry, index) => (
          <button className={`religion-card religion-card-${index + 1}`} key={entry.id} onClick={() => onOpen(entry)}>
            <span className="lore-poster-shade" />
            <strong>{entry.name}</strong>
            <small>{entry.subtitle}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

function ReligionDetail({ entry, onBack }: { entry: ReligiousEntry; onBack: () => void }) {
  return (
    <article className="religion-detail-grid">
      <LoreIllustration label="Illustration religion" tall />
      <div className="religion-detail-main">
        <button className="religion-detail-back" onClick={onBack}>‹ Retour</button>
        <h2>{entry.name}</h2>
        <LoreTextSection title="Origine">
          <p>{entry.origin}</p>
        </LoreTextSection>
        <LoreTextSection title="Principes" divided>
          <p>{entry.principles}</p>
        </LoreTextSection>
      </div>
      <aside className="religion-detail-aside">
        <section>
          <h3>Chef religieux</h3>
          {entry.leader ? (
            <div className="religion-leader">
              <div className="religion-leader-avatar">?</div>
              <span>{entry.leader}</span>
            </div>
          ) : <p>Aucun chef religieux reconnu.</p>}
        </section>
        <section>
          <h3>Lieux de culte</h3>
          <ul>{entry.worshipPlaces.map((place) => <li key={place}>{place}</li>)}</ul>
        </section>
        <section>
          <h3>Vertus & Péchés</h3>
          <div className="religion-values">
            <div><strong>Vertus</strong>{entry.virtues.map((value) => <span key={value}>{value}</span>)}</div>
            <div><strong>Péchés</strong>{entry.sins.map((value) => <span key={value}>{value}</span>)}</div>
          </div>
        </section>
      </aside>
    </article>
  )
}

function RmlMap({ onOpenZone, onBack }: { onOpenZone: (zone: RmlZone) => void; onBack: () => void }) {
  return (
    <div className="rml-page">
      <div className="religion-section-header">
        <button className="lore-section-back" onClick={onBack}>‹ Retour</button>
        <div className="religion-section-title">Rumeurs, Mythes & Légendes</div>
      </div>
      <div className="rml-stage">
        <div className="rml-galaxy" aria-label="Carte des rumeurs, mythes et légendes">
          <span className="rml-map-label">Représentation de la galaxie</span>
          {rmlZones.map((zone) => (
            <button
              key={zone.id}
              className={`rml-zone rml-zone-${zone.density}`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              onClick={() => onOpenZone(zone)}
              title={`${zone.name} - densité ${zone.density}`}
            >
              <span>{zone.name}</span>
            </button>
          ))}
        </div>
        <aside className="rml-legend">
          <h3>Densité des récits</h3>
          <p>La taille d’un cercle représente la quantité de rumeurs, mythes et légendes répertoriés dans la zone correspondante.</p>
          <div><i className="legend-dot small" />Faible</div>
          <div><i className="legend-dot medium" />Moyenne</div>
          <div><i className="legend-dot large" />Forte</div>
        </aside>
      </div>
    </div>
  )
}

function RmlZonePage({ zone, onBack }: { zone: RmlZone; onBack: () => void }) {
  const [rumorsOpen, setRumorsOpen] = useState(true)
  const [mythsOpen, setMythsOpen] = useState(true)

  return (
    <div className="rml-zone-page">
      <div className="rml-zone-title">
        <button onClick={onBack}>‹ Retour à la carte</button>
        <h2>{zone.name}</h2>
      </div>

      <section className={`rml-accordion-section ${rumorsOpen ? 'open' : ''}`}>
        <button className="lore-accordion-head" onClick={() => setRumorsOpen(!rumorsOpen)}>
          <span className="lore-arrow" aria-hidden="true">{rumorsOpen ? '⌄' : '⌃'}</span>
          <strong>Rumeurs</strong>
        </button>
        {rumorsOpen && (
          <div className="rml-entry-list">
            <article className="rml-entry">
              <div className="rml-entry-origin"><span>Origine de la rumeur</span><strong>À documenter</strong></div>
              <div className="rml-entry-copy">
                <h3>Rumeur de démonstration</h3>
                <p>Cette entrée sert à visualiser la structure d’une rumeur liée à la zone sélectionnée. Son contenu n’est pas canonique.</p>
              </div>
            </article>
          </div>
        )}
      </section>

      <section className={`rml-accordion-section ${mythsOpen ? 'open' : ''}`}>
        <button className="lore-accordion-head" onClick={() => setMythsOpen(!mythsOpen)}>
          <span className="lore-arrow" aria-hidden="true">{mythsOpen ? '⌄' : '⌃'}</span>
          <strong>Mythes & Légendes</strong>
        </button>
        {mythsOpen && (
          <div className="rml-entry-list">
            <article className="rml-entry myth-entry">
              <div className="rml-entry-origin"><span>Origine culturelle</span><strong>À documenter</strong></div>
              <div className="rml-entry-copy">
                <h3>Mythe ou légende de démonstration</h3>
                <p>Le récit principal sera placé ici. La page ne tranche volontairement pas entre vérité historique, croyance populaire et invention.</p>
                <div className="rml-variants"><strong>Variantes connues</strong><span>À documenter</span></div>
              </div>
            </article>
          </div>
        )}
      </section>
    </div>
  )
}

function dangerClass(level: DangerLevel) {
  if (level === 'Faible') return 'low'
  if (level === 'Modéré') return 'moderate'
  if (level === 'Élevé') return 'high'
  if (level === 'Extrême') return 'extreme'
  return 'deadly'
}

function LoreIllustration({ label, tall = false, compact = false }: { label: string; tall?: boolean; compact?: boolean }) {
  return (
    <div className={`lore-illustration ${tall ? 'tall' : ''} ${compact ? 'compact' : ''}`}>
      <div className="lore-illustration-grid" />
      <span>{label}</span>
    </div>
  )
}

function LoreTextSection({ title, divided = false, children }: { title: string; divided?: boolean; children: ReactNode }) {
  return (
    <section className={`lore-text-section ${divided ? 'divided' : ''}`}>
      <h3>{title}</h3>
      {children}
    </section>
  )
}
