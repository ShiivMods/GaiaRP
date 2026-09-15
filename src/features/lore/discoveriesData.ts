import type { DangerLevel } from './loreData'

export type DiscoveryMode = 'resources' | 'technologies' | 'anomalies' | null
export type ResourceCategoryId = 'industrial' | 'strategic' | 'rare'

export type ResourceMaterialEntry = {
  id: string
  name: string
  category: ResourceCategoryId
  family: string
  rarity: 'Commune' | 'Peu commune' | 'Rare' | 'Exceptionnelle'
  description: string
  properties: string
  knownUses: string[]
  collection: string
  knownLocations: string[]
  hazards: string
  discoveredBy: string
  discoveryContext: string
}

export type ResourceCategory = {
  id: ResourceCategoryId
  label: string
  description: string
}

export type AnomalyEntry = {
  id: string
  designation: string
  location: string
  danger: DangerLevel
  status: 'Active' | 'Stable' | 'Instable' | 'Disparue' | 'Neutralisée' | 'Inconnue'
  discoveredBy: string
  discoveryContext: string
  description: string
  observations: string[]
  knownEffects: string[]
  theories: string[]
}

export const resourceCategories: ResourceCategory[] = [
  { id: 'industrial', label: 'Métaux industriels', description: 'Matériaux employés à grande échelle dans la construction, la maintenance et les infrastructures spatiales.' },
  { id: 'strategic', label: 'Métaux stratégiques', description: 'Ressources moins courantes dont les propriétés sont recherchées pour des alliages, systèmes énergétiques ou équipements spécialisés.' },
  { id: 'rare', label: 'Métaux rares & denses', description: 'Métaux lourds ou précieux, difficiles à extraire et utilisés dans des applications de haute précision.' },
]

