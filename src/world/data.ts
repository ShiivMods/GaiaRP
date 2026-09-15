import { assetUrl } from '../utils/assets'
// DONNÉES MONDE : chronologie, secteurs, systèmes, astres, installations et routes.
import type { Chapter, GalaxyStats, NewsItem, Planet, Route, Sector, StarSystem, SystemObject } from './types'

export const chapters: Chapter[] = [
  { id: 'pre', shortLabel: '< An 153', title: 'Carte antérieure à An 153', period: 'Archives antérieures', dateLabel: '< An 153', isPreGame: true },
  { id: 'c1', shortLabel: 'Prologue', title: 'Prologue', period: 'Début de partie', dateLabel: 'An 153', isCurrent: true },
]

export const currentChapterId = 'c1'

export const galaxyStatsByChapter: Record<string, GalaxyStats> = {
  pre: { systems: 2, planets: 9, population: '2,0 → 11,96 millions', players: 0, crews: 0, activeScenes: 4 },
  c1: { systems: 4, planets: 14, population: '12,10 millions', players: 18, crews: 6, activeScenes: 11 },
  c2: { systems: 5, planets: 20, population: '12,39 millions', players: 24, crews: 7, activeScenes: 16 },
  c3: { systems: 8, planets: 25, population: '12,68 millions', players: 31, crews: 10, activeScenes: 23 },
  c4: { systems: 12, planets: 30, population: '13,10 millions', players: 35, crews: 12, activeScenes: 27 },
}

const fogged = { pre: 'fogged', c1: 'fogged', c2: 'fogged', c3: 'fogged', c4: 'fogged' } as const
const palette = [
  ['#7dd6b2', '#376f5e', '#071713'], ['#d7b46a', '#7f6032', '#1a1207'], ['#8ec4ff', '#42658f', '#071220'],
  ['#e07f98', '#814052', '#1b0910'], ['#c290d8', '#6f477f', '#160b1c'], ['#82c99b', '#426f50', '#09170e'],
  ['#dc9971', '#83513b', '#1b0c08'], ['#78c1d8', '#3a6675', '#07151b'], ['#ac8ce6', '#5a477e', '#110b1b'],
] as const

const placeholderSector = (n: number): Sector => {
  const [primary, secondary, deep] = palette[(n - 7) % palette.length]
  return {
    id: `sector-${String(n).padStart(2, '0')}`,
    name: `Secteur ${String(n).padStart(2, '0')}`,
    startAngle: 0,
    endAngle: 0,
    states: { ...fogged },
    theme: { primary, secondary, deep },
    description: 'Secteur encore noyé dans le brouillard de navigation. Nom et données temporaires.',
  }
}

export const sectors: Sector[] = [
  {
    id: 'tochaku', name: 'Tōchaku', startAngle: 0, endAngle: 0,
    states: { pre: 'mapped', c1: 'mapped', c2: 'mapped', c3: 'mapped', c4: 'mapped' },
    theme: { primary: '#62d7ff', secondary: '#356fa7', deep: '#061424' },
    stats: { systems: 4, planets: 19, population: '12,68 millions', players: 19, crews: 6, activeScenes: 12 },
    anomalies: ['Aucune anomalie majeure répertoriée'],
    description: 'Seul secteur entièrement exploré au début du jeu. Ses quatre systèmes, dont Starlight et Temporis, sont déjà colonisés et jouables.',
  },
  {
    id: 'orison', name: 'Orison', startAngle: 0, endAngle: 0,
    states: { pre: 'fogged', c1: 'fogged', c2: 'mapped', c3: 'mapped', c4: 'mapped' },
    theme: { primary: '#c087ff', secondary: '#653d99', deep: '#160822' },
    stats: { systems: 4, planets: 8, population: '445 000', players: 9, crews: 4, activeScenes: 7 },
    description: 'Premier secteur frontalier débloqué après Tōchaku. Hespéris ouvre la voie au Chapitre II, puis les autres systèmes deviennent accessibles au Chapitre III après stabilisation des balises.',
  },
  {
    id: 'lyra', name: 'Lyra', startAngle: 0, endAngle: 0,
    states: { pre: 'fogged', c1: 'fogged', c2: 'fogged', c3: 'fogged', c4: 'mapped' }, theme: { primary: '#ff6eac', secondary: '#9e3e74', deep: '#210713' },
    stats: { systems: 4, planets: 5, population: '96 000', players: 4, crews: 2, activeScenes: 4 },
    anomalies: ['Quatre mondes détruits détectés dans le système Thanéra', 'Signatures gravimétriques instables dans le reste du secteur'],
    description: 'Secteur nouvellement ouvert au Chapitre IV. Plusieurs systèmes y sont enfin localisés, mais seul Thanéra dispose d’une route d’accès suffisamment sûre pour être exploré.',
  },
  {
    id: 'temporis', name: 'Secteur 04', startAngle: 0, endAngle: 0,
    states: { ...fogged }, theme: { primary: '#73c8d9', secondary: '#345f7b', deep: '#07151c' },
    description: 'Nom temporaire. Temporis est désormais un système de Tōchaku et non plus un secteur.',
  },
  {
    id: 'kaïus', name: 'Kaïus', startAngle: 0, endAngle: 0,
    states: { ...fogged }, theme: { primary: '#8d7cff', secondary: '#51418e', deep: '#0d0920' },
    description: 'Secteur verrouillé par la progression narrative.',
  },
  {
    id: 'frontiers', name: 'Confins galactiques', startAngle: 0, endAngle: 0,
    states: { ...fogged }, theme: { primary: '#9aa4b2', secondary: '#535c69', deep: '#090b0e' },
    description: 'Zone des Confins située au nord-ouest sur la carte de référence.',
  },
  ...Array.from({ length: 27 }, (_, index) => placeholderSector(index + 7)),
]

