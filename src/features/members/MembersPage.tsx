import { useMemo, useState } from 'react'
import type { DirectoryKind, MemberDirectoryEntry, MemberSort } from './memberData'

export function MembersPage({
  entries,
  onOpenCharacter,
  onOpenDynasty,
  onOpenSpecies,
  onOpenFaction,
}: {
  entries: MemberDirectoryEntry[]
  onOpenCharacter: (entry: MemberDirectoryEntry) => void
  onOpenDynasty: (entry: MemberDirectoryEntry) => void
  onOpenSpecies: (entry: MemberDirectoryEntry) => void
  onOpenFaction: (entry: MemberDirectoryEntry) => void
}) {
  const [kind, setKind] = useState<DirectoryKind>('players')
  const [sort, setSort] = useState<MemberSort>('lastSeen')
  const [species, setSpecies] = useState('all')
  const [faction, setFaction] = useState('all')
  const [crew, setCrew] = useState('all')
  const [withoutActiveRp, setWithoutActiveRp] = useState(false)

  const sourceEntries = useMemo(() => entries.filter((entry) => entry.kind === kind), [entries, kind])
  const speciesOptions = useMemo(() => Array.from(new Set(sourceEntries.map((entry) => entry.species))).sort((a, b) => a.localeCompare(b, 'fr')), [sourceEntries])
  const factionOptions = useMemo(() => Array.from(new Set(sourceEntries.map((entry) => entry.faction))).sort((a, b) => a.localeCompare(b, 'fr')), [sourceEntries])
  const crewOptions = useMemo(() => Array.from(new Set(sourceEntries.map((entry) => entry.crew || 'Sans équipage'))).sort((a, b) => a.localeCompare(b, 'fr')), [sourceEntries])

  const visibleEntries = useMemo(() => {
    const filtered = sourceEntries.filter((entry) => {
      if (species !== 'all' && entry.species !== species) return false
      if (faction !== 'all' && entry.faction !== faction) return false
      const entryCrew = entry.crew || 'Sans équipage'
      if (crew !== 'all' && entryCrew !== crew) return false
      if (withoutActiveRp && entry.activeRps !== 0) return false
      return true
    })

    return [...filtered].sort((a, b) => {
      if (sort === 'oldest') return a.joinedAt - b.joinedAt
      if (sort === 'newest') return b.joinedAt - a.joinedAt
      if (sort === 'rpDesc') return b.rpCount - a.rpCount
      if (sort === 'rpAsc') return a.rpCount - b.rpCount
      if (sort === 'bountyDesc') return b.bounty - a.bounty
      if (sort === 'loreImportanceDesc') return (b.loreImportance ?? 0) - (a.loreImportance ?? 0)
      return a.lastSeen - b.lastSeen
    })
  }, [sourceEntries, species, faction, crew, withoutActiveRp, sort])

  const activeFilterCount = Number(species !== 'all') + Number(faction !== 'all') + Number(crew !== 'all') + Number(withoutActiveRp)

  const resetFilters = () => {
    setSpecies('all')
    setFaction('all')
    setCrew('all')
    setWithoutActiveRp(false)
  }

  const changeKind = (nextKind: DirectoryKind) => {
    setKind(nextKind)
    setSort('lastSeen')
    resetFilters()
  }

  return (
    <main className="members-page">
      <section className="members-directory">
        <div className="members-heading">
          <div>
            <div className="eyebrow">ANNUAIRE · PERSONNAGES ENREGISTRÉS</div>
            <h2>Membres de Gaïa</h2>
            <p>Recherche un personnage, un équipage ou un partenaire disponible pour écrire.</p>
          </div>
          <div className="members-result-count">
            <strong>{visibleEntries.length}</strong>
            <span>{kind === 'players' ? 'joueur(s)' : 'PNJ'}</span>
          </div>
        </div>

        <div className="members-controls">
          <div className="members-control-block members-kind-block">
            <span className="members-control-label">AFFICHAGE</span>
            <div className="members-segmented" role="group" aria-label="Type de membre">
              <button className={kind === 'players' ? 'active' : ''} onClick={() => changeKind('players')}>Joueurs</button>
              <button className={kind === 'npcs' ? 'active' : ''} onClick={() => changeKind('npcs')}>PNJ</button>
            </div>
          </div>

          <div className="members-control-block members-sort-block">
            <label className="members-control-label" htmlFor="members-sort">TRI</label>
            <select id="members-sort" value={sort} onChange={(event) => setSort(event.target.value as MemberSort)}>
              <option value="lastSeen">{kind === 'players' ? 'Dernière connexion' : 'Dernière activité'}</option>
              {kind === 'players' && <option value="oldest">Plus ancien</option>}
              {kind === 'players' && <option value="newest">Plus récent</option>}
              {kind === 'players' && <option value="rpDesc">+ nombre de RP</option>}
              {kind === 'players' && <option value="rpAsc">- nombre de RP</option>}
              <option value="bountyDesc">+ grosse prime</option>
              {kind === 'npcs' && <option value="loreImportanceDesc">Importance Lore</option>}
            </select>
          </div>

          <div className="members-control-block members-filter-block">
            <div className="members-filter-title">
              <span className="members-control-label">FILTRES</span>
              {activeFilterCount > 0 && <button className="members-clear-filters" onClick={resetFilters}>Effacer ({activeFilterCount})</button>}
            </div>
            <div className="members-filter-grid">
              <label>
                <span>Espèce</span>
                <select value={species} onChange={(event) => setSpecies(event.target.value)}>
                  <option value="all">Toutes</option>
                  {speciesOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span>Faction</span>
                <select value={faction} onChange={(event) => setFaction(event.target.value)}>
                  <option value="all">Toutes</option>
                  {factionOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span>Équipage</span>
                <select value={crew} onChange={(event) => setCrew(event.target.value)}>
                  <option value="all">Tous</option>
                  {crewOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label className={`members-rp-filter ${withoutActiveRp ? 'active' : ''}`}>
                <input type="checkbox" checked={withoutActiveRp} onChange={(event) => setWithoutActiveRp(event.target.checked)} />
                <span>Aucun RP actif</span>
              </label>
            </div>
          </div>
        </div>

        <div className="members-list-frame">
          {visibleEntries.length > 0 ? (
            <div className="members-grid">
              {visibleEntries.map((entry) => (
                <article className="member-card" key={entry.id}>
                  <button className="member-avatar" onClick={() => onOpenCharacter(entry)} aria-label={`Ouvrir la fiche personnage de ${entry.firstName} ${entry.dynastyName}`}>
                    {entry.avatarImage ? <img src={entry.avatarImage} alt="" /> : <span>{entry.avatarLabel}</span>}
                    {kind === 'npcs' && entry.loreImportance && (
                      <em className={`member-lore-chip lore-${entry.loreImportance}`} title={`Importance Lore ${entry.loreImportance}/5`}>
                        {entry.loreImportance}/5
                      </em>
                    )}
                    <i className={entry.activeRps === 0 ? 'available' : 'busy'} title={entry.activeRps === 0 ? 'Disponible pour RP' : `${entry.activeRps} RP actif(s)`} />
                  </button>
                  <div className="member-card-copy">
                    <div className="member-name">
                      <span>{entry.firstName}</span>{' '}
                      <button onClick={() => onOpenDynasty(entry)} title={`Ouvrir la dynastie ${entry.dynastyName}`}>{entry.dynastyName}</button>
                    </div>
                    <button className="member-meta-link" onClick={() => onOpenSpecies(entry)}>{entry.species}</button>
                    <button className="member-meta-link" onClick={() => onOpenFaction(entry)}>{entry.faction}</button>
                    <span className="member-crew">{entry.crew || 'Sans équipage'}</span>
                    <div className="member-card-foot">
                      <span>{entry.lastSeenLabel}</span>
                      {entry.bounty > 0 && <span className="member-bounty">Prime {entry.bounty.toLocaleString('fr-FR')} ¤</span>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="members-empty">
              <strong>Aucun résultat</strong>
              <span>Essaie de retirer un ou plusieurs filtres.</span>
              <button onClick={resetFilters}>Réinitialiser les filtres</button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}


