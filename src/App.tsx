import { useMemo, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { characterProfiles } from './features/characters/characterData'
import type { CharacterProfile } from './features/characters/characterData'
import { CharacterInspector, CharacterVisualRail } from './features/characters/CharacterPanels'
import { memberDirectory } from './features/members/memberData'
import { MembersPage } from './features/members/MembersPage'
import { MissionsInspector } from './features/missions/MissionsInspector'
import { missionBoard } from './features/missions/missionData'
import { completedCombatRp, prototypeRp, rpThreads } from './features/rp/rpData'
import { ShipInspector, ShipModificationOverlay } from './features/ships/ShipPanels'
import { DynastyPage } from './features/dynasty/DynastyPage'
import type { DynastyTab } from './features/dynasty/DynastyPage'
import type { RpAccessMode, RpMessage, RpThread } from './features/rp/rpData'
import { RpInspector, RpPage } from './features/rp/RpPage'
import { CombatPage } from './features/combat/CombatPage'
import {
  chapters,
  currentChapterId,
  galaxyStatsByChapter,
  isVisibleAtChapter,
  newsItems,
  planets,
  routes,
  sectors,
  systems,
  systemObjects,
} from './world/data'
import type { DiscoveryState, Planet, Sector, StarSystem, SystemObject } from './world/types'
import { knownSectorPaths, sectorHotspots } from './world/sectorGeometry'
import { planetZones, placesForObject, zonesForObject, zonesForPlanet } from './world/planetNavigation'
import type { PlanetZone, RpPlace } from './world/planetNavigation'
import { LorePage } from './features/lore/LorePage'
import type { LoreInitialView } from './features/lore/LorePage'

const MAP_W = 1240
const MAP_H = 760
const GALAXY_CX = 590
const GALAXY_CY = 380
const GALAXY_R = 348
const GALAXY_INNER_R = 58
const SYSTEM_CX = 620
const SYSTEM_CY = 380

// Population de référence au Chapitre I. Le taux reproduit la trajectoire
// temporaire 2,0 M -> 12,1 M sur 153 ans, puis applique l'écart temporel
// entre les chapitres. Carte 0 affiche approximativement l'état de l'An 152
// pour les fiches locales ; la statistique globale rappelle toute la plage historique.
const HUMAN_ANNUAL_GROWTH = Math.pow(12.1 / 2, 1 / 153) - 1
const chapterPopulationYearOffset: Record<string, number> = { pre: -1, c1: 0, c2: 2, c3: 4, c4: 7 }

function populationAtChapter(value: string | undefined, chapterId: string) {
  if (!value) return '—'
  const raw = value.trim()
  if (!/[0-9]/.test(raw) || raw.toLowerCase().includes('aucune')) return raw

  const offset = chapterPopulationYearOffset[chapterId] ?? 0
  const factor = Math.pow(1 + HUMAN_ANNUAL_GROWTH, offset)
  let amount: number | null = null

  if (/million/i.test(raw)) {
    const parsed = Number(raw.replace(/[^0-9,.-]/g, '').replace(',', '.'))
    if (Number.isFinite(parsed)) amount = parsed * 1_000_000
  } else {
    const parsed = Number(raw.replace(/[^0-9.-]/g, ''))
    if (Number.isFinite(parsed)) amount = parsed
  }

  if (amount === null) return raw
  const scaled = amount * factor
  if (scaled >= 1_000_000) return `${(scaled / 1_000_000).toFixed(2).replace('.', ',')} millions`
  return Math.round(scaled).toLocaleString('fr-FR')
}

type Point = { x: number; y: number }
type StarPoint = { x: number; y: number; r: number; opacity: number }
type MapViewMode = 'player' | 'admin'
type ScreenMode = 'home' | 'map' | 'dynasty' | 'rp' | 'combat' | 'members' | 'lore' | 'shipconfig'
type InspectorTab = 'map' | 'ship' | 'character' | 'rps' | 'myrps' | 'missions'

const stateLabel: Record<DiscoveryState, string> = {
  mapped: 'Cartographié',
  unmapped: 'Non cartographié',
  fogged: 'Brouillard',
}

// Géométrie vectorisée depuis le croquis utilisateur, puis lissée pour servir de base officielle à la carte.

function seededRandom(seed: number) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

function makeGalaxyStars(count: number, seed: number): StarPoint[] {
  const random = seededRandom(seed)
  return Array.from({ length: count }, () => {
    const angle = random() * Math.PI * 2
    const radius = Math.sqrt(random()) * (GALAXY_R - 10)
    return {
      x: GALAXY_CX + Math.cos(angle) * radius,
      y: GALAXY_CY + Math.sin(angle) * radius,
      r: 0.35 + random() * 1.2,
      opacity: 0.16 + random() * 0.58,
    }
  })
}

const galaxyStars = makeGalaxyStars(300, 98437)










function App() {
  const [screen, setScreen] = useState<ScreenMode>('home')
  const [level, setLevel] = useState<'galaxy' | 'sector' | 'system' | 'planet' | 'zone' | 'interior'>('galaxy')
  const [chapterId, setChapterId] = useState(currentChapterId)
  const [sectorId, setSectorId] = useState('tochaku')
  const [systemId, setSystemId] = useState('starlight')
  const [planetId, setPlanetId] = useState<string | null>(null)
  const [systemObjectId, setSystemObjectId] = useState<string | null>(null)
  const [zoneId, setZoneId] = useState<string | null>(null)
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null)
  const [placeId, setPlaceId] = useState<string | null>(null)
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null)
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>('map')
  const [activeCharacterId, setActiveCharacterId] = useState(characterProfiles[0].id)
  const [mapViewMode, setMapViewMode] = useState<MapViewMode>('player')
  const [selectedMissionId, setSelectedMissionId] = useState(missionBoard[0].id)
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null)
  const [dynastyTab, setDynastyTab] = useState<DynastyTab>('advantages')
  const [activeRpId, setActiveRpId] = useState(prototypeRp.id)
  const activeRp = rpThreads.find((thread) => thread.id === activeRpId) ?? prototypeRp
  const [rpMessages, setRpMessages] = useState<RpMessage[]>(prototypeRp.messages)
  const [rpAccessMode, setRpAccessMode] = useState<RpAccessMode>(prototypeRp.accessMode)
  const [rpInvitedIds, setRpInvitedIds] = useState<string[]>(prototypeRp.invitedIds)
  const [loreInitialView, setLoreInitialView] = useState<LoreInitialView>('history')
  const [lorePageKey, setLorePageKey] = useState(0)

  const chapter = chapters.find((item) => item.id === chapterId) ?? chapters.at(-1)!
  const isCurrentChapter = chapterId === currentChapterId
  const currentCharacter = characterProfiles.find((character) => character.id === activeCharacterId) ?? characterProfiles[0]
  const selectedSector = sectors.find((sector) => sector.id === sectorId) ?? sectors[0]
  const selectedSectorState = selectedSector.states[chapterId] ?? 'fogged'
  const selectedSystem = systems.find((system) => system.id === systemId) ?? systems[0]
  const selectedPlanet = planets.find((planet) => planet.id === planetId) ?? null
  const selectedSystemObject = systemObjects.find((object) => object.id === systemObjectId) ?? null
  const surfaceAstro = selectedPlanet ?? selectedSystemObject
  const availableZones = selectedPlanet ? zonesForPlanet(selectedPlanet.id) : selectedSystemObject ? zonesForObject(selectedSystemObject.id) : []
  const interiorPlaces = selectedSystemObject ? placesForObject(selectedSystemObject.id) : []
  const selectedZone = planetZones.find((zone) => zone.id === zoneId) ?? null
  const hoveredZone = planetZones.find((zone) => zone.id === hoveredZoneId) ?? null
  const selectedPlace = selectedZone?.places.find((place) => place.id === placeId) ?? null
  const hoveredPlace = selectedZone?.places.find((place) => place.id === hoveredPlaceId) ?? null
  const selectedInteriorPlace = interiorPlaces.find((place) => place.id === placeId) ?? null
  const hoveredInteriorPlace = interiorPlaces.find((place) => place.id === hoveredPlaceId) ?? null

  const visibleSystems = useMemo(
    () => systems.filter((system) => isVisibleAtChapter(system.firstVisibleChapter, chapterId)),
    [chapterId],
  )

  const sectorSystems = useMemo(
    () => visibleSystems.filter((system) => system.sectorId === selectedSector.id),
    [visibleSystems, selectedSector.id],
  )

  const systemPlanets = useMemo(
    () => planets.filter((planet) => planet.systemId === selectedSystem.id && isVisibleAtChapter(planet.firstVisibleChapter, chapterId)),
    [selectedSystem.id, chapterId],
  )

  const visibleSystemObjects = useMemo(
    () => systemObjects.filter((object) => object.systemId === selectedSystem.id && isVisibleAtChapter(object.firstVisibleChapter, chapterId)),
    [selectedSystem.id, chapterId],
  )

  const visibleRoutes = useMemo(
    () => routes.filter((route) => isVisibleAtChapter(route.firstVisibleChapter, chapterId)),
    [chapterId],
  )

  const systemById = useMemo(() => new Map(visibleSystems.map((system) => [system.id, system])), [visibleSystems])

  const openSector = (sector: Sector) => {
    setScreen('map')
    const state = sector.states[chapterId] ?? 'fogged'
    if (state === 'fogged' && mapViewMode === 'player') return
    setSectorId(sector.id)
    setPlanetId(null)
    setSystemObjectId(null)
    setZoneId(null)
    setPlaceId(null)
    setHoveredZoneId(null)
    setHoveredPlaceId(null)
    setLevel('sector')
  }

  const openSystem = (system: StarSystem) => {
    if (system.explorable === false) return
    setScreen('map')
    setSystemId(system.id)
    setPlanetId(null)
    setSystemObjectId(null)
    setZoneId(null)
    setPlaceId(null)
    setHoveredZoneId(null)
    setHoveredPlaceId(null)
    setLevel('system')
  }

  const clearPlanetNavigation = () => {
    setZoneId(null)
    setPlaceId(null)
    setHoveredZoneId(null)
    setHoveredPlaceId(null)
  }

  const goHome = () => { setScreen('home'); setPlanetId(null); setSystemObjectId(null); clearPlanetNavigation() }
  const openShipConfiguration = () => setScreen('shipconfig')
  const closeShipConfiguration = () => { setScreen('home'); setInspectorTab('ship') }
  const openMembers = () => { setScreen('members'); setPlanetId(null); setSystemObjectId(null); clearPlanetNavigation() }
  const openLore = (view: LoreInitialView = 'history') => {
    setLoreInitialView(view)
    setLorePageKey((value) => value + 1)
    setScreen('lore')
    setPlanetId(null)
    setSystemObjectId(null)
    clearPlanetNavigation()
  }
  const goGalaxy = () => { setScreen('map'); setLevel('galaxy'); setPlanetId(null); setSystemObjectId(null); clearPlanetNavigation(); setInspectorTab('map') }
  const goSector = () => { setScreen('map'); setLevel('sector'); setPlanetId(null); setSystemObjectId(null); clearPlanetNavigation(); setInspectorTab('map') }
  const goSystem = () => { setScreen('map'); setLevel('system'); setPlanetId(null); setSystemObjectId(null); clearPlanetNavigation(); setInspectorTab('map') }
  const goPlanet = () => { if (!surfaceAstro) return; setScreen('map'); setLevel('planet'); setZoneId(null); setPlaceId(null); setHoveredZoneId(null); setHoveredPlaceId(null); setInspectorTab('map') }

  const openDynasty = () => {
    setDynastyTab('advantages')
    setScreen('dynasty')
  }

  const returnToCharacter = () => {
    setScreen('home')
    setInspectorTab('character')
  }

  const openRpThread = (thread: RpThread) => {
    setActiveRpId(thread.id)
    setRpMessages(thread.messages)
    setRpAccessMode(thread.accessMode)
    setRpInvitedIds(thread.invitedIds)
    setChapterId(thread.chapterId)
    setScreen('rp')
  }
  const openPrototypeRp = () => openRpThread(prototypeRp)
  const openCompletedCombatRp = () => openRpThread(completedCombatRp)

  const openCombatPrototype = () => {
    if (activeRp.location.kind !== 'space' || !activeRp.combat) {
      alert('Un combat spatial ne peut être ouvert que depuis un RP situé dans l’espace.')
      return
    }
    setScreen('combat')
  }
  const returnToRpFromCombat = () => setScreen('rp')

  const returnFromRp = () => {
    setScreen('map')
    setSectorId('tochaku')
    setSystemId(activeRp.location.systemId || 'starlight')
    setSystemObjectId(null)
    setHoveredZoneId(null)
    setHoveredPlaceId(null)
    setInspectorTab('rps')
    if (activeRp.location.kind === 'space') {
      setPlanetId(null)
      setZoneId(null)
      setPlaceId(null)
      setLevel('system')
      return
    }
    setPlanetId(activeRp.location.bodyId || null)
    setZoneId(activeRp.location.zoneId || null)
    setPlaceId(activeRp.location.placeId || null)
    setLevel('zone')
  }

  const explorePlanet = (planet: Planet) => {
    setPlanetId(planet.id)
    setSystemObjectId(null)
    setZoneId(null)
    setPlaceId(null)
    setHoveredZoneId(null)
    setHoveredPlaceId(null)
    setInspectorTab('map')
    setLevel('planet')
  }

  const exploreSystemObject = (object: SystemObject) => {
    setSystemObjectId(object.id)
    setPlanetId(null)
    setZoneId(null)
    setPlaceId(null)
    setHoveredZoneId(null)
    setHoveredPlaceId(null)
    setInspectorTab('map')
    if (zonesForObject(object.id).length > 0) {
      setLevel('planet')
      return
    }
    if (placesForObject(object.id).length > 0) {
      setLevel('interior')
    }
  }

  const openPlanetZone = (zone: PlanetZone) => {
    setZoneId(zone.id)
    setPlaceId(null)
    setHoveredPlaceId(null)
    setInspectorTab('map')
    if (zone.explored === false) {
      // Un point inexploré peut être sélectionné comme proposition d'atterrissage,
      // mais aucun sous-lieu n'est révélé tant qu'un MJ ne l'a pas débloqué.
      setLevel('planet')
      return
    }
    setHoveredZoneId(null)
    setLevel('zone')
  }

  const openHomeTarget = (target: 'map' | 'ship' | 'character') => {
    if (target === 'map') {
      setInspectorTab('map')
      setScreen('map')
      setLevel('galaxy')
      setPlanetId(null)
      setSystemObjectId(null)
      clearPlanetNavigation()
      return
    }
    setInspectorTab(target)
  }

  const changeChapter = (nextChapterId: string) => {
    // Changer d'époque ne doit pas casser la navigation. On conserve autant que
    // possible le secteur, le système et la planète actuellement consultés.
    setChapterId(nextChapterId)

    if (level === 'galaxy') return

    const nextSectorState = selectedSector.states[nextChapterId] ?? 'fogged'
    if (nextSectorState === 'fogged') {
      setLevel('galaxy')
      setPlanetId(null)
      setSystemObjectId(null)
      clearPlanetNavigation()
      return
    }

    if (level === 'sector') return

    const systemStillKnown =
      nextSectorState === 'mapped' &&
      selectedSystem.sectorId === selectedSector.id &&
      isVisibleAtChapter(selectedSystem.firstVisibleChapter, nextChapterId)

    if (!systemStillKnown) {
      setLevel('sector')
      setPlanetId(null)
      setSystemObjectId(null)
      clearPlanetNavigation()
      return
    }

    if (selectedPlanet && !isVisibleAtChapter(selectedPlanet.firstVisibleChapter, nextChapterId)) {
      setPlanetId(null)
      setSystemObjectId(null)
      clearPlanetNavigation()
      if (level === 'planet' || level === 'zone' || level === 'interior') setLevel('system')
    }

    if (selectedSystemObject && !isVisibleAtChapter(selectedSystemObject.firstVisibleChapter, nextChapterId)) {
      setSystemObjectId(null)
    }
  }

  const sectorStyle = {
    '--accent': selectedSector.theme.primary,
    '--accent-secondary': selectedSector.theme.secondary,
    '--space-deep': selectedSector.theme.deep,
  } as CSSProperties

  // La vue système garde l'identité colorée du secteur. L'étoile apporte une
  // troisième teinte locale au lieu de remplacer complètement l'ambiance.
  const systemStyle = {
    '--accent': selectedSector.theme.primary,
    '--accent-secondary': selectedSector.theme.secondary,
    '--space-deep': selectedSector.theme.deep,
    '--system-accent': selectedSystem.starColor ?? selectedSector.theme.primary,
  } as CSSProperties

  return (
    <div className="app-shell">
      <header className={`topbar ${screen === 'members' || screen === 'lore' || screen === 'shipconfig' || screen === 'combat' ? 'standalone-topbar' : ''}`}>
        <div className="brand-block">
          <div className="eyebrow">GAÏA // INTERFACE DE NAVIGATION</div>
          <h1>{screen === 'members' ? 'Membres' : screen === 'lore' ? 'Lore' : screen === 'shipconfig' ? `Vaisseau · ${currentCharacter.shipName}` : screen === 'combat' ? 'Combat spatial' : screen === 'dynasty' ? currentCharacter.dynasty : screen === 'rp' ? `RP · ${activeRp.title}` : screen === 'home' ? 'Pont du VVF Raviolo' : level === 'galaxy' ? 'Carte Galactique' : level === 'sector' ? `Carte Secteur · ${selectedSector.name}` : level === 'system' ? `Carte Système · ${selectedSystem.name}` : level === 'planet' ? surfaceAstro?.name ?? 'Astre' : level === 'interior' ? selectedSystemObject?.name ?? 'Installation' : selectedZone?.name ?? 'Zone planétaire'}</h1>
        </div>

        <nav className="global-nav" aria-label="Navigation principale">
          <button className={screen === 'home' ? 'active' : ''} onClick={goHome}>Accueil</button>
          <button className={screen === 'lore' ? 'active' : ''} onClick={() => openLore('history')}>Lore</button>
          <button className={screen === 'members' ? 'active' : ''} onClick={openMembers}>Membres</button>
          <button className="quiet" onClick={() => alert('Prototype : écran de connexion à venir.')}>Se connecter</button>
          <button className="signup" onClick={() => alert('Prototype : inscription à venir.')}>S’inscrire <span className="signup-ship">➤</span></button>
        </nav>

        {screen !== 'members' && screen !== 'lore' && screen !== 'shipconfig' && screen !== 'combat' && <div className="chapter-control">
          <label htmlFor="chapter-select">ÉPOQUE</label>
          <select id="chapter-select" value={chapterId} onChange={(event) => changeChapter(event.target.value)}>
            {chapters.map((item) => <option key={item.id} value={item.id}>{item.shortLabel}</option>)}
          </select>
          <div className={`timeline-state ${isCurrentChapter ? 'present' : 'archive'}`}>
            {isCurrentChapter ? 'PRÉSENT' : 'ÉPOQUE PASSÉE'}
          </div>
        </div>}
      </header>

      {screen !== 'members' && screen !== 'lore' && screen !== 'shipconfig' && screen !== 'combat' && (isCurrentChapter ? <NewsTicker /> : (
        <div className="archive-strip">
          <span>MODE HISTORIQUE · {chapter.shortLabel.toUpperCase()}</span>
          <button onClick={() => changeChapter(currentChapterId)}>Retour au présent</button>
        </div>
      ))}

      {screen !== 'members' && screen !== 'lore' && screen !== 'shipconfig' && screen !== 'combat' && <div className="breadcrumb-bar">
        <button className={screen === 'home' ? 'active' : ''} onClick={goHome}>VAISSEAU</button>
        {screen === 'dynasty' && <><span>/</span><button className="active">{currentCharacter.dynasty.toUpperCase()}</button></>}
        {screen === 'rp' && <><span>/</span><button onClick={returnFromRp}>RP</button><span>/</span><button className="active">{activeRp.title.toUpperCase()}</button></>}
        {screen === 'map' && <><span>/</span><button className={level === 'galaxy' ? 'active' : ''} onClick={goGalaxy}>GAÏA</button></>}
        {screen === 'map' && level !== 'galaxy' && <><span>/</span><button className={level === 'sector' ? 'active' : ''} onClick={goSector}>{selectedSector.name.toUpperCase()}</button></>}
        {screen === 'map' && ['system', 'planet', 'zone', 'interior'].includes(level) && <><span>/</span><button className={level === 'system' ? 'active' : ''} onClick={goSystem}>{selectedSystem.name.toUpperCase()}</button></>}
        {screen === 'map' && ['planet', 'zone', 'interior'].includes(level) && surfaceAstro && <><span>/</span><button className={level === 'planet' || level === 'interior' ? 'active' : ''} onClick={level === 'interior' ? undefined : goPlanet}>{surfaceAstro.name.toUpperCase()}</button></>}
        {screen === 'map' && level === 'zone' && selectedZone && <><span>/</span><button className="active">{selectedZone.name.toUpperCase()}</button></>}
        <div className="breadcrumb-era">{screen === 'dynasty' ? 'DOSSIER DYNASTIQUE' : screen === 'rp' ? `${activeRp.dateLabel} · ${activeRp.status}` : `${chapter.shortLabel} · ${chapter.dateLabel} · ${chapter.period}`}</div>
      </div>}

      {screen === 'lore' ? (
        <LorePage key={lorePageKey} initialView={loreInitialView} />
      ) : screen === 'combat' ? (
        <CombatPage currentCharacter={currentCharacter} onBack={returnToRpFromCombat} completed={activeRp.combat?.status === 'completed'} />
      ) : screen === 'shipconfig' ? (
        <div className="ship-config-page">
          <ShipModificationOverlay currentCharacter={currentCharacter} combatLocked={currentCharacter.shipName === 'VVF Azur'} onClose={closeShipConfiguration} />
        </div>
      ) : screen === 'members' ? (
        <MembersPage
          entries={memberDirectory}
          onOpenCharacter={(entry) => {
            if (entry.profileId && characterProfiles.some((profile) => profile.id === entry.profileId)) {
              setActiveCharacterId(entry.profileId)
              setScreen('home')
              setInspectorTab('character')
              return
            }
            alert(`Prototype : ouvrir la fiche personnage de ${entry.firstName} ${entry.dynastyName}.`)
          }}
          onOpenDynasty={(entry) => alert(`Prototype : ouvrir la dynastie ${entry.dynastyName}.`)}
          onOpenSpecies={(entry) => openLore(entry.species === 'Humain' ? 'humans' : 'species')}
          onOpenFaction={(entry) => openLore(entry.faction === 'Humanis' ? 'humanis' : 'factions')}
        />
      ) : screen === 'dynasty' ? (
        <DynastyPage currentCharacter={currentCharacter} characters={characterProfiles} tab={dynastyTab} onTabChange={setDynastyTab} onBack={returnToCharacter} />
      ) : screen === 'rp' ? (
        <RpPage
          thread={activeRp}
          characters={characterProfiles}
          currentCharacter={currentCharacter}
          messages={rpMessages}
          accessMode={rpAccessMode}
          invitedIds={rpInvitedIds}
          onMessagesChange={setRpMessages}
          onAccessModeChange={setRpAccessMode}
          onInvitedIdsChange={setRpInvitedIds}
          onBack={returnFromRp}
          onOpenCombat={openCombatPrototype}
        />
      ) : (
      <main className={`workspace ${inspectorTab === 'character' ? 'character-open' : ''} ${inspectorTab === 'missions' ? 'missions-open' : ''}`}>
        <section className={`map-card ${screen === 'home' ? 'view-home' : `view-${level}`}`}>
          {screen === 'home' && (
            <ShipHome onOpen={openHomeTarget} />
          )}
          {screen === 'map' && level === 'galaxy' && (
            <div className="ship-room">
              <div className="bridge-vignette" />
              <div className="holo-floor-glow" />
              <svg className="galaxy-overview" viewBox={`0 0 ${MAP_W} ${MAP_H}`}>
                <defs>
                  <radialGradient id="galaxyGlow">
                    <stop offset="0%" stopColor="#8fe8ff" stopOpacity="0.19" />
                    <stop offset="58%" stopColor="#4c8db1" stopOpacity="0.11" />
                    <stop offset="100%" stopColor="#122132" stopOpacity="0" />
                  </radialGradient>
                  <filter id="softGlow"><feGaussianBlur stdDeviation="7" /></filter>
                  <filter id="fogBlur"><feGaussianBlur stdDeviation="9" /></filter>
                  <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(124,213,238,.09)" strokeWidth="1" />
                  </pattern>
                  <clipPath id="galaxyClip"><circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_R - 2} /></clipPath>
                  <mask id="playerFogMask" maskUnits="userSpaceOnUse" x="0" y="0" width={MAP_W} height={MAP_H}>
                    <rect x="0" y="0" width={MAP_W} height={MAP_H} fill="black" />
                    <circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_R - 2} fill="white" />
                    {sectors.map((sector) => {
                      const state = sector.states[chapterId] ?? 'fogged'
                      const path = knownSectorPaths[sector.id]
                      if (!path || state === 'fogged') return null
                      return <path key={`fog-cutout-${sector.id}`} d={path} fill="black" />
                    })}
                    <circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_INNER_R + 8} fill="black" />
                  </mask>
                </defs>

                <circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_R + 64} fill="url(#galaxyGlow)" filter="url(#softGlow)" />
                <circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_R + 27} className="galaxy-rim outer" />
                <circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_R} className="galaxy-disc" />

                <g clipPath="url(#galaxyClip)" className="galaxy-star-layer">
                  {galaxyStars.map((star, index) => <circle key={`galaxy-star-${index}`} cx={star.x} cy={star.y} r={star.r} opacity={star.opacity} className="galaxy-star-point" />)}
                </g>

                {mapViewMode === 'player' && (
                  <g clipPath="url(#galaxyClip)" mask="url(#playerFogMask)" className="player-fog-layer">
                    <circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_R - 2} className="player-fog-base" />
                    <circle cx={GALAXY_CX - 90} cy={GALAXY_CY - 65} r={GALAXY_R * .72} className="fog-cloud fog-cloud-a" />
                    <circle cx={GALAXY_CX + 105} cy={GALAXY_CY + 85} r={GALAXY_R * .68} className="fog-cloud fog-cloud-b" />
                  </g>
                )}

                {sectors.map((sector) => {
                  const state = sector.states[chapterId] ?? 'fogged'
                  const path = knownSectorPaths[sector.id]
                  if (!path) return null
                  if (state === 'fogged' && mapViewMode === 'player') return null
                  const sectorVars = { '--sector-color': sector.theme.primary } as CSSProperties
                  const hotspot = sectorHotspots[sector.id]
                  return (
                    <g key={sector.id} style={sectorVars} className={`sector-slice state-${state}`} onClick={() => openSector(sector)}>
                      <path d={path} className="sector-shape revealed-sector" />
                      {state !== 'fogged' && hotspot && (
                        <text x={hotspot.x} y={hotspot.y} textAnchor="middle" className="sector-name">
                          {state === 'unmapped' ? 'NON CART.' : sector.name.toUpperCase()}
                        </text>
                      )}
                    </g>
                  )
                })}

                {mapViewMode === 'admin' && sectors.map((sector) => {
                  const hotspot = sectorHotspots[sector.id]
                  if (!hotspot) return null
                  const state = sector.states[chapterId] ?? 'fogged'
                  return (
                    <g key={`hotspot-${sector.id}`} className="admin-hotspot" onClick={() => openSector(sector)}>
                      <circle cx={hotspot.x} cy={hotspot.y} r="22" />
                      <title>{sector.name} · {stateLabel[state]}</title>
                    </g>
                  )
                })}

                <circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_INNER_R + 18} className="blackhole-halo" />
                <circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_INNER_R + 7} className="blackhole-ring" />
                <circle cx={GALAXY_CX} cy={GALAXY_CY} r={GALAXY_INNER_R} className="galaxy-core blackhole-core" />
                <text x={GALAXY_CX} y={GALAXY_CY - 74} textAnchor="middle" className="gaia-title">GAÏA</text>
                <text x={GALAXY_CX} y={GALAXY_CY - 53} textAnchor="middle" className="gaia-subtitle">PROJECTION TACTIQUE</text>
                <text x={GALAXY_CX} y={GALAXY_CY + 3} textAnchor="middle" className="blackhole-label">TROU NOIR</text>
              </svg>
              <div className="map-view-toggle" role="group" aria-label="Mode d’affichage de la carte">
                <span>VUE CARTE</span>
                <button className={mapViewMode === 'player' ? 'active' : ''} onClick={() => setMapViewMode('player')}>Joueur</button>
                <button className={mapViewMode === 'admin' ? 'active admin' : ''} onClick={() => setMapViewMode('admin')}>Admin</button>
              </div>
              {mapViewMode === 'admin' && <div className="admin-mode-badge">APERÇU ADMIN · FRONTIÈRES SOUS BROUILLARD VISIBLES</div>}
              <div className="map-help galaxy-help">{mapViewMode === 'admin' ? 'Vue admin : survole/click les zones pour inspecter les secteurs' : 'Sélectionne un secteur accessible'}</div>
            </div>
          )}

          {screen === 'map' && level === 'sector' && (
            <div className="space-stage sector-stage" style={sectorStyle}>
              <div className="nebula nebula-a" /><div className="nebula nebula-b" />
              <div className="starfield stars-a" /><div className="starfield stars-b" />
              {selectedSectorState === 'fogged' && mapViewMode === 'admin' ? (
                <div className="unmapped-sector-screen">
                  <div className="scan-circle"><div className="scan-line" /></div>
                  <div className="unmapped-copy">
                    <div className="eyebrow">APERÇU ADMIN</div>
                    <h2>Secteur sous brouillard</h2>
                    <p>Cette zone n’est pas encore visible pour les joueurs. La vue administrateur permet seulement d’en contrôler la position et l’état.</p>
                  </div>
                </div>
              ) : selectedSectorState === 'unmapped' ? (
                <div className="unmapped-sector-screen">
                  <div className="scan-circle"><div className="scan-line" /></div>
                  <div className="unmapped-copy">
                    <div className="eyebrow">SECTEUR ACCESSIBLE</div>
                    <h2>Cartographie inexistante</h2>
                    <p>Les expéditions peuvent pénétrer dans cette région, mais aucun système fiable n’est encore enregistré à cette époque.</p>
                  </div>
                </div>
              ) : (
                <svg className="sector-map" viewBox={`0 0 ${MAP_W} ${MAP_H}`}>
                  <defs>
                    <filter id="starGlow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  </defs>
                  {visibleRoutes.map((route) => {
                    const from = systemById.get(route.from)
                    const to = systemById.get(route.to)
                    if (!from || !to || from.sectorId !== selectedSector.id || to.sectorId !== selectedSector.id) return null
                    const preKnown = (id: string) => id === 'starlight' || id === 'temporis-system'
                    if (chapterId === 'pre' && (!preKnown(route.from) || !preKnown(route.to))) return null
                    return <line key={`${route.from}-${route.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={`route route-${route.state}`} />
                  })}
                  {sectorSystems.map((system) => {
                    const unexploredAtCarte0 = chapterId === 'pre' && system.id !== 'starlight' && system.id !== 'temporis-system'
                    const locked = !unexploredAtCarte0 && system.explorable === false
                    return (
                      <g
                        key={system.id}
                        className={`system-node ${unexploredAtCarte0 ? 'unexplored-system' : ''} ${locked ? 'locked-system' : ''}`}
                        transform={`translate(${system.x} ${system.y})`}
                        onClick={() => { if (!unexploredAtCarte0 && !locked) openSystem(system) }}
                      >
                        <circle r="27" className="system-halo" />
                        <circle r="8" fill={unexploredAtCarte0 ? '#6f7c84' : locked ? '#8f9aad' : system.starColor ?? '#d9e7f3'} className="system-star" filter="url(#starGlow)" />
                        <text x="19" y="5" className="system-name">{unexploredAtCarte0 ? 'INEXPLORÉ' : system.name}</text>
                        {locked && <text x="19" y="18" className="system-lock-note">NON ACCESSIBLE</text>}
                      </g>
                    )
                  })}
                </svg>
              )}
              <div className="ambient-label">AMBIANCE SECTEUR · {selectedSector.name.toUpperCase()}</div>
              <div className="map-help">Clique sur un système pour ouvrir sa carte</div>
            </div>
          )}

          {screen === 'map' && level === 'system' && (
            <SystemMapView
              system={selectedSystem}
              planets={systemPlanets}
              objects={visibleSystemObjects}
              selectedPlanetId={planetId}
              selectedObjectId={systemObjectId}
              style={systemStyle}
              onSelectStar={() => {
                setPlanetId(null)
                setSystemObjectId(null)
                clearPlanetNavigation()
                setInspectorTab('map')
              }}
              onSelectPlanet={(planet) => {
                setPlanetId(planet.id)
                setSystemObjectId(null)
                clearPlanetNavigation()
                setInspectorTab('map')
              }}
              onSelectObject={(object) => {
                setSystemObjectId(object.id)
                setPlanetId(null)
                clearPlanetNavigation()
                setInspectorTab('map')
              }}
            />
          )}

          {screen === 'map' && level === 'planet' && surfaceAstro && (
            <PlanetSurfaceView
              astro={surfaceAstro}
              zones={availableZones}
              hoveredZoneId={hoveredZoneId}
              selectedZoneId={zoneId}
              onHoverZone={setHoveredZoneId}
              onOpenZone={openPlanetZone}
            />
          )}

          {screen === 'map' && level === 'zone' && surfaceAstro && selectedZone && (
            <PlanetZoneView
              zone={selectedZone}
              selectedPlaceId={placeId}
              hoveredPlaceId={hoveredPlaceId}
              onHoverPlace={setHoveredPlaceId}
              onSelectPlace={setPlaceId}
            />
          )}

          {screen === 'map' && level === 'interior' && selectedSystemObject && (
            <StationInteriorView
              object={selectedSystemObject}
              places={interiorPlaces}
              selectedPlaceId={placeId}
              hoveredPlaceId={hoveredPlaceId}
              onHoverPlace={setHoveredPlaceId}
              onSelectPlace={setPlaceId}
            />
          )}
          <DiscordDock />
          <RpListCard chapterId={chapterId} />
        </section>

        {inspectorTab === 'character' && <CharacterVisualRail currentCharacter={currentCharacter} characters={characterProfiles} onChangeCharacter={setActiveCharacterId} />}

        <aside className="inspector">
          <InspectorTabs active={inspectorTab} onChange={setInspectorTab} />
          {inspectorTab === 'map' && (
            <>
              <EraPanel chapterId={chapterId} onReturnPresent={() => changeChapter(currentChapterId)} />
              {screen === 'home' && <HomeNavigationInspector onOpenMap={() => openHomeTarget('map')} />}
              {screen === 'map' && level === 'galaxy' && <GalaxyInspector chapterId={chapterId} />}
              {screen === 'map' && level === 'sector' && <SectorInspector sector={selectedSector} state={selectedSectorState} chapterId={chapterId} />}
              {screen === 'map' && level === 'system' && !selectedPlanet && !selectedSystemObject && <SystemInspector system={selectedSystem} objects={visibleSystemObjects} chapterId={chapterId} onOpenRps={() => setInspectorTab('rps')} />}
              {screen === 'map' && level === 'system' && selectedPlanet && <PlanetInspector planet={selectedPlanet} chapterId={chapterId} onExplore={() => explorePlanet(selectedPlanet)} hasZones={zonesForPlanet(selectedPlanet.id).length > 0} />}
              {screen === 'map' && level === 'system' && selectedSystemObject && <SystemObjectInspector object={selectedSystemObject} chapterId={chapterId} onExplore={() => exploreSystemObject(selectedSystemObject)} hasZones={zonesForObject(selectedSystemObject.id).length > 0} hasPlaces={placesForObject(selectedSystemObject.id).length > 0} />}
              {screen === 'map' && level === 'planet' && surfaceAstro && ((hoveredZone ?? selectedZone) ? <PlanetZoneInspector zone={(hoveredZone ?? selectedZone)!} preview /> : <PlanetSurfaceInspector astro={surfaceAstro} zones={availableZones} chapterId={chapterId} />)}
              {screen === 'map' && level === 'zone' && selectedZone && (hoveredPlace || selectedPlace ? <RpPlaceInspector place={(hoveredPlace ?? selectedPlace)!} zone={selectedZone} onOpenRps={() => setInspectorTab('rps')} /> : <PlanetZoneInspector zone={selectedZone} />)}
              {screen === 'map' && level === 'interior' && selectedSystemObject && (hoveredInteriorPlace || selectedInteriorPlace ? <InteriorPlaceInspector place={(hoveredInteriorPlace ?? selectedInteriorPlace)!} object={selectedSystemObject} onOpenRps={() => setInspectorTab('rps')} /> : <SystemObjectInteriorInspector object={selectedSystemObject} places={interiorPlaces} chapterId={chapterId} />)}
            </>
          )}
          {inspectorTab === 'ship' && <ShipInspector key={currentCharacter.id} currentCharacter={currentCharacter} onOpenConfiguration={openShipConfiguration} />}
          {inspectorTab === 'character' && <CharacterInspector currentCharacter={currentCharacter} onOpenDynasty={openDynasty} />}
          {inspectorTab === 'myrps' && <MyRpsInspector onOpenRp={openPrototypeRp} onOpenCombatRp={openCompletedCombatRp} />}
          {inspectorTab === 'missions' && <MissionsInspector currentCharacter={currentCharacter} selectedMissionId={selectedMissionId} activeMissionId={activeMissionId} onSelectMission={setSelectedMissionId} onAcceptMission={setActiveMissionId} />}
          {inspectorTab === 'rps' && <RpInspector
            chapterId={chapterId}
            contextLabel={level === 'system' && !selectedPlanet && !selectedSystemObject ? `Espace · ${selectedSystem.name}` : level === 'zone' && selectedPlace ? selectedPlace.name : level === 'interior' && selectedInteriorPlace ? selectedInteriorPlace.name : selectedZone?.name ?? surfaceAstro?.name ?? selectedSystem.name}
            contextKey={level === 'system' && !selectedPlanet && !selectedSystemObject ? `system:${selectedSystem.id}` : level === 'zone' && selectedPlace ? `place:${selectedPlace.id}` : level === 'interior' && selectedInteriorPlace ? `place:${selectedInteriorPlace.id}` : level === 'zone' && selectedZone ? `zone:${selectedZone.id}` : surfaceAstro ? `body:${surfaceAstro.id}` : `system:${selectedSystem.id}`}
            onBack={() => setInspectorTab('map')}
            onOpenRp={openRpThread}
          />}
        </aside>
      </main>
      )}
    </div>
  )
}



function ShipHome({ onOpen }: { onOpen: (target: 'map' | 'ship' | 'character') => void }) {
  return (
    <div className="ship-home">
      <div className="ship-home-vignette" />
      <div className="ship-home-copy">
        <div className="eyebrow">VVF RAVIOLO · PONT PRINCIPAL</div>
        <h2>Bienvenue à bord</h2>
        <p>Sélectionne un élément du vaisseau ou utilise le panneau de droite.</p>
      </div>

      <button className="ship-hotspot hotspot-exo" onClick={() => onOpen('character')} aria-label="Ouvrir les informations du personnage">
        <span className="hotspot-ring" />
        <span className="hotspot-label"><b>Équipement personnel</b><small>Personnage · Exo-combinaison</small></span>
      </button>

      <button className="ship-hotspot hotspot-map" onClick={() => onOpen('map')} aria-label="Ouvrir la carte galactique">
        <span className="hotspot-ring" />
        <span className="hotspot-label"><b>Navigation</b><small>Carte galactique · Gaïa</small></span>
      </button>

      <button className="ship-hotspot hotspot-command" onClick={() => onOpen('ship')} aria-label="Ouvrir les informations du vaisseau">
        <span className="hotspot-ring" />
        <span className="hotspot-label"><b>Poste de commandement</b><small>État et gestion du vaisseau</small></span>
      </button>

      <div className="ship-home-hint">Survole un poste pour l’identifier · Les mêmes accès restent disponibles à droite</div>
    </div>
  )
}

function HomeNavigationInspector({ onOpenMap }: { onOpenMap: () => void }) {
  return (
    <div className="home-nav-panel cozy-panel">
      <div className="inspector-kicker">NAVIGATION</div>
      <h2>Table galactique</h2>
      <p className="description">La projection centrale donne accès à Gaïa, aux secteurs connus et à leurs systèmes. La carte 0.4.0 reste inchangée derrière cet écran d’accueil.</p>
      <button className="edit-primary" onClick={onOpenMap}>Ouvrir la carte galactique</button>
      <SectionLabel>Raccourcis du pont</SectionLabel>
      <div className="home-shortcuts">
        <div><b>Centre</b><span>Navigation galactique</span></div>
        <div><b>Gauche</b><span>Personnage / Exo</span></div>
        <div><b>Droite</b><span>Vaisseau / Commandement</span></div>
      </div>
    </div>
  )
}


function InspectorTabs({ active, onChange }: { active: InspectorTab; onChange: (tab: InspectorTab) => void }) {
  return (
    <div className="inspector-nav-stack">
      <div className="inspector-tabs">
        <button className={active === 'map' ? 'active' : ''} onClick={() => onChange('map')}>Carte</button>
        <button className={active === 'ship' ? 'active' : ''} onClick={() => onChange('ship')}>Vaisseau</button>
        <button className={active === 'character' ? 'active' : ''} onClick={() => onChange('character')}>Personnage</button>
      </div>
      <div className="inspector-utility-tabs">
        <button className={active === 'myrps' ? 'active' : ''} onClick={() => onChange('myrps')}>Mes RPs</button>
        <button className={active === 'missions' ? 'active' : ''} onClick={() => onChange('missions')}>Missions</button>
      </div>
    </div>
  )
}

function MyRpsInspector({ onOpenRp, onOpenCombatRp }: { onOpenRp: () => void; onOpenCombatRp: () => void }) {
  const entries = [
    { title: 'Une escale trop calme', meta: 'À toi de répondre · Aster, Elysia', open: onOpenRp },
    { title: 'Des étincelles dans le vide', meta: 'Fermé · Combat spatial terminé · Starlight', open: onOpenCombatRp },
    { title: 'Quart de nuit', meta: 'En attente de réponse · Station Hélios', open: () => alert('Prototype : ouvrir « Quart de nuit »') },
    { title: 'Poussière rouge', meta: '2 nouvelles réponses · Alecto', open: () => alert('Prototype : ouvrir « Poussière rouge »') },
  ]
  return (
    <div className="quick-panel cozy-panel">
      <div className="inspector-kicker">MES RPS</div>
      <h2>Suivi personnel</h2>
      <p className="description">Accès rapide aux RP auxquels participe le personnage actuellement sélectionné.</p>
      <div className="quick-list">
        {entries.map((entry) => <button key={entry.title} onClick={entry.open}><strong>{entry.title}</strong><span>{entry.meta}</span></button>)}
      </div>
      <DevNote />
    </div>
  )
}


function DiscordDock() {
  return (
    <button className="discord-dock" onClick={() => alert('Prototype : ajoute ici le lien Discord officiel lorsqu’il sera fixé.')}>Discord</button>
  )
}

function RpListCard({ chapterId }: { chapterId: string }) {
  const [collapsed, setCollapsed] = useState(false)
  const historical = chapterId !== currentChapterId
  const items = historical
    ? ['Un souvenir sous deux lunes', 'Avant le grand départ', 'Vieilles promesses']
    : ['Le signal d’Orison', 'Patrouille aux confins', 'Escale à Starlight']

  return (
    <div className={`rp-list-card ${collapsed ? 'collapsed' : ''}`}>
      <div className="rp-list-head">
        <div className="rp-list-title-wrap">
          <span>{historical ? 'FLASHBACKS RÉCENTS' : 'ACTIVITÉ RÉCENTE'}</span>
          <b>{items.length}</b>
        </div>
        <div className="rp-list-controls">
          {!collapsed && <button onClick={() => alert('Prototype : page complète de la liste des RP à venir.')}>Tout voir</button>}
          <button className="rp-collapse-button" onClick={() => setCollapsed((value) => !value)} title={collapsed ? 'Déployer' : 'Réduire'}>{collapsed ? '⌃' : '⌄'}</button>
        </div>
      </div>
      {!collapsed && (
        <>
          <div className="rp-list-sub">{historical ? 'RP ajoutés dans cette époque' : 'Derniers RP et nouvelles réponses'}</div>
          {items.map((item, index) => (
            <button key={item} className="rp-list-item" onClick={() => alert(`Prototype : ouvrir « ${item} »`)}>
              <span className="rp-status-dot" />
              <span><strong>{item}</strong><small>{historical ? 'Flashback' : index === 0 ? '2 nouvelles réponses' : 'RP actif'}</small></span>
            </button>
          ))}
        </>
      )}
    </div>
  )
}





function NewsTicker() {
  const stream = [...newsItems, ...newsItems]
  return (
    <div className="news-ticker" title="Le défilement se met en pause au survol">
      <div className="ticker-tag">RÉSEAU GAÏA // ACTUALITÉS</div>
      <div className="ticker-window">
        <div className="ticker-track">
          {stream.map((item, index) => <span key={`${item.id}-${index}`}><b>{item.label}</b> · {item.text}<i>◆</i></span>)}
        </div>
      </div>
    </div>
  )
}

function EraPanel({ chapterId, onReturnPresent }: { chapterId: string; onReturnPresent: () => void }) {
  const chapter = chapters.find((item) => item.id === chapterId)!
  if (chapterId === currentChapterId) return null
  return (
    <div className="era-panel">
      <div className="inspector-kicker">CARTE HISTORIQUE</div>
      <strong>{chapter.title}</strong>
      <span>Les RP de cette époque restent consultables et de nouveaux flashbacks pourront y être créés.</span>
      <button onClick={onReturnPresent}>Retour au présent</button>
    </div>
  )
}

function GalaxyInspector({ chapterId }: { chapterId: string }) {
  const stats = galaxyStatsByChapter[chapterId] ?? galaxyStatsByChapter[currentChapterId]
  return (
    <>
      <div className="inspector-kicker">CARTE GALACTIQUE</div>
      <h2>Galaxie Gaïa</h2>
      <p className="description">État connu de la galaxie pour l’époque sélectionnée.</p>
      <InfoRows rows={[['Systèmes connus', stats.systems], ['Planètes recensées', stats.planets], ['Population', stats.population]]} />
      <SectionLabel>Activité RP</SectionLabel>
      <InfoRows rows={[['Joueurs actifs', stats.players], ['Équipages actifs', stats.crews], ['RP de l’époque', stats.activeScenes]]} />
      <Legend />
      <DevNote />
    </>
  )
}

function SectorInspector({ sector, state, chapterId }: { sector: Sector; state: DiscoveryState; chapterId: string }) {
  const stats = sector.id === 'tochaku' ? galaxyStatsByChapter[chapterId] : (sector.stats ?? {})
  return (
    <>
      <div className="inspector-kicker">CARTE SECTEUR</div>
      <h2>{sector.name}</h2>
      <div className={`status-badge status-${state}`}>{stateLabel[state]}</div>
      <p className="description">{sector.description}</p>
      <InfoRows rows={[['Systèmes', state === 'mapped' ? stats.systems ?? 'Inconnu' : 'Inconnu'], ['Planètes', state === 'mapped' ? stats.planets ?? 'Inconnu' : 'Inconnu'], ['Population', state === 'mapped' ? stats.population ?? 'Inconnue' : 'Inconnue']]} />
      <SectionLabel>Activité</SectionLabel>
      <InfoRows rows={[['Joueurs présents', stats.players ?? '—'], ['Équipages présents', stats.crews ?? '—'], ['RP actifs', stats.activeScenes ?? '—']]} />
      <SectionLabel>Anomalies connues</SectionLabel>
      <AnomalyList items={state === 'mapped' ? sector.anomalies ?? ['Aucune donnée disponible'] : ['Données insuffisantes']} />
      <DevNote />
    </>
  )
}

function SystemMapView({ system, planets, objects, selectedPlanetId, selectedObjectId, style, onSelectStar, onSelectPlanet, onSelectObject }: {
  system: StarSystem
  planets: Planet[]
  objects: SystemObject[]
  selectedPlanetId: string | null
  selectedObjectId: string | null
  style: CSSProperties
  onSelectStar: () => void
  onSelectPlanet: (planet: Planet) => void
  onSelectObject: (object: SystemObject) => void
}) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null)
  const [hoveredObjectId, setHoveredObjectId] = useState<string | null>(null)
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; panX: number; panY: number } | null>(null)

  const planetPositions = useMemo(() => new Map(planets.map((planet) => {
    const rad = (planet.angle * Math.PI) / 180
    return [planet.id, {
      x: SYSTEM_CX + Math.cos(rad) * planet.orbit,
      y: SYSTEM_CY + Math.sin(rad) * planet.orbit,
    }]
  })), [planets])

  const objectPositions = useMemo(() => new Map(objects.map((object) => {
    if (object.parentPlanetId) {
      const parent = planetPositions.get(object.parentPlanetId)
      if (parent) {
        const rad = ((object.angle ?? 0) * Math.PI) / 180
        const orbit = object.orbit ?? 30
        return [object.id, {
          x: parent.x + Math.cos(rad) * orbit,
          y: parent.y + Math.sin(rad) * orbit,
        }]
      }
    }
    return [object.id, { x: object.x ?? SYSTEM_CX, y: object.y ?? SYSTEM_CY }]
  })), [objects, planetPositions])

  const clampZoom = (value: number) => Math.max(.65, Math.min(2.8, value))
  const nudgeZoom = (delta: number) => setZoom((value) => clampZoom(Math.round((value + delta) * 100) / 100))
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  const focusObject = (x: number, y: number) => {
    const nextZoom = Math.max(1.8, zoom)
    setZoom(nextZoom)
    setPan({
      x: -nextZoom * (x - SYSTEM_CX),
      y: -nextZoom * (y - SYSTEM_CY),
    })
  }

  const renderPlanetVisual = (planet: Planet, selected: boolean) => {
    if (planet.status === 'destroyed') {
      const r = planet.radius
      return (
        <g className="destroyed-planet-art">
          <circle r={r + 3} className="destroyed-planet-glow" />
          <circle r={r} className="destroyed-planet-body" />
          <circle r={r * .6} className="destroyed-planet-core" />
          <path d={`M ${-r * .55} ${-r * .08} L ${-r * .18} ${-r * .36} L ${r * .05} ${-r * .02} L ${r * .4} ${r * .22}`} className="destroyed-planet-crack" />
          <path d={`M ${-r * .12} ${r * .55} L ${r * .08} ${r * .18} L ${r * .34} ${r * .56}`} className="destroyed-planet-crack" />
          <circle cx={r * .84} cy={-r * .5} r={Math.max(1.8, r * .16)} className="destroyed-fragment" />
          <circle cx={-r * .92} cy={r * .36} r={Math.max(1.4, r * .11)} className="destroyed-fragment" />
          {selected && <circle r={r + 9} className="planet-selection" />}
        </g>
      )
    }

    if (planet.mapImage ?? planet.image) {
      return <image href={planet.mapImage ?? planet.image} x={-planet.radius} y={-planet.radius} width={planet.radius * 2} height={planet.radius * 2} preserveAspectRatio="xMidYMid meet" className="system-astro-image" />
    }

    return <circle r={planet.radius} fill={planet.color} className="planet-body" />
  }

  return (
    <div className="space-stage system-stage" style={style}>
      <div className="nebula nebula-a" /><div className="nebula nebula-b" />
      <div className="starfield stars-a" /><div className="starfield stars-b" />
      <svg
        className={`system-map navigable-system-map ${dragging ? 'is-dragging' : ''}`}
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        onWheel={(event) => {
          event.preventDefault()
          nudgeZoom(event.deltaY > 0 ? -.13 : .13)
        }}
      >
        <defs>
          <radialGradient id="sunFill"><stop offset="0%" stopColor="#fffad0" /><stop offset="58%" stopColor={system.starColor ?? '#f2d692'} /><stop offset="100%" stopColor="#9f6545" /></radialGradient>
          <clipPath id="systemSunClip"><circle cx={SYSTEM_CX} cy={SYSTEM_CY} r="42" /></clipPath>
          <filter id="sunGlow"><feGaussianBlur stdDeviation="13" /></filter>
          <filter id="objectGlow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <radialGradient id="astroLimbShade" cx="36%" cy="30%" r="72%">
            <stop offset="0%" stopColor="rgba(255,255,255,.08)" />
            <stop offset="62%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,.48)" />
          </radialGradient>
        </defs>

        <rect
          className="system-pan-catcher"
          x="0" y="0" width={MAP_W} height={MAP_H}
          onPointerDown={(event) => {
            const svg = event.currentTarget.ownerSVGElement
            if (!svg) return
            event.currentTarget.setPointerCapture(event.pointerId)
            dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y }
            setDragging(true)
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current
            const svg = event.currentTarget.ownerSVGElement
            if (!drag || drag.pointerId !== event.pointerId || !svg) return
            const rect = svg.getBoundingClientRect()
            const scaleX = MAP_W / Math.max(1, rect.width)
            const scaleY = MAP_H / Math.max(1, rect.height)
            setPan({
              x: drag.panX + (event.clientX - drag.startX) * scaleX,
              y: drag.panY + (event.clientY - drag.startY) * scaleY,
            })
          }}
          onPointerUp={(event) => {
            if (dragRef.current?.pointerId === event.pointerId) {
              dragRef.current = null
              setDragging(false)
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
          }}
          onPointerCancel={() => { dragRef.current = null; setDragging(false) }}
        />

        <g transform={`translate(${pan.x} ${pan.y}) translate(${SYSTEM_CX} ${SYSTEM_CY}) scale(${zoom}) translate(${-SYSTEM_CX} ${-SYSTEM_CY})`}>
          <circle cx={SYSTEM_CX} cy={SYSTEM_CY} r="76" fill={system.starColor ?? '#f2d692'} opacity=".15" filter="url(#sunGlow)" />
          {planets.map((planet) => <circle key={`orbit-${planet.id}`} cx={SYSTEM_CX} cy={SYSTEM_CY} r={planet.orbit} className="orbit-line" />)}

          {objects.map((object) => {
            if (!object.parentPlanetId || !object.orbit) return null
            const parent = planetPositions.get(object.parentPlanetId)
            if (!parent) return null
            return <circle key={`object-orbit-${object.id}`} cx={parent.x} cy={parent.y} r={object.orbit} className={`system-object-orbit orbit-${object.kind}`} />
          })}

          <g
            className={`system-star-node system-selectable ${!selectedPlanetId && !selectedObjectId ? 'selected' : ''}`}
            onClick={onSelectStar}
            onDoubleClick={() => { onSelectStar(); focusObject(SYSTEM_CX, SYSTEM_CY) }}
          >
            <circle cx={SYSTEM_CX} cy={SYSTEM_CY} r="62" className="system-star-hit" />
            {!selectedPlanetId && !selectedObjectId && <circle cx={SYSTEM_CX} cy={SYSTEM_CY} r="52" className="system-object-selection star-selection" />}
            <circle cx={SYSTEM_CX} cy={SYSTEM_CY} r="52" fill={system.starColor ?? '#f2d692'} opacity=".18" filter="url(#sunGlow)" />
            <circle cx={SYSTEM_CX} cy={SYSTEM_CY} r="42" fill="url(#sunFill)" className="system-sun" />
            {system.starImage ? (
              <image
                href={system.starImage}
                x={SYSTEM_CX - 48}
                y={SYSTEM_CY - 48}
                width={96}
                height={96}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#systemSunClip)"
                className="system-sun-image"
              />
            ) : null}
            <circle cx={SYSTEM_CX} cy={SYSTEM_CY} r="42" fill="none" className="system-sun system-sun-ring" />
            <text x={SYSTEM_CX} y={SYSTEM_CY + 68} textAnchor="middle" className="sun-label">{system.name.toUpperCase()}</text>
          </g>

          {planets.map((planet) => {
            const position = planetPositions.get(planet.id)!
            const selected = planet.id === selectedPlanetId
            return (
              <g
                key={planet.id}
                className={`planet-node system-selectable ${selected ? 'selected' : ''}`}
                transform={`translate(${position.x} ${position.y})`}
                onClick={() => onSelectPlanet(planet)}
                onDoubleClick={() => { onSelectPlanet(planet); focusObject(position.x, position.y) }}
                onMouseEnter={() => setHoveredPlanetId(planet.id)}
                onMouseLeave={() => setHoveredPlanetId(null)}
              >
                <circle r={Math.max(planet.radius + 12, 22)} className="system-object-hit" />
                {selected && planet.status !== 'destroyed' && <circle r={planet.radius + 10} className="planet-selection" />}
                {renderPlanetVisual(planet, selected)}
                <text x={planet.labelDx ?? (planet.radius + 11)} y={planet.labelDy ?? 4} textAnchor={planet.labelAnchor ?? 'start'} className={`planet-name ${hoveredPlanetId === planet.id ? 'hovered-label' : ''}`}>{planet.name}</text>
              </g>
            )
          })}

          {objects.map((object) => {
            const position = objectPositions.get(object.id)
            if (!position) return null
            const selected = object.id === selectedObjectId
            const radius = object.radius ?? (object.kind === 'moon' ? 3.5 : 7)
            const hovered = hoveredObjectId === object.id
            const showLabel = object.kind !== 'moon' || zoom >= 1.45 || selected || hovered
            return (
              <g
                key={object.id}
                className={`system-object system-object-${object.kind} system-selectable ${selected ? 'selected' : ''}`}
                transform={`translate(${position.x} ${position.y})`}
                onClick={() => onSelectObject(object)}
                onDoubleClick={() => { onSelectObject(object); focusObject(position.x, position.y) }}
                onMouseEnter={() => setHoveredObjectId(object.id)}
                onMouseLeave={() => setHoveredObjectId(null)}
              >
                <circle r={Math.max(radius + 10, 15 / zoom)} className="system-object-hit" />
                {selected && <circle r={radius + 7} className="system-object-selection" />}
                {(object.mapImage ?? object.image) ? (
                  (() => {
                    const visualRadius = object.kind === 'station' || object.kind === 'habitat' ? radius * 1.35 : radius
                    const imageClass = object.kind === 'station' || object.kind === 'habitat' ? 'system-object-image station-image' : 'system-astro-image moon-image'
                    return <image href={object.mapImage ?? object.image} x={-visualRadius} y={-visualRadius} width={visualRadius * 2} height={visualRadius * 2} preserveAspectRatio="xMidYMid meet" className={imageClass} />
                  })()
                ) : object.kind === 'station' || object.kind === 'habitat' ? (
                  <rect x={-radius} y={-radius} width={radius * 2} height={radius * 2} rx="1.5" fill={object.color ?? '#8fdbe9'} className="station-body" transform="rotate(45)" filter="url(#objectGlow)" />
                ) : object.kind === 'anomaly' ? (
                  <circle r={radius} className="anomaly-body" filter="url(#objectGlow)" />
                ) : (
                  <circle r={radius} fill={object.color ?? '#c7ced5'} className="moon-body" />
                )}
                {showLabel && <text x={object.labelDx ?? (radius + 9)} y={object.labelDy ?? 4} textAnchor={object.labelAnchor ?? 'start'} className={`system-object-name ${hovered ? 'hovered-label' : ''}`}>{object.name}</text>}
              </g>
            )
          })}

          {planets.length === 0 && objects.length === 0 && <text x={SYSTEM_CX} y={SYSTEM_CY + 150} textAnchor="middle" className="empty-system">Aucun astre répertorié à cette époque</text>}
        </g>
      </svg>

      <div className="system-map-controls" aria-label="Contrôles de zoom de la Carte Système">
        <button onClick={() => nudgeZoom(-.2)} title="Dézoomer">−</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={() => nudgeZoom(.2)} title="Zoomer">+</button>
        <button className="system-recenter" onClick={resetView} title="Recentrer la Carte Système">Recentrer</button>
      </div>
      <div className="system-depth-chip">CHOIX DE L’ASTRE</div>
      <div className="ambient-label">SIGNATURE STELLAIRE · {system.name.toUpperCase()}</div>
      <div className="map-help system-map-help">Molette : zoom · Glisser : déplacer · Double-clic : centrer</div>
    </div>
  )
}

function PlanetSurfaceView({ astro, zones, hoveredZoneId, selectedZoneId, onHoverZone, onOpenZone }: { astro: Planet | SystemObject; zones: PlanetZone[]; hoveredZoneId: string | null; selectedZoneId: string | null; onHoverZone: (zoneId: string | null) => void; onOpenZone: (zone: PlanetZone) => void }) {
  const globeX = 254
  const globeY = 114
  const globeSize = 492

  return (
    <div className="planet-navigation-stage planet-global-stage">
      <div className="planet-space-glow" />
      <svg className="planet-navigation-map" viewBox="0 0 1000 700" role="img" aria-label={`Vue globale de ${astro.name}`}>
        <defs>
          <radialGradient id="planetSurfaceFill" cx="38%" cy="28%" r="75%">
            <stop offset="0%" stopColor="#7fb7c7" />
            <stop offset="42%" stopColor="#416d7c" />
            <stop offset="100%" stopColor="#162a33" />
          </radialGradient>
          <radialGradient id="planetAtmosphere" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="rgba(89,183,214,0)" />
            <stop offset="94%" stopColor="rgba(89,183,214,.12)" />
            <stop offset="100%" stopColor="rgba(112,214,232,.36)" />
          </radialGradient>
          <clipPath id="planetSurfaceClip"><circle cx="500" cy="360" r="246" /></clipPath>
        </defs>

        <text x="500" y="78" textAnchor="middle" className="planet-surface-title">{astro.name.toUpperCase()}</text>
        <text x="500" y="102" textAnchor="middle" className="planet-surface-subtitle">SÉLECTION D’UNE ZONE</text>

        <circle cx="500" cy="360" r="256" className="planet-atmosphere-ring" />
        <g clipPath="url(#planetSurfaceClip)">
          {astro.image ? (
            <image href={astro.image} x={globeX} y={globeY} width={globeSize} height={globeSize} preserveAspectRatio="xMidYMid slice" className="planet-surface-image" />
          ) : (
            <>
              <circle cx="500" cy="360" r="246" fill="url(#planetSurfaceFill)" className="planet-surface-globe" />
              <g className="planet-surface-texture">
                <path d="M270 292 C344 228 403 249 451 215 C508 174 569 191 625 235 C662 264 704 274 738 252 L760 386 C709 405 674 448 625 466 C569 486 531 464 479 490 C420 520 363 498 309 454 C274 426 258 361 270 292 Z" />
                <path d="M350 178 C392 154 439 159 463 188 C486 214 459 245 427 252 C388 260 350 239 332 213 Z" />
                <path d="M584 438 C630 420 685 431 714 467 C734 492 726 527 694 550 C650 579 588 560 566 519 C551 490 554 451 584 438 Z" />
              </g>
            </>
          )}
        </g>
        <circle cx="500" cy="360" r="246" className="planet-surface-outline" />
        <circle cx="500" cy="360" r="246" fill="url(#planetAtmosphere)" pointerEvents="none" />

        {zones.map((zone) => {
          const hovered = hoveredZoneId === zone.id
          const selected = selectedZoneId === zone.id
          const labelRight = zone.x < 505
          const lineX = labelRight ? zone.x + 96 : zone.x - 96
          const textX = labelRight ? lineX + 9 : lineX - 9
          return (
            <g
              key={zone.id}
              className={`planet-zone-marker ${hovered ? 'hovered' : ''} ${selected ? 'selected' : ''} ${zone.explored === false ? 'unexplored' : ''}`}
              onMouseEnter={() => onHoverZone(zone.id)}
              onMouseLeave={() => onHoverZone(null)}
              onClick={() => onOpenZone(zone)}
            >
              <circle cx={zone.x} cy={zone.y} r="18" className="planet-zone-hit" />
              {selected && <circle cx={zone.x} cy={zone.y} r="16" className="planet-zone-selected-ring" />}
              <circle cx={zone.x} cy={zone.y} r="10" className="planet-zone-dot" />
              {hovered && <>
                <line x1={zone.x} y1={zone.y} x2={lineX} y2={zone.y} className="planet-hover-line" />
                <text x={textX} y={zone.y - 8} textAnchor={labelRight ? 'start' : 'end'} className="planet-hover-label">{zone.name}</text>
              </>}
            </g>
          )
        })}
      </svg>
      <div className="map-help planet-map-help">Survole une zone pour l’identifier · Clique pour zoomer</div>
    </div>
  )
}

function PlanetZoneView({ zone, selectedPlaceId, hoveredPlaceId, onHoverPlace, onSelectPlace }: { zone: PlanetZone; selectedPlaceId: string | null; hoveredPlaceId: string | null; onHoverPlace: (placeId: string | null) => void; onSelectPlace: (placeId: string) => void }) {
  return (
    <div className={`planet-navigation-stage planet-zone-stage tone-${zone.bannerTone}`}>
      <div className="planet-space-glow" />
      <svg className="planet-navigation-map" viewBox="0 0 1000 700" role="img" aria-label={`Lieux de RP de ${zone.name}`}>
        <defs>
          <radialGradient id="zoneSurfaceFill" cx="32%" cy="26%" r="82%">
            <stop offset="0%" stopColor="#71998f" />
            <stop offset="48%" stopColor="#385f5c" />
            <stop offset="100%" stopColor="#183234" />
          </radialGradient>
          <clipPath id="zoneSurfaceClip"><circle cx="735" cy="435" r="555" /></clipPath>
        </defs>

        <circle cx="735" cy="435" r="572" className="zone-atmosphere-ring" />
        <circle cx="735" cy="435" r="555" fill="url(#zoneSurfaceFill)" className="zone-surface-globe" />
        <g clipPath="url(#zoneSurfaceClip)" className="zone-surface-texture">
          <path d="M160 410 C255 286 354 248 467 268 C569 285 655 250 756 178 C826 128 932 138 1060 204 L1110 675 L185 730 Z" />
          <path d="M205 535 C360 466 466 480 592 520 C699 554 842 545 1030 464 L1090 730 L192 730 Z" />
          <path d="M380 180 C470 130 557 138 629 193 C674 227 676 263 642 288 C581 333 501 296 442 276 C393 259 345 223 380 180 Z" />
        </g>

        {zone.places.map((place) => {
          const hovered = hoveredPlaceId === place.id
          const selected = selectedPlaceId === place.id
          const labelRight = place.x < 540
          const lineX = labelRight ? place.x + 118 : place.x - 118
          const textX = labelRight ? lineX + 10 : lineX - 10
          return (
            <g
              key={place.id}
              className={`rp-place-marker ${hovered ? 'hovered' : ''} ${selected ? 'selected' : ''}`}
              onMouseEnter={() => onHoverPlace(place.id)}
              onMouseLeave={() => onHoverPlace(null)}
              onClick={() => onSelectPlace(place.id)}
            >
              <circle cx={place.x} cy={place.y} r="20" className="rp-place-hit" />
              {selected && <circle cx={place.x} cy={place.y} r="16" className="rp-place-selected-ring" />}
              <circle cx={place.x} cy={place.y} r="10" className="rp-place-dot" />
              {(hovered || selected) && <>
                <line x1={place.x} y1={place.y} x2={lineX} y2={place.y} className="planet-hover-line" />
                <text x={textX} y={place.y - 9} textAnchor={labelRight ? 'start' : 'end'} className="planet-hover-label">{place.name}</text>
              </>}
            </g>
          )
        })}
      </svg>
      <div className="zone-depth-chip">ZONE · {zone.name.toUpperCase()}</div>
      <div className="map-help planet-map-help">Survole un lieu pour afficher sa fiche · Clique pour le sélectionner</div>
    </div>
  )
}

function StationInteriorView({ object, places, selectedPlaceId, hoveredPlaceId, onHoverPlace, onSelectPlace }: { object: SystemObject; places: RpPlace[]; selectedPlaceId: string | null; hoveredPlaceId: string | null; onHoverPlace: (placeId: string | null) => void; onSelectPlace: (placeId: string) => void }) {
  return (
    <div className="planet-navigation-stage station-interior-stage">
      <div className="station-interior-grid" />
      <svg className="planet-navigation-map" viewBox="0 0 1000 700" role="img" aria-label={`Lieux de ${object.name}`}>
        <defs>
          <radialGradient id="stationCore" cx="50%" cy="44%" r="65%">
            <stop offset="0%" stopColor="#27414d" />
            <stop offset="100%" stopColor="#0c151c" />
          </radialGradient>
        </defs>
        <rect x="170" y="105" width="660" height="500" rx="78" fill="url(#stationCore)" className="station-shell" />
        <rect x="245" y="165" width="510" height="380" rx="46" className="station-inner-shell" />
        <path d="M500 165v380M245 355h510" className="station-corridor" />
        <circle cx="500" cy="355" r="62" className="station-core" />
        {places.map((place) => {
          const hovered = hoveredPlaceId === place.id
          const selected = selectedPlaceId === place.id
          const labelRight = place.x < 520
          const lineX = labelRight ? place.x + 112 : place.x - 112
          const textX = labelRight ? lineX + 9 : lineX - 9
          return (
            <g key={place.id} className={`rp-place-marker ${hovered ? 'hovered' : ''} ${selected ? 'selected' : ''}`} onMouseEnter={() => onHoverPlace(place.id)} onMouseLeave={() => onHoverPlace(null)} onClick={() => onSelectPlace(place.id)}>
              <circle cx={place.x} cy={place.y} r="21" className="rp-place-hit" />
              {selected && <circle cx={place.x} cy={place.y} r="16" className="rp-place-selected-ring" />}
              <circle cx={place.x} cy={place.y} r="10" className="rp-place-dot" />
              {(hovered || selected) && <>
                <line x1={place.x} y1={place.y} x2={lineX} y2={place.y} className="planet-hover-line" />
                <text x={textX} y={place.y - 9} textAnchor={labelRight ? 'start' : 'end'} className="planet-hover-label">{place.name}</text>
              </>}
            </g>
          )
        })}
      </svg>
      <div className="zone-depth-chip">INSTALLATION · {object.name.toUpperCase()}</div>
      <div className="map-help planet-map-help">Survole un lieu · Clique pour afficher sa fiche RP</div>
    </div>
  )
}

function SystemInspector({ system, objects, chapterId, onOpenRps }: { system: StarSystem; objects: SystemObject[]; chapterId: string; onOpenRps: () => void }) {
  const satellites = objects.filter((object) => object.kind === 'moon').length
  const installations = objects.filter((object) => object.kind === 'station' || object.kind === 'habitat').length
  const hasStarDetails = Boolean(system.starType || system.starTemperature || system.starRadius || system.starDescription || system.starImage)

  return (
    <>
      {hasStarDetails && <LandscapeBanner tone="star" label={system.name} image={system.starImage} />}
      <div className="inspector-kicker">{hasStarDetails ? 'ÉTOILE SÉLECTIONNÉE' : 'CARTE SYSTÈME · CHOIX DE L’ASTRE'}</div>
      <h2>{system.name}</h2>
      {system.starType && <div className="planet-type">{system.starType}</div>}
      <p className="description">{system.starDescription ?? system.description}</p>
      {hasStarDetails && (
        <InfoRows rows={[[ 'Type', system.starType ?? 'Inconnu' ], [ 'Température', system.starTemperature ?? 'Inconnue' ], [ 'Rayon', system.starRadius ?? 'Inconnu' ]]} />
      )}
      <SectionLabel>Vue d’ensemble du système</SectionLabel>
      <InfoRows rows={[[ 'Planètes', system.planets ?? '—' ], [ 'Satellites connus', satellites ], [ 'Installations', installations ], [ 'Population', populationAtChapter(system.population, chapterId) ], [ 'Faction', system.faction ?? 'Inconnue' ]]} />
      <SectionLabel>Activité</SectionLabel>
      <InfoRows rows={[[ 'Personnages présents', system.characters ?? '—' ], [ 'Équipages présents', system.crews ?? '—' ], [ 'RP actifs', system.activeScenes ?? '—' ]]} />
      <button className="edit-primary space-rp-button" onClick={onOpenRps}>RPs Espace · {system.name}</button>
      <SectionLabel>Anomalies connues</SectionLabel>
      <AnomalyList items={system.anomalies ?? ['Aucune donnée disponible']} />
      <div className="navigation-tip">Clique directement sur Starlight, sur une planète, sur une lune ou sur une installation pour afficher sa fiche. Les satellites deviennent plus lisibles en zoomant.</div>
      <DevNote />
    </>
  )
}

function SystemObjectInspector({ object, chapterId, onExplore, hasZones, hasPlaces }: { object: SystemObject; chapterId: string; onExplore: () => void; hasZones: boolean; hasPlaces: boolean }) {
  const kindLabel = object.kind === 'moon' ? 'SATELLITE SÉLECTIONNÉ' : object.kind === 'station' ? 'STATION SÉLECTIONNÉE' : object.kind === 'habitat' ? 'INSTALLATION SÉLECTIONNÉE' : 'POINT D’INTÉRÊT SÉLECTIONNÉ'
  const rows: [string, string | number][] = []
  if (object.population) rows.push(['Population', populationAtChapter(object.population, chapterId)])
  if (object.faction) rows.push(['Faction', object.faction])
  if (object.gravity) rows.push(['Gravité', object.gravity])
  if (object.atmosphere) rows.push(['Atmosphère', object.atmosphere])
  if (object.temperature) rows.push(['Température moy.', object.temperature])

  const exploreLabel = object.kind === 'moon' ? 'Explorer l’astre' : object.kind === 'station' ? 'Explorer la station' : 'Explorer le dépôt'

  return (
    <>
      <LandscapeBanner tone={object.kind === 'moon' ? 'planet' : 'spaceport'} label={object.name} image={object.image} />
      <div className="inspector-kicker">{kindLabel}</div>
      <h2>{object.name}</h2>
      <div className="planet-type">{object.type}</div>
      <p className="description planet-description">{object.description}</p>
      {rows.length > 0 && <InfoRows rows={rows} />}
      {(object.characters !== undefined || object.crews !== undefined || object.activeScenes !== undefined) && <>
        <SectionLabel>Activité</SectionLabel>
        <InfoRows rows={[[ 'Personnages présents', object.characters ?? '—' ], [ 'Équipages présents', object.crews ?? '—' ], [ 'RP actifs', object.activeScenes ?? '—' ]]} />
      </>}
      {(hasZones || hasPlaces) && <button className="edit-primary planet-explore-button" onClick={onExplore}>{exploreLabel}</button>}
      {!hasZones && !hasPlaces && <div className="navigation-tip">Aucune zone explorable n’est encore définie pour cet objet.</div>}
      <DevNote />
    </>
  )
}

function PlanetInspector({ planet, chapterId, onExplore, hasZones }: { planet: Planet; chapterId: string; onExplore: () => void; hasZones: boolean }) {
  const destroyed = planet.status === 'destroyed'
  return (
    <>
      <LandscapeBanner tone={destroyed ? 'volcanic' : 'planet'} label={planet.name} image={planet.image} />
      <div className="inspector-kicker">PLANÈTE SÉLECTIONNÉE</div>
      <h2>{planet.name}</h2>
      <div className="planet-type">{planet.type}</div>
      <p className="description planet-description">{planet.description}</p>
      <InfoRows rows={[['Population', populationAtChapter(planet.population, chapterId)], ['Faction', planet.faction], ['Gravité', planet.gravity], ['Atmosphère', planet.atmosphere], ['Température moy.', planet.temperature], ['Satellites', planet.satellites]]} />
      <SectionLabel>Activité</SectionLabel>
      <InfoRows rows={[['Personnages présents', planet.characters], ['Équipages présents', planet.crews], ['RP actifs', planet.activeScenes]]} />
      <button className="edit-primary planet-explore-button" onClick={onExplore} disabled={!hasZones || destroyed}>{destroyed ? 'Monde détruit, accès impossible' : hasZones ? 'Explorer la planète' : 'Aucune zone définie'}</button>
      {destroyed && <div className="navigation-tip">Cet astre reste visible pour le repérage, mais il n’est pas explorable.</div>}
      <DevNote />
    </>
  )
}

function LandscapeBanner({ tone, label, image }: { tone: string; label: string; image?: string }) {
  return (
    <div className={`location-banner banner-${tone} ${image ? 'with-image' : ''}`} role="img" aria-label={`Bannière de ${label}`} style={image ? { backgroundImage: `linear-gradient(180deg, rgba(5,8,12,.08), rgba(2,5,8,.18)), url(${image})` } : undefined}>
      <span>{label}</span>
    </div>
  )
}

function PlanetSurfaceInspector({ astro, zones, chapterId }: { astro: Planet | SystemObject; zones: PlanetZone[]; chapterId: string }) {
  const explored = zones.filter((zone) => zone.explored !== false).length
  const unexplored = zones.length - explored
  return (
    <>
      <LandscapeBanner tone="planet" label={astro.name} image={astro.image} />
      <div className="inspector-kicker">VUE DE L’ASTRE</div>
      <h2>{astro.name}</h2>
      <div className="planet-type">{astro.type}</div>
      <p className="description">Les zones déjà reconnues peuvent être ouvertes directement. Les points marqués « Inexploré » servent de propositions d’atterrissage et doivent être débloqués par un MJ avant de révéler leurs sous-lieux.</p>
      <InfoRows rows={[['Zones connues', explored], ['Points inexplorés', unexplored], ['Population', populationAtChapter(astro.population ?? '0', chapterId)], ['Faction', astro.faction ?? 'Inconnue']]} />
      <div className="navigation-tip">Clique sur un point inexploré pour le sélectionner. Une fois validé par un MJ, son nom et ses lieux pourront être révélés progressivement.</div>
    </>
  )
}

function PlanetZoneInspector({ zone, preview = false }: { zone: PlanetZone; preview?: boolean }) {
  if (zone.explored === false) {
    return (
      <>
        <div className="inspector-kicker">POINT D’ATTERRISSAGE</div>
        <h2>Inexploré</h2>
        <div className="planet-type unexplored-type">Zone non cartographiée</div>
        <p className="description">Aucune donnée de terrain fiable n’est encore disponible. Ce point peut être proposé à un MJ comme prochaine zone d’atterrissage.</p>
        <InfoRows rows={[['Statut', 'Inexploré'], ['Sous-lieux', 'À débloquer']]} />
        <div className="navigation-tip">La validation MJ révélera d’abord la zone, puis ses sous-lieux pourront être ajoutés progressivement au fil de l’exploration.</div>
      </>
    )
  }
  return (
    <>
      <LandscapeBanner tone={zone.bannerTone} label={zone.name} />
      <div className="inspector-kicker">{preview ? 'APERÇU DE LA ZONE' : 'ZONE PLANÉTAIRE'}</div>
      <h2>{zone.name}</h2>
      <div className="planet-type">{zone.kind}</div>
      <p className="description">{zone.description}</p>
      <InfoRows rows={[['Climat', zone.climate], ['Faction', zone.faction], ['Lieux RP', zone.places.length]]} />
      {preview ? <div className="navigation-tip">Clique sur cette zone pour zoomer et afficher ses lieux de RP.</div> : <div className="navigation-tip">Survole un marqueur pour afficher la description du lieu. Clique pour le sélectionner.</div>}
    </>
  )
}

function SystemObjectInteriorInspector({ object, places, chapterId }: { object: SystemObject; places: RpPlace[]; chapterId: string }) {
  return (
    <>
      <LandscapeBanner tone={object.kind === 'habitat' ? 'industrial' : 'spaceport'} label={object.name} image={object.image} />
      <div className="inspector-kicker">INSTALLATION EXPLORABLE</div>
      <h2>{object.name}</h2>
      <div className="planet-type">{object.type}</div>
      <p className="description">{object.description}</p>
      <InfoRows rows={[[ 'Lieux accessibles', places.length ], [ 'Population', populationAtChapter(object.population, chapterId) ], [ 'Faction', object.faction ?? 'Inconnue' ]]} />
      <div className="navigation-tip">Sélectionne directement un lieu. Les stations et grands habitats sautent volontairement l’étape « zone ».</div>
    </>
  )
}

function InteriorPlaceInspector({ place, object, onOpenRps }: { place: RpPlace; object: SystemObject; onOpenRps: () => void }) {
  return (
    <>
      <LandscapeBanner tone={place.bannerTone} label={place.name} />
      <div className="inspector-kicker">LIEU DE RP</div>
      <h2>{place.name}</h2>
      <div className="planet-type">{place.type}</div>
      <p className="description">{place.description}</p>
      <InfoRows rows={[[ 'Installation', object.name ], [ 'Statut', place.status ], [ 'RP actifs', place.activeRps ]]} />
      <div className="place-rp-actions">
        <button className="rp-browser-action" onClick={onOpenRps}>Voir les RP du lieu</button>
        <button className="rp-action" onClick={() => alert(`Prototype : création d’un RP dans « ${place.name} ».`)}>＋ Créer un RP ici</button>
      </div>
    </>
  )
}

function RpPlaceInspector({ place, zone, onOpenRps }: { place: RpPlace; zone: PlanetZone; onOpenRps: () => void }) {
  return (
    <>
      <LandscapeBanner tone={place.bannerTone} label={place.name} />
      <div className="inspector-kicker">LIEU DE RP</div>
      <h2>{place.name}</h2>
      <div className="planet-type">{place.type}</div>
      <p className="description">{place.description}</p>
      <InfoRows rows={[['Zone', zone.name], ['Statut', place.status], ['RP actifs', place.activeRps]]} />
      <div className="place-rp-actions">
        <button className="rp-browser-action" onClick={onOpenRps}>Voir les RP du lieu</button>
        <button className="rp-action" onClick={() => alert(`Prototype : création d’un RP dans « ${place.name} ».`)}>＋ Créer un RP ici</button>
      </div>
    </>
  )
}

function RpAction({ isCurrentChapter }: { isCurrentChapter: boolean }) {
  return (
    <button className="rp-action" onClick={() => alert(isCurrentChapter ? 'Prototype V2 : ici s’ouvrira plus tard la création d’un RP.' : 'Prototype V2 : ici s’ouvrira plus tard la création d’un flashback dans cette époque.')}>
      {isCurrentChapter ? '＋ Créer un RP ici' : '↶ Créer un flashback ici'}
    </button>
  )
}

function InfoRows({ rows }: { rows: Array<[string, string | number]> }) {
  return <dl className="system-data">{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
}

function SectionLabel({ children }: { children: ReactNode }) { return <div className="section-label">{children}</div> }
function AnomalyList({ items }: { items: string[] }) { return <div className="anomaly-list">{items.map((item) => <div key={item}><span className="anomaly-dot" />{item}</div>)}</div> }

function Legend() {
  return (
    <div className="legend">
      <SectionLabel>État des secteurs</SectionLabel>
      <div><span className="legend-swatch mapped" />Cartographié</div>
      <div><span className="legend-swatch unmapped" />Non cartographié, accessible</div>
      <div><span className="legend-swatch fogged" />Brouillard, accès verrouillé</div>
    </div>
  )
}

function DevNote() {
  return <div className="dev-note"><strong>Prototype V2</strong><span>Les noms et chiffres TEST restent des données temporaires destinées à éprouver l’interface.</span></div>
}

export default App