export const systems: StarSystem[] = [
  {
    id: 'starlight', name: 'Starlight', sectorId: 'tochaku', x: 510, y: 355, firstVisibleChapter: 'pre',
    faction: 'Humanis',
    description: 'Premier système humain majeur de Gaïa. Starlight concentre la capitale historique, une industrie orbitale dense et plusieurs mondes d’exploitation.',
    planets: 5, population: '6,17 millions', characters: 13, crews: 5, activeScenes: 8,
    anomalies: ['Aucune anomalie connue'], starColor: '#f6dfa0', starImage: assetUrl('/starlight-star.png'),
    starType: 'Naine jaune (type G)', starTemperature: '5 780 K', starRadius: '696 000 km',
    starDescription: 'Étoile principale de Starlight, très proche du Soleil de l’ancienne Terre. Stable et relativement calme, elle a permis l’implantation durable d’Humanis dans tout le système.',
    systemTheme: { primary: '#f6dfa0', secondary: '#765f35', deep: '#100d08' },
  },
  {
    id: 'temporis-system', name: 'Temporis', sectorId: 'tochaku', x: 760, y: 210, firstVisibleChapter: 'pre',
    faction: 'Humanis',
    description: 'Seconde grande implantation humaine de Tōchaku. Sa colonie principale constitue le second pôle démographique après Starlight.',
    planets: 4, population: '4,15 millions', characters: 6, crews: 2, activeScenes: 4,
    starColor: '#aed0ff', systemTheme: { primary: '#a9d4ff', secondary: '#3f6a97', deep: '#071321' },
  },
  {
    id: 'to-dev-03', name: 'TŌ-03 · NOM TEMP.', sectorId: 'tochaku', x: 810, y: 510, firstVisibleChapter: 'pre',
    faction: 'Humanis', description: 'Troisième système jouable de Tōchaku. Nom et contenu encore temporaires.', planets: 5,
    population: '950 000', characters: 3, crews: 1, activeScenes: 2, starColor: '#e4b6ff',
    systemTheme: { primary: '#e4b6ff', secondary: '#724d8b', deep: '#150b1d' },
  },
  {
    id: 'to-dev-04', name: 'TŌ-04 · NOM TEMP.', sectorId: 'tochaku', x: 290, y: 260, firstVisibleChapter: 'pre',
    faction: 'Humanis', description: 'Quatrième système jouable de Tōchaku. Nom et contenu encore temporaires.', planets: 5,
    population: '820 000', characters: 4, crews: 1, activeScenes: 3, starColor: '#fff1c4',
    systemTheme: { primary: '#fff1c4', secondary: '#8d784b', deep: '#151107' },
  },
  {
    id: 'orison-prime', name: 'Hespéris', sectorId: 'orison', x: 710, y: 338, firstVisibleChapter: 'c2',
    faction: 'Humanis',
    description: 'Premier système praticable d’Orison. Il sert de tête de pont à l’ouverture du secteur et abrite les premières zones d’atterrissage sécurisées.',
    planets: 3, population: '228 000', characters: 4, crews: 2, activeScenes: 3, starColor: '#efe2ad',
    systemTheme: { primary: '#eadfbe', secondary: '#7b6a44', deep: '#18140c' },
  },
  {
    id: 'orison-02', name: 'Solenne', sectorId: 'orison', x: 748, y: 298, firstVisibleChapter: 'c3',
    faction: 'Humanis',
    description: 'Système secondaire d’Orison, ouvert après consolidation des routes. Ses premières colonies sont encore légères mais le trafic civil y est autorisé.',
    planets: 2, population: '104 000', characters: 2, crews: 1, activeScenes: 2, starColor: '#a7d8ff',
    systemTheme: { primary: '#a7d8ff', secondary: '#46739d', deep: '#09131d' },
  },
  {
    id: 'orison-03', name: 'Mnémos', sectorId: 'orison', x: 674, y: 302, firstVisibleChapter: 'c3',
    faction: 'Humanis',
    description: 'Système froid aux signaux faibles. Les nouvelles balises rendent enfin les routes fiables au Chapitre III.',
    planets: 2, population: '79 000', characters: 1, crews: 1, activeScenes: 1, starColor: '#d8c4ff',
    systemTheme: { primary: '#d8c4ff', secondary: '#7c63a8', deep: '#140d1d' },
  },
  {
    id: 'orison-04', name: 'Varenne', sectorId: 'orison', x: 772, y: 354, firstVisibleChapter: 'c3',
    faction: 'Humanis',
    description: 'Dernier système frontalier d’Orison à être fiabilisé. Peu peuplé, mais officiellement accessible aux équipages.',
    planets: 1, population: '34 000', characters: 1, crews: 0, activeScenes: 1, starColor: '#f9b7a7',
    systemTheme: { primary: '#f9b7a7', secondary: '#996251', deep: '#1a0f0d' },
  },
  {
    id: 'lyra-01', name: 'Thanéra', sectorId: 'lyra', x: 720, y: 338, firstVisibleChapter: 'c4',
    faction: 'Humanis', explorable: true,
    description: 'Premier système accessible de Lyra. Sa route d’accès est stabilisée, mais quatre de ses mondes sont à l’état de ruines planétaires.',
    planets: 5, population: '96 000', characters: 4, crews: 2, activeScenes: 4, starColor: '#ffd2c2',
    systemTheme: { primary: '#ffd2c2', secondary: '#9a6358', deep: '#180d0c' },
  },
  {
    id: 'lyra-02', name: 'Méridiane', sectorId: 'lyra', x: 668, y: 287, firstVisibleChapter: 'c4',
    faction: 'Humanis', explorable: false,
    description: 'Système repéré dans Lyra, mais encore inaccessible. Les relevés restent trop incomplets pour autoriser le transit civil.',
    planets: 0, population: 'Inconnue', characters: 0, crews: 0, activeScenes: 0, starColor: '#cfd4ff',
    systemTheme: { primary: '#cfd4ff', secondary: '#6a71a7', deep: '#10111e' },
  },
  {
    id: 'lyra-03', name: 'Obsidia', sectorId: 'lyra', x: 782, y: 278, firstVisibleChapter: 'c4',
    faction: 'Humanis', explorable: false,
    description: 'Système détecté en bordure de Lyra. Les corridors de saut demeurent trop instables pour une exploration active.',
    planets: 0, population: 'Inconnue', characters: 0, crews: 0, activeScenes: 0, starColor: '#f0b1d9',
    systemTheme: { primary: '#f0b1d9', secondary: '#92597c', deep: '#190d15' },
  },
  {
    id: 'lyra-04', name: 'Képris', sectorId: 'lyra', x: 808, y: 366, firstVisibleChapter: 'c4',
    faction: 'Humanis', explorable: false,
    description: 'Système lointain de Lyra, visible sur les cartes mais pas encore ouvert aux équipages.',
    planets: 0, population: 'Inconnue', characters: 0, crews: 0, activeScenes: 0, starColor: '#a7d3d1',
    systemTheme: { primary: '#a7d3d1', secondary: '#4e7b79', deep: '#0c1716' },
  },
]

