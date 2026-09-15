export type DiscoveryState = 'mapped' | 'unmapped' | 'fogged'
export type NavigationLevel = 'galaxy' | 'sector' | 'system'

export type Chapter = {
  id: string
  shortLabel: string
  title: string
  period: string
  dateLabel: string
  isCurrent?: boolean
  isPreGame?: boolean
}

export type GalaxyStats = {
  systems: number
  planets: number
  population: string
  players: number
  crews: number
  activeScenes: number
}

export type SectorTheme = {
  primary: string
  secondary: string
  deep: string
}

export type Sector = {
  id: string
  name: string
  startAngle: number
  endAngle: number
  states: Record<string, DiscoveryState>
  theme: SectorTheme
  stats?: {
    systems?: number
    planets?: number
    population?: string
    players?: number
    crews?: number
    activeScenes?: number
  }
  anomalies?: string[]
  description: string
}

export type StarSystem = {
  id: string
  name: string
  sectorId: string
  x: number
  y: number
  firstVisibleChapter: string
  faction?: string
  description?: string
  planets?: number
  population?: string
  characters?: number
  crews?: number
  activeScenes?: number
  anomalies?: string[]
  starColor?: string
  starImage?: string
  starType?: string
  starTemperature?: string
  starRadius?: string
  starDescription?: string
  systemTheme?: SectorTheme
  explorable?: boolean
}


export type Route = {
  from: string
  to: string
  state: 'open' | 'dangerous' | 'unknown'
  firstVisibleChapter: string
}


export type SystemObjectKind = 'moon' | 'station' | 'habitat' | 'anomaly'

export type SystemObject = {
  id: string
  systemId: string
  name: string
  kind: SystemObjectKind
  type: string
  firstVisibleChapter: string
  description: string
  parentPlanetId?: string
  orbit?: number
  angle?: number
  x?: number
  y?: number
  radius?: number
  color?: string
  population?: string
  faction?: string
  gravity?: string
  atmosphere?: string
  temperature?: string
  characters?: number
  crews?: number
  activeScenes?: number
  directRp?: boolean
  image?: string
  mapImage?: string
  labelDx?: number
  labelDy?: number
  labelAnchor?: 'start' | 'middle' | 'end'
}

export type Planet = {
  id: string
  systemId: string
  name: string
  orbit: number
  angle: number
  radius: number
  color: string
  type: string
  population: string
  faction: string
  gravity: string
  atmosphere: string
  temperature: string
  satellites: number
  characters: number
  crews: number
  activeScenes: number
  description: string
  image?: string
  mapImage?: string
  labelDx?: number
  labelDy?: number
  labelAnchor?: 'start' | 'middle' | 'end'
  firstVisibleChapter: string
  status?: 'normal' | 'destroyed'
}


export type NewsItem = {
  id: string
  label: string
  text: string
}