export const resourceMaterials: ResourceMaterialEntry[] = [
  {
    id: 'cobalt-kora', name: 'Cobalt', category: 'industrial', family: 'Métal de transition', rarity: 'Commune',
    description: 'Le cobalt extrait de Kora forme de longues veines sombres prises dans une roche très compacte. Il constitue l’une des ressources les plus régulières du complexe minier de Caelus.',
    properties: 'Métal dur et résistant à l’usure, particulièrement apprécié lorsqu’il doit conserver ses propriétés mécaniques à haute température.',
    knownUses: ['Alliages résistants à la chaleur', 'Composants de moteurs et turbines', 'Certaines cellules de stockage énergétique'],
    collection: 'Les exploitations de Kora suivent les filons par galeries pressurisées. Le minerai brut est trié sur place puis expédié vers Argos pour raffinage.',
    knownLocations: ['Kora · lune de Caelus', 'Galerie K-7'],
    hazards: 'Poussières métalliques nocives lors du concassage et risque d’effondrement dans les galeries anciennes.',
    discoveredBy: 'Premières équipes minières de Starlight', discoveryContext: 'Ressource répertoriée lors de la mise en exploitation du cortège de Caelus.',
  },
  {
    id: 'titanium-melia', name: 'Titane', category: 'industrial', family: 'Métal structurel', rarity: 'Commune',
    description: 'Mélia possède de vastes couches rocheuses riches en titane. L’exploitation à ciel ouvert a progressivement transformé certaines régions de la lune en immenses fronts de taille.',
    properties: 'Très bon rapport résistance/masse, faible sensibilité à la corrosion et comportement stable dans de nombreux environnements spatiaux.',
    knownUses: ['Structures de vaisseaux', 'Renforts de coque', 'Équipements pressurisés et pièces mécaniques'],
    collection: 'Extraction mécanisée en carrière, suivie d’un concassage avant transfert vers les installations orbitales.',
    knownLocations: ['Mélia · lune de Caelus', 'Front de Taille M-3'],
    hazards: 'Travaux de surface exposés aux projections et aux vibrations des excavations industrielles.',
    discoveredBy: 'Premières équipes minières de Starlight', discoveryContext: 'Identifié très tôt comme l’un des principaux matériaux structurels exploitables autour de Caelus.',
  },
  {
    id: 'tungsten-calix', name: 'Tungstène', category: 'industrial', family: 'Métal réfractaire', rarity: 'Peu commune',
    description: 'Les gisements de Calix sont enfouis dans une croûte froide et cassante. Leur exploitation est plus coûteuse que celle des lunes intérieures mais produit un matériau particulièrement robuste.',
    properties: 'Point de fusion extrêmement élevé, forte densité et excellente résistance thermique.',
    knownUses: ['Pièces soumises à de très fortes températures', 'Blindages spécialisés', 'Outillage industriel lourd'],
    collection: 'Extraction souterraine puis séparation du minerai dans des unités chauffées avant expédition.',
    knownLocations: ['Calix · lune extérieure de Caelus', 'Mine Calix'],
    hazards: 'Conditions thermiques extrêmes, éloignement logistique et contraintes importantes sur les équipements de forage.',
    discoveredBy: 'Prospecteurs de la ceinture externe de Caelus', discoveryContext: 'Confirmé après plusieurs campagnes de prospection sur Calix.',
  },
  {
    id: 'vanadium-varda', name: 'Vanadium', category: 'strategic', family: 'Métal d’alliage', rarity: 'Peu commune',
    description: 'Varda abrite des concentrations diffuses de vanadium réparties dans de longues strates minérales. L’exploitation suit donc de vastes tranchées plutôt que des puits ponctuels.',
    properties: 'Améliore fortement la dureté et la résistance à la fatigue de certains alliages tout en restant utilisable en faibles proportions.',
    knownUses: ['Alliages renforcés', 'Structures soumises à des cycles répétés', 'Composants mécaniques de précision'],
    collection: 'Décapage de longues bandes de roche, broyage puis séparation chimique du minerai.',
    knownLocations: ['Varda · lune de Caelus', 'Tranchée V-6'],
    hazards: 'Les poussières issues du traitement doivent être confinées et les zones ouvertes sont sensibles aux impacts de micrométéorites.',
    discoveredBy: 'Exploitants Humanis de Varda', discoveryContext: 'Ressource cataloguée lors de l’ouverture des premières tranchées industrielles.',
  },
  {
    id: 'palladium-tethra', name: 'Palladium', category: 'strategic', family: 'Métal du groupe du platine', rarity: 'Rare',
    description: 'Téthra renferme de petits volumes de palladium à forte concentration. Sa faible taille a favorisé une exploitation très localisée autour de quelques puits profonds.',
    properties: 'Très bonne stabilité chimique et comportement catalytique remarquable dans plusieurs procédés industriels.',
    knownUses: ['Catalyseurs avancés', 'Capteurs de précision', 'Équipements électroniques spécialisés'],
    collection: 'Forage profond, extraction sélective puis raffinage poussé afin de limiter les pertes de matière.',
    knownLocations: ['Téthra · lune de Caelus', 'Puits T-4'],
    hazards: 'Puits étroits, environnement sans atmosphère et forte valeur scientifique des échantillons imposant des procédures strictes.',
    discoveredBy: 'Équipe de prospection de Téthra', discoveryContext: 'Détecté lors des relevés géologiques préparant l’installation du relais minier.',
  },
  {
    id: 'iridium-bronte', name: 'Iridium', category: 'rare', family: 'Métal du groupe du platine', rarity: 'Rare',
    description: 'Bronté possède des poches d’iridium inhabituellement riches pour une lune de cette taille. Les meilleurs filons se trouvent dans des couches anciennes proches du manteau rocheux.',
    properties: 'Très dense, extrêmement résistant à la corrosion et stable à haute température.',
    knownUses: ['Contacts électriques de haute fiabilité', 'Revêtements résistants', 'Instrumentation scientifique exposée à des milieux agressifs'],
    collection: 'Extraction par puits profonds puis séparation du minerai dans des installations confinées.',
    knownLocations: ['Bronté · lune de Caelus', 'Puits B-1'],
    hazards: 'Travail en profondeur et forte densité du minerai, qui impose des équipements de manutention adaptés.',
    discoveredBy: 'Premiers prospecteurs de Bronté', discoveryContext: 'Les signatures denses de la lune ont motivé l’ouverture de l’un des premiers sites miniers de Caelus.',
  },
  {
    id: 'osmium-oros', name: 'Osmium', category: 'rare', family: 'Métal ultra-dense', rarity: 'Exceptionnelle',
    description: 'Oros est connue pour ses gisements profonds d’osmium. Le minerai apparaît en inclusions compactes disséminées dans des roches sombres particulièrement dures.',
    properties: 'L’un des métaux naturels les plus denses connus, très dur et très résistant à l’usure.',
    knownUses: ['Pièces de précision fortement sollicitées', 'Masses compactes', 'Applications scientifiques nécessitant une très forte densité'],
    collection: 'Forages renforcés à grande profondeur. Les fragments extraits sont manipulés en faibles volumes avant raffinage sur Argos.',
    knownLocations: ['Oros · lune de Caelus', 'Puits Profond O-2'],
    hazards: 'Extraction lente, profondeur importante et manipulation prudente requise lors du traitement de certains composés du minerai.',
    discoveredBy: 'Équipes profondes d’Oros', discoveryContext: 'La densité anormale de certains relevés a conduit à des forages exploratoires puis à l’ouverture du Puits O-2.',
  },
]

export const anomalies: AnomalyEntry[] = [
  {
    id: 'anomaly-a01', designation: 'Anomalie A-01', location: 'Secteur à documenter', danger: 'Modéré', status: 'Stable',
    discoveredBy: 'Équipage à documenter', discoveryContext: 'RP de découverte à relier ultérieurement.',
    description: 'Phénomène réellement observé et documenté. Cette description est temporaire et sert à tester la structure.',
    observations: ['Observation scientifique à documenter.', 'Comportement reproductible à confirmer.'],
    knownEffects: ['Effet connu à documenter.'], theories: ['Théorie de travail à documenter.'],
  },
  {
    id: 'anomaly-b07', designation: 'Anomalie B-07', location: 'Système à documenter', danger: 'Extrême', status: 'Instable',
    discoveredBy: 'À documenter', discoveryContext: 'À documenter.',
    description: 'Entrée de test destinée à représenter une anomalie plus dangereuse et encore mal comprise.',
    observations: ['Variations importantes entre deux relevés.'], knownEffects: ['Perturbation de capteurs à documenter.'], theories: ['Origine inconnue.'],
  },
  {
    id: 'anomaly-c12', designation: 'Anomalie C-12', location: 'Localisation inconnue', danger: 'Mortel', status: 'Inconnue',
    discoveredBy: 'À documenter', discoveryContext: 'À documenter.',
    description: 'Entrée de démonstration pour vérifier l’affichage d’un phénomène dont le statut actuel est inconnu.',
    observations: ['Données insuffisantes.'], knownEffects: ['Effets à confirmer.'], theories: ['Aucune théorie dominante.'],
  },
]