export const routes: Route[] = [
  { from: 'starlight', to: 'temporis-system', state: 'open', firstVisibleChapter: 'pre' },
  { from: 'starlight', to: 'to-dev-03', state: 'open', firstVisibleChapter: 'pre' },
  { from: 'starlight', to: 'to-dev-04', state: 'open', firstVisibleChapter: 'pre' },
  { from: 'temporis-system', to: 'to-dev-03', state: 'open', firstVisibleChapter: 'pre' },
  { from: 'to-dev-03', to: 'to-dev-04', state: 'dangerous', firstVisibleChapter: 'pre' },
  { from: 'to-dev-03', to: 'orison-prime', state: 'open', firstVisibleChapter: 'c2' },
  { from: 'orison-prime', to: 'orison-02', state: 'open', firstVisibleChapter: 'c3' },
  { from: 'orison-prime', to: 'orison-03', state: 'open', firstVisibleChapter: 'c3' },
  { from: 'orison-02', to: 'orison-04', state: 'dangerous', firstVisibleChapter: 'c3' },
  { from: 'orison-03', to: 'orison-04', state: 'open', firstVisibleChapter: 'c3' },
  { from: 'orison-04', to: 'lyra-01', state: 'dangerous', firstVisibleChapter: 'c4' },
  { from: 'lyra-01', to: 'lyra-02', state: 'unknown', firstVisibleChapter: 'c4' },
  { from: 'lyra-01', to: 'lyra-03', state: 'unknown', firstVisibleChapter: 'c4' },
  { from: 'lyra-03', to: 'lyra-04', state: 'unknown', firstVisibleChapter: 'c4' },
]

export const planets: Planet[] = [
  {
    id: 'stl-1', systemId: 'starlight', name: 'Vespera', orbit: 90, angle: -35, radius: 11, color: '#d78c4a',
    type: 'Monde tellurique à atmosphère dense', population: '82 000', faction: 'Humanis', gravity: '0,91 G', atmosphere: 'CO₂ dense, soufre et aérosols', temperature: '71 °C', satellites: 0,
    characters: 1, crews: 0, activeScenes: 1, firstVisibleChapter: 'pre', image: assetUrl('/vespera-realistic-v2.png'), mapImage: assetUrl('/map-vespera.png'), labelDx: 16, labelDy: 4, labelAnchor: 'start',
    description: 'Premier monde de Starlight. Son atmosphère chaude et corrosive évoque l’ancienne Vénus, mais les hauts plateaux restent exploitables grâce à des complexes pressurisés et à quelques habitats suspendus. Le prototype adopte désormais pour Vespera un rendu visuel plus réaliste, cohérent avec Elysia.',
  },
  {
    id: 'stl-2', systemId: 'starlight', name: 'Elysia', orbit: 145, angle: 38, radius: 15, color: '#7ba6be',
    type: 'Monde continental habitable', population: '5,18 millions', faction: 'Humanis', gravity: '1,02 G', atmosphere: 'Respirable', temperature: '16 °C', satellites: 1,
    characters: 10, crews: 4, activeScenes: 6, firstVisibleChapter: 'pre', image: assetUrl('/elysia.png'), mapImage: assetUrl('/map-elysia.png'), labelDx: 0, labelDy: 30, labelAnchor: 'middle',
    description: 'Première grande colonie humaine de Gaïa et cœur historique de Starlight. Elysia concentre l’administration, la recherche et l’essentiel de la population du système, sans pour autant abriter à elle seule toute l’humanité.',
  },
  {
    id: 'stl-3', systemId: 'starlight', name: 'Alecto', orbit: 205, angle: 168, radius: 12, color: '#b5654c',
    type: 'Monde aride à forte inclinaison axiale', population: '612 000', faction: 'Humanis', gravity: '0,78 G', atmosphere: 'Respirable sous assistance', temperature: '-6 °C à 28 °C', satellites: 2,
    characters: 3, crews: 1, activeScenes: 2, firstVisibleChapter: 'pre', image: assetUrl('/silex-realistic.png'), mapImage: assetUrl('/map-alecto.png'), labelDx: -16, labelDy: 4, labelAnchor: 'end',
    description: 'Monde rouge et froid dont l’axe de rotation est fortement incliné par rapport au plan orbital. Sur la projection standard de navigation, la calotte septentrionale apparaît donc sur le flanc gauche du globe tandis que les terres arides dominent la moitié droite. Son visuel reprend désormais ce contraste en style réaliste.',
  },
  {
    id: 'stl-4', systemId: 'starlight', name: 'Caelus', orbit: 270, angle: 245, radius: 22, color: '#7ca6b3',
    type: 'Géante gazeuse', population: 'Aucune surface habitable', faction: 'Humanis', gravity: '2,14 G', atmosphere: 'Hydrogène, hélium et traces d’ammoniac', temperature: '-126 °C', satellites: 7,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'pre', image: assetUrl('/caelus-realistic.png'), mapImage: assetUrl('/map-caelus.png'), labelDx: 0, labelDy: -30, labelAnchor: 'middle',
    description: 'Géante gazeuse froide entourée de sept lunes exploitées. Caelus n’est pas elle-même colonisable, mais son environnement orbital constitue le principal complexe minier de Starlight.',
  },
  {
    id: 'stl-5', systemId: 'starlight', name: 'Nivéa', orbit: 330, angle: 305, radius: 9, color: '#a8c6d9',
    type: 'Monde glacé extérieur', population: '3 600', faction: 'Humanis', gravity: '0,41 G', atmosphere: 'Très ténue', temperature: '-176 °C', satellites: 1,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'c2', image: assetUrl('/nivea-realistic.png'), mapImage: assetUrl('/map-nivea.png'), labelDx: 15, labelDy: 4, labelAnchor: 'start',
    description: 'Petit monde glacé situé aux marges du système. Sa colonisation demeure limitée à quelques stations scientifiques et à une infrastructure de ravitaillement. Son rendu adopte désormais une direction visuelle réaliste, dans la continuité d’Elysia.',
  },
  {
    id: 'ori-1', systemId: 'orison-prime', name: 'Coronis', orbit: 110, angle: -18, radius: 13, color: '#8ab1a1',
    type: 'Monde continental en cours d’implantation', population: '124 000', faction: 'Humanis', gravity: '0,97 G', atmosphere: 'Respirable', temperature: '11 °C', satellites: 1,
    characters: 2, crews: 1, activeScenes: 1, firstVisibleChapter: 'c2', labelDx: 14, labelDy: 4, labelAnchor: 'start',
    description: 'Premier monde habitable d’Hespéris, utilisé comme tête de pont coloniale.',
  },
  {
    id: 'ori-2', systemId: 'orison-prime', name: 'Brisane', orbit: 185, angle: 115, radius: 11, color: '#a896d2',
    type: 'Monde rocheux venté', population: '32 000', faction: 'Humanis', gravity: '0,73 G', atmosphere: 'Minérale et respirable sous filtre', temperature: '-12 °C', satellites: 0,
    characters: 1, crews: 0, activeScenes: 1, firstVisibleChapter: 'c2', labelDx: -8, labelDy: 18, labelAnchor: 'end',
    description: 'Planète rocheuse où les avant-postes servent surtout d’escales et de relais de balise.',
  },
  {
    id: 'ori-3', systemId: 'orison-prime', name: 'Halcyon', orbit: 255, angle: 225, radius: 20, color: '#6f91b7',
    type: 'Géante gazeuse', population: 'Aucune surface habitable', faction: 'Humanis', gravity: '1,88 G', atmosphere: 'Hydrogène et hélium', temperature: '-141 °C', satellites: 1,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'c2', labelDx: -12, labelDy: -18, labelAnchor: 'end',
    description: 'Géante gazeuse qui sert de repère visuel majeur dans le système.',
  },
  {
    id: 'or2-1', systemId: 'orison-02', name: 'Meris', orbit: 126, angle: 32, radius: 12, color: '#7aa6bf',
    type: 'Monde océanique froid', population: '61 000', faction: 'Humanis', gravity: '1,04 G', atmosphere: 'Respirable humide', temperature: '4 °C', satellites: 0,
    characters: 1, crews: 0, activeScenes: 1, firstVisibleChapter: 'c3', labelDx: 13, labelDy: 4, labelAnchor: 'start',
    description: 'Monde océanique où les premières colonies flottantes restent expérimentales.',
  },
  {
    id: 'or2-2', systemId: 'orison-02', name: 'Cendreuse', orbit: 220, angle: 205, radius: 9, color: '#aa856a',
    type: 'Monde sec', population: '18 000', faction: 'Humanis', gravity: '0,62 G', atmosphere: 'Ténue', temperature: '33 °C', satellites: 0,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'c3', labelDx: -11, labelDy: 5, labelAnchor: 'end',
    description: 'Monde secondaire à l’exploitation encore rudimentaire.',
  },
  {
    id: 'or3-1', systemId: 'orison-03', name: 'Pâle', orbit: 134, angle: 148, radius: 10, color: '#c8d3ea',
    type: 'Monde glacé', population: '22 000', faction: 'Humanis', gravity: '0,58 G', atmosphere: 'Très ténue', temperature: '-74 °C', satellites: 1,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'c3', labelDx: -10, labelDy: 5, labelAnchor: 'end',
    description: 'Petit monde glacé utilisé pour la recherche et les dépôts automatisés.',
  },
  {
    id: 'or3-2', systemId: 'orison-03', name: 'Vesper', orbit: 244, angle: 315, radius: 16, color: '#d9c4a7',
    type: 'Géante sub-neptunienne', population: 'Aucune surface habitable', faction: 'Humanis', gravity: '1,43 G', atmosphere: 'Dense', temperature: '-89 °C', satellites: 0,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'c3', labelDx: 12, labelDy: -4, labelAnchor: 'start',
    description: 'Monde externe aux tempêtes pâles et aux capteurs encore capricieux.',
  },
  {
    id: 'or4-1', systemId: 'orison-04', name: 'Bocage', orbit: 150, angle: 72, radius: 12, color: '#93ae87',
    type: 'Monde tempéré rural', population: '34 000', faction: 'Humanis', gravity: '0,95 G', atmosphere: 'Respirable', temperature: '12 °C', satellites: 0,
    characters: 1, crews: 0, activeScenes: 1, firstVisibleChapter: 'c3', labelDx: 0, labelDy: 25, labelAnchor: 'middle',
    description: 'Monde tempéré à l’infrastructure légère, surtout agricole.',
  },
  {
    id: 'ly1-1', systemId: 'lyra-01', name: 'Épitaphe I', orbit: 92, angle: -16, radius: 10, color: '#6c4f52', status: 'destroyed',
    type: 'Monde détruit', population: '0', faction: 'Vestiges', gravity: '0,42 G', atmosphere: 'Fragments résiduels', temperature: 'Variable', satellites: 0,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'c4', labelDx: 13, labelDy: 4, labelAnchor: 'start',
    description: 'Premier monde ruiné de Thanéra. Sa croûte brisée laisse apparaître un noyau encore incandescent par endroits.',
  },
  {
    id: 'ly1-2', systemId: 'lyra-01', name: 'Épitaphe II', orbit: 150, angle: 48, radius: 11, color: '#78545a', status: 'destroyed',
    type: 'Monde détruit', population: '0', faction: 'Vestiges', gravity: '0,38 G', atmosphere: 'Aucune stable', temperature: 'Variable', satellites: 0,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'c4', labelDx: 8, labelDy: 17, labelAnchor: 'start',
    description: 'Ruines orbitales et champs de débris entourent ce second monde anéanti.',
  },
  {
    id: 'ly1-3', systemId: 'lyra-01', name: 'Épitaphe III', orbit: 208, angle: 138, radius: 9, color: '#66484d', status: 'destroyed',
    type: 'Monde détruit', population: '0', faction: 'Vestiges', gravity: '0,31 G', atmosphere: 'Aucune', temperature: 'Variable', satellites: 0,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'c4', labelDx: -10, labelDy: 14, labelAnchor: 'end',
    description: 'Les capteurs n’y relèvent plus qu’un manteau pulvérisé et des émissions thermiques intermittentes.',
  },
  {
    id: 'ly1-4', systemId: 'lyra-01', name: 'Épitaphe IV', orbit: 272, angle: 232, radius: 13, color: '#7a5a4e', status: 'destroyed',
    type: 'Monde détruit', population: '0', faction: 'Vestiges', gravity: '0,46 G', atmosphere: 'Nuage de cendres minérales', temperature: 'Variable', satellites: 0,
    characters: 0, crews: 0, activeScenes: 0, firstVisibleChapter: 'c4', labelDx: -9, labelDy: -13, labelAnchor: 'end',
    description: 'Plus massif que les autres, ce monde détruit dérive dans une large traînée de débris brûlés.',
  },
  {
    id: 'ly1-5', systemId: 'lyra-01', name: 'Refuge', orbit: 328, angle: 312, radius: 8, color: '#8da0b8',
    type: 'Monde rocheux sous dôme', population: '14 000', faction: 'Humanis', gravity: '0,64 G', atmosphere: 'Respirable sous dôme', temperature: '-21 °C', satellites: 0,
    characters: 1, crews: 1, activeScenes: 1, firstVisibleChapter: 'c4', labelDx: 12, labelDy: -6, labelAnchor: 'start',
    description: 'Seul monde encore exploitable de Thanéra. Quelques installations de survie y servent de base avancée pour l’étude des quatre mondes détruits.',
  },
]

export const systemObjects: SystemObject[] = [
  {
    id: 'stl-2-m1', systemId: 'starlight', name: 'Néréa', kind: 'moon', type: 'Satellite naturel',
    parentPlanetId: 'stl-2', orbit: 34, angle: 215, radius: 4.8, color: '#abb4c0', firstVisibleChapter: 'pre', image: assetUrl('/nerea-realistic.png'), mapImage: assetUrl('/map-nerea.png'), labelDx: -10, labelDy: -11, labelAnchor: 'end',
    description: 'Unique lune d’Elysia. Son sous-sol stable et sa proximité avec la capitale en ont fait un site privilégié pour les observatoires, la logistique et les infrastructures de secours.',
    population: '86 000', faction: 'Humanis', gravity: '0,18 G', atmosphere: 'Aucune', temperature: '-42 °C', characters: 2, crews: 1, activeScenes: 1,
  },
  {
    id: 'elysia-defense', systemId: 'starlight', name: 'Bastion Elysia', kind: 'station', type: 'Station de défense orbitale',
    parentPlanetId: 'stl-2', orbit: 53, angle: 42, radius: 7.5, color: '#82d3e5', firstVisibleChapter: 'pre', image: assetUrl('/bastion-elysia-realistic.png'), mapImage: assetUrl('/bastion-elysia-map.png'), labelDx: 12, labelDy: 13, labelAnchor: 'start',
    description: 'Principal verrou défensif de l’orbite d’Elysia. Le Bastion concentre des batteries lourdes, des hangars d’interception et un centre de coordination militaire.',
    population: '18 500', faction: 'Humanis', characters: 3, crews: 2, activeScenes: 2,
  },
  {
    id: 'stl-3-m1', systemId: 'starlight', name: 'Iria', kind: 'moon', type: 'Satellite naturel',
    parentPlanetId: 'stl-3', orbit: 29, angle: 65, radius: 3.6, color: '#b7a99c', firstVisibleChapter: 'pre', image: assetUrl('/alecto-realistic.png'), mapImage: assetUrl('/map-iria.png'), labelDx: 8, labelDy: 11, labelAnchor: 'start',
    description: 'Lune intérieure d’Alecto, sèche et fortement cratérisée. Elle accueille plusieurs installations de prospection.', population: '14 600', faction: 'Humanis', gravity: '0,09 G', atmosphere: 'Aucune', temperature: '-82 °C', characters: 0, crews: 0, activeScenes: 0,
  },
  {
    id: 'stl-3-m2', systemId: 'starlight', name: 'Tarsis', kind: 'moon', type: 'Satellite naturel',
    parentPlanetId: 'stl-3', orbit: 46, angle: 228, radius: 4.4, color: '#d2c1a8', firstVisibleChapter: 'pre', image: assetUrl('/silex-fantasy.png'), mapImage: assetUrl('/map-silex.png'), labelDx: -8, labelDy: -9, labelAnchor: 'end',
    description: 'Satellite extérieur d’Alecto. Sa faible gravité et ses cavités naturelles ont facilité l’installation de dépôts souterrains.', population: '8 900', faction: 'Humanis', gravity: '0,12 G', atmosphere: 'Très ténue', temperature: '-101 °C', characters: 0, crews: 0, activeScenes: 0,
  },
  { id: 'stl-4-m1', systemId: 'starlight', name: 'Bronté', kind: 'moon', type: 'Satellite minier', parentPlanetId: 'stl-4', orbit: 34, angle: 15, radius: 4.0, color: '#c7bfae', firstVisibleChapter: 'pre', image: assetUrl('/rocky-moon-realistic.png'), mapImage: assetUrl('/map-rocky.png'), labelDx: 9, labelDy: -6, labelAnchor: 'start', description: 'Lune intérieure riche en iridium.', population: '18 000', faction: 'Humanis', gravity: '0,10 G', atmosphere: 'Aucune', temperature: '-138 °C' },
  { id: 'stl-4-m2', systemId: 'starlight', name: 'Kora', kind: 'moon', type: 'Satellite minier', parentPlanetId: 'stl-4', orbit: 45, angle: 62, radius: 3.4, color: '#9fa8ad', firstVisibleChapter: 'pre', image: assetUrl('/moon-dark-metallic.png'), mapImage: assetUrl('/map-dark.png'), labelDx: 8, labelDy: 8, labelAnchor: 'start', description: 'Petite lune de Caelus exploitée pour ses veines de cobalt.', population: '22 000', faction: 'Humanis', gravity: '0,08 G', atmosphere: 'Aucune', temperature: '-146 °C' },
  { id: 'stl-4-m3', systemId: 'starlight', name: 'Mélia', kind: 'moon', type: 'Satellite minier', parentPlanetId: 'stl-4', orbit: 58, angle: 117, radius: 5.0, color: '#b8a18a', firstVisibleChapter: 'pre', image: assetUrl('/moon-beige-cratered.png'), mapImage: assetUrl('/map-beige.png'), labelDx: -10, labelDy: 10, labelAnchor: 'end', description: 'Lune rocheuse riche en titane.', population: '16 000', faction: 'Humanis', gravity: '0,14 G', atmosphere: 'Très ténue', temperature: '-151 °C' },
  { id: 'stl-4-m4', systemId: 'starlight', name: 'Téthra', kind: 'moon', type: 'Satellite minier', parentPlanetId: 'stl-4', orbit: 69, angle: 169, radius: 3.0, color: '#c8d0d4', firstVisibleChapter: 'pre', image: assetUrl('/rocky-moon-realistic.png'), mapImage: assetUrl('/map-rocky.png'), labelDx: -9, labelDy: 5, labelAnchor: 'end', description: 'Petit satellite à forte concentration de palladium.', population: '11 000', faction: 'Humanis', gravity: '0,07 G', atmosphere: 'Aucune', temperature: '-159 °C' },
  { id: 'stl-4-m5', systemId: 'starlight', name: 'Oros', kind: 'moon', type: 'Satellite minier', parentPlanetId: 'stl-4', orbit: 81, angle: 220, radius: 3.8, color: '#98948d', firstVisibleChapter: 'pre', image: assetUrl('/moon-dark-metallic.png'), mapImage: assetUrl('/map-dark.png'), labelDx: -10, labelDy: -6, labelAnchor: 'end', description: 'Lune sombre dont les gisements d’osmium sont exploités en profondeur.', population: '13 000', faction: 'Humanis', gravity: '0,09 G', atmosphere: 'Aucune', temperature: '-165 °C' },
  { id: 'stl-4-m6', systemId: 'starlight', name: 'Varda', kind: 'moon', type: 'Satellite minier', parentPlanetId: 'stl-4', orbit: 93, angle: 275, radius: 4.4, color: '#d0c3ad', firstVisibleChapter: 'pre', image: assetUrl('/moon-beige-cratered.png'), mapImage: assetUrl('/map-beige.png'), labelDx: 0, labelDy: -11, labelAnchor: 'middle', description: 'Satellite de Caelus exploité pour le vanadium.', population: '9 000', faction: 'Humanis', gravity: '0,11 G', atmosphere: 'Aucune', temperature: '-171 °C' },
  { id: 'stl-4-m7', systemId: 'starlight', name: 'Calix', kind: 'moon', type: 'Satellite minier', parentPlanetId: 'stl-4', orbit: 105, angle: 331, radius: 3.2, color: '#adb9c1', firstVisibleChapter: 'pre', image: assetUrl('/nerea-realistic.png'), mapImage: assetUrl('/map-nerea.png'), labelDx: 10, labelDy: -8, labelAnchor: 'start', description: 'Lune extérieure froide et riche en tungstène.', population: '6 000', faction: 'Humanis', gravity: '0,07 G', atmosphere: 'Aucune', temperature: '-179 °C' },
  {
    id: 'helios-station', systemId: 'starlight', name: 'Station Hélios', kind: 'station', type: 'Station spatiale',
    x: 760, y: 248, radius: 9, color: '#7fe0ee', firstVisibleChapter: 'pre', image: assetUrl('/argos-realistic.png'), mapImage: assetUrl('/helios-station-map.png'), labelDx: 15, labelDy: 5, labelAnchor: 'start',
    description: 'Grande station de transit et de services placée à l’écart des orbites planétaires. Hélios sert de carrefour aux équipages civils, commerciaux et militaires.',
    population: '21 000', faction: 'Humanis', characters: 4, crews: 3, activeScenes: 2,
  },
  {
    id: 'argos-depot', systemId: 'starlight', name: 'Argos', kind: 'habitat', type: 'Astéroïde-dépôt industriel',
    parentPlanetId: 'stl-4', orbit: 126, angle: 41, radius: 8.5, color: '#d19a57', firstVisibleChapter: 'pre', image: assetUrl('/helios-station-realistic.png'), mapImage: assetUrl('/argos-map.png'), labelDx: 14, labelDy: 4, labelAnchor: 'start',
    description: 'Astéroïde évidé et transformé en centre logistique. Argos centralise le fret, le raffinage, les équipages et le stockage de toute l’opération minière menée sur les lunes de Caelus.',
    population: '44 000', faction: 'Humanis', characters: 5, crews: 4, activeScenes: 3,
  },
  {
    id: 'stl-5-m1', systemId: 'starlight', name: 'Silex', kind: 'moon', type: 'Satellite glacé',
    parentPlanetId: 'stl-5', orbit: 31, angle: 145, radius: 3.6, color: '#c9d8e0', firstVisibleChapter: 'c2', image: assetUrl('/silex-fantasy.png'), mapImage: assetUrl('/map-silex.png'), labelDx: -9, labelDy: 8, labelAnchor: 'end',
    description: 'Petit satellite glacé de Nivéa, presque entièrement désert.', population: '0', faction: 'Humanis', gravity: '0,06 G', atmosphere: 'Aucune', temperature: '-192 °C', characters: 0, crews: 0, activeScenes: 0,
  },
  {
    id: 'ori-1-m1', systemId: 'orison-prime', name: 'Lysis', kind: 'moon', type: 'Satellite naturel',
    parentPlanetId: 'ori-1', orbit: 32, angle: 232, radius: 4.1, color: '#d2d4d8', firstVisibleChapter: 'c2',
    description: 'Unique lune de Coronis, utilisée comme relais radar.', population: '4 800', faction: 'Humanis', gravity: '0,11 G', atmosphere: 'Aucune', temperature: '-54 °C', labelDx: -9, labelDy: 9, labelAnchor: 'end'
  },
  {
    id: 'or3-1-m1', systemId: 'orison-03', name: 'Nacre', kind: 'moon', type: 'Satellite glacé',
    parentPlanetId: 'or3-1', orbit: 28, angle: 255, radius: 3.6, color: '#dce8f0', firstVisibleChapter: 'c3',
    description: 'Petite lune claire de Pâle, récemment cartographiée.', population: '0', faction: 'Humanis', gravity: '0,05 G', atmosphere: 'Aucune', temperature: '-126 °C', labelDx: -8, labelDy: 8, labelAnchor: 'end'
  },
  {
    id: 'lyra-watch', systemId: 'lyra-01', name: 'Veille 9', kind: 'station', type: 'Station d’observation',
    x: 862, y: 438, radius: 8.5, color: '#f0b594', firstVisibleChapter: 'c4',
    description: 'Station scientifique avancée chargée de surveiller les mondes détruits de Thanéra et de guider les équipages autorisés.', population: '6 400', faction: 'Humanis', characters: 3, crews: 1, activeScenes: 2,
  },
]

export const newsItems: NewsItem[] = [
  { id: 'n1', label: 'LYRA', text: 'Le secteur de Lyra est enfin ouvert sur les cartes tactiques. Seul Thanéra est actuellement accessible.' },
  { id: 'n2', label: 'ALERTE', text: 'Quatre mondes détruits ont été recensés dans Thanéra. Leur étude se fait sous supervision stricte.' },
  { id: 'n3', label: 'NAVIGATION', text: 'Méridiane, Obsidia et Képris apparaissent désormais sur les relevés, mais restent non accessibles.' },
]

// L'ordre historique reste indépendant des deux époques exposées dans l'interface.
// Les anciennes données c2/c3/c4 sont conservées comme données inactives afin de
// préserver exactement l'état c1 du Prologue sans rendre leur contenu visible.
const chapterOrder: Record<string, number> = { pre: 0, c1: 1, c2: 2, c3: 3, c4: 4 }

export const chapterIndex = (id: string) => chapterOrder[id] ?? Number.POSITIVE_INFINITY
export const isVisibleAtChapter = (firstVisibleChapter: string, chapterId: string) => chapterIndex(firstVisibleChapter) <= chapterIndex(chapterId)
