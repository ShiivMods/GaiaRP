// DONNÉES MONDE : zones planétaires et lieux RP.
export type RpPlace = {
  id: string
  name: string
  type: string
  x: number
  y: number
  description: string
  bannerTone: string
  status: string
  activeRps: number
}

export type PlanetZone = {
  id: string
  planetId?: string
  objectId?: string
  name: string
  kind: string
  x: number
  y: number
  description: string
  bannerTone: string
  climate: string
  faction: string
  places: RpPlace[]
  explored?: boolean
  adminName?: string
}

const p = (id: string, name: string, type: string, x: number, y: number, description: string, bannerTone: string, activeRps = 0, status = 'Accessible'): RpPlace => ({
  id, name, type, x, y, description, bannerTone, status, activeRps,
})

export const planetZones: PlanetZone[] = [
  // ELYSIA
  {
    id: 'elysia-verdant-plains', explored: true, planetId: 'stl-2', name: 'Plaines Verdoyantes', kind: 'Région naturelle', x: 392, y: 275,
    description: 'Une vaste région de plaines humides parcourues de rivières lentes, de bosquets anciens et de petites installations agricoles. La densité urbaine y reste faible malgré sa proximité avec les grands axes.',
    bannerTone: 'verdant', climate: 'Tempéré humide', faction: 'Humanis',
    places: [
      p('elysia-strange-tree', 'Arbre étrange', 'Site naturel', 500, 302, 'Un arbre solitaire aux dimensions anormales domine les plaines environnantes. Son âge exact reste débattu.', 'forest', 2),
      p('elysia-river-outpost', 'Avant-poste de la Rivière', 'Avant-poste', 340, 360, 'Petit poste de surveillance installé près d’un passage fluvial fréquenté par les convois civils.', 'river', 1),
      p('elysia-wind-farm', 'Ferme des Hauts-Vents', 'Domaine agricole', 430, 205, 'Domaine agricole isolé, connu pour ses cultures expérimentales et ses immenses turbines atmosphériques.', 'field'),
    ],
  },
  {
    id: 'elysia-aster', explored: true, planetId: 'stl-2', name: 'Aster', kind: 'Grande métropole', x: 610, y: 318,
    description: 'Première métropole d’Elysia et siège d’une grande partie des institutions de Starlight. Elle est traitée comme une zone afin de permettre des RP dans des quartiers précis.',
    bannerTone: 'city', climate: 'Urbain tempéré', faction: 'Humanis',
    places: [
      p('aster-spaceport', 'Spatioport de l’Aube', 'Spatioport', 475, 300, 'Principal nœud de transit orbital d’Aster. Civils, militaires et équipages marchands s’y croisent continuellement.', 'spaceport', 4, 'Ouvert'),
      p('aster-glass-quarter', 'Quartier des Verrières', 'Quartier résidentiel', 575, 225, 'Quartier vertical construit autour de galeries transparentes et de jardins suspendus.', 'glass', 2, 'Ouvert'),
      p('aster-crown-market', 'Marché de la Couronne', 'Quartier commercial', 360, 390, 'Réseau dense de commerces, de restaurants et de petites officines.', 'market', 1, 'Ouvert'),
      p('aster-civic-core', 'Cœur civique', 'District administratif', 560, 405, 'Siège des principales administrations de la colonie et de plusieurs ambassades internes à Humanis.', 'city', 1, 'Accès public partiel'),
    ],
  },
  {
    id: 'elysia-western-coast', explored: true, planetId: 'stl-2', name: 'Côte Occidentale', kind: 'Région côtière', x: 355, y: 455,
    description: 'Une côte rocheuse ponctuée de ports, de falaises et d’installations scientifiques tournées vers l’océan.',
    bannerTone: 'coast', climate: 'Océanique', faction: 'Humanis',
    places: [
      p('elysia-salt-harbor', 'Port des Salines', 'Port civil', 445, 285, 'Port civil spécialisé dans les transports côtiers et la maintenance de petits appareils.', 'harbor', 1, 'Ouvert'),
      p('elysia-white-cliffs', 'Falaises Blanches', 'Site naturel', 330, 385, 'Falaises calcaires battues par les vents, appréciées pour leur isolement et leur vue sur l’océan.', 'cliffs'),
    ],
  },
  {
    id: 'elysia-north-ridge', explored: true, planetId: 'stl-2', name: 'Crêtes du Nord', kind: 'Massif montagneux', x: 625, y: 205,
    description: 'Région montagneuse froide où les infrastructures humaines restent rares et dispersées.',
    bannerTone: 'mountain', climate: 'Froid d’altitude', faction: 'Humanis',
    places: [
      p('elysia-observatory-seven', 'Observatoire VII', 'Station scientifique', 470, 300, 'Observatoire isolé chargé du suivi atmosphérique et des phénomènes orbitaux inhabituels.', 'observatory', 1, 'Accès contrôlé'),
      p('elysia-pass', 'Passe de Kerys', 'Col de montagne', 610, 370, 'Route de haute altitude reliant plusieurs laboratoires et refuges.', 'mountain'),
    ],
  },

  // NÉRÉA
  {
    id: 'nerea-ash-sea', explored: true, objectId: 'stl-2-m1', name: 'Mer des Cendres', kind: 'Plaine lunaire', x: 365, y: 330,
    description: 'Immense étendue de régolithe sombre où les traces d’anciennes coulées d’impact restent parfaitement visibles.', bannerTone: 'moon', climate: 'Vide, -45 °C', faction: 'Humanis',
    places: [p('nerea-relay', 'Relais K-12', 'Relais de surface', 430, 300, 'Petit relais de communications et d’orientation pour les convois lunaires.', 'observatory'), p('nerea-crater-road', 'Piste des Cratères', 'Route lunaire', 340, 400, 'Voie balisée reliant les installations de la face visible.', 'moon')],
  },
  {
    id: 'nerea-kepler-dome', explored: true, objectId: 'stl-2-m1', name: 'Dôme Kepler', kind: 'Zone habitée', x: 610, y: 320,
    description: 'Principal noyau habité de Néréa. Le dôme regroupe observatoires, logements et infrastructures de secours.', bannerTone: 'city', climate: 'Habitat pressurisé', faction: 'Humanis',
    places: [p('nerea-kepler-hub', 'Forum Kepler', 'Centre civique', 500, 290, 'Cœur public du dôme, entouré de commerces et de services.', 'city', 1, 'Ouvert'), p('nerea-lunar-lab', 'Institut Sélénographique', 'Laboratoire', 620, 390, 'Centre de recherche consacré à la géologie de Néréa.', 'observatory')],
  },
  {
    id: 'nerea-clear-basin', explored: true, objectId: 'stl-2-m1', name: 'Bassin Clair', kind: 'Bassin d’impact', x: 525, y: 470,
    description: 'Grand bassin aux parois très réfléchissantes, utilisé comme terrain d’essai et zone d’entraînement.', bannerTone: 'moon', climate: 'Vide, -70 °C', faction: 'Humanis',
    places: [p('nerea-training', 'Terrain Borealis', 'Zone d’entraînement', 500, 330, 'Site d’entraînement en faible gravité utilisé par plusieurs unités de Starlight.', 'moon'), p('nerea-shelter', 'Refuge Clair-3', 'Refuge', 390, 420, 'Abri pressurisé minimal destiné aux équipes en transit.', 'observatory')],
  },

  // VESPERA
  {
    id: 'vespera-highlands', planetId: 'stl-1', name: 'Inexploré', adminName: 'Hauts Plateaux d’Ishtar', explored: false, kind: 'Plateaux basaltiques', x: 380, y: 255,
    description: 'Région élevée où la pression et la température restent un peu moins extrêmes. La plupart des installations permanentes de Vespera y sont concentrées.', bannerTone: 'desert', climate: 'Chaud et corrosif', faction: 'Humanis',
    places: [p('vespera-ishtar-base', 'Base Ishtar', 'Colonie pressurisée', 480, 310, 'Principal habitat de surface de Vespera.', 'industrial', 1, 'Pressurisé'), p('vespera-sulfur-lab', 'Laboratoire Soufre-9', 'Laboratoire', 350, 390, 'Installation d’étude atmosphérique et géochimique.', 'observatory')],
  },
  {
    id: 'vespera-cloud-sea', planetId: 'stl-1', name: 'Inexploré', adminName: 'Mer des Nuages', explored: false, kind: 'Couche atmosphérique', x: 610, y: 315,
    description: 'Zone de haute atmosphère parcourue par des plateformes aerostatiques et des stations de prélèvement.', bannerTone: 'sky', climate: 'Haute atmosphère', faction: 'Humanis',
    places: [p('vespera-aerostat', 'Plateforme Aurore', 'Habitat aérostatique', 500, 300, 'Plateforme suspendue dans une couche atmosphérique relativement stable.', 'spaceport', 1, 'Ouvert'), p('vespera-weather-array', 'Réseau Météore', 'Station scientifique', 620, 380, 'Ensemble de capteurs atmosphériques reliés à de petits ballons autonomes.', 'observatory')],
  },
  {
    id: 'vespera-basalt-belt', planetId: 'stl-1', name: 'Inexploré', adminName: 'Ceinture Basaltique', explored: false, kind: 'Région volcanique', x: 525, y: 470,
    description: 'Terrains volcaniques récents, riches en matériaux mais dangereux à parcourir.', bannerTone: 'volcanic', climate: 'Très chaud', faction: 'Humanis',
    places: [p('vespera-quarry', 'Carrière V-4', 'Site minier', 450, 320, 'Site d’extraction robotisé entretenu par une petite équipe humaine.', 'industrial'), p('vespera-shelter', 'Abri Caldera', 'Refuge', 590, 410, 'Refuge renforcé utilisé lors des tempêtes atmosphériques.', 'desert')],
  },

  // ALECTO
  {
    id: 'alecto-white-front', planetId: 'stl-3', name: 'Inexploré', adminName: 'Front Blanc', explored: false, kind: 'Étendue glaciaire', x: 355, y: 310,
    description: 'La partie gauche de la projection standard est dominée par des terres gelées, conséquence de l’inclinaison extrême d’Alecto.', bannerTone: 'ice', climate: 'Polaire', faction: 'Humanis',
    places: [p('alecto-iceport', 'Port de Glace', 'Spatioport secondaire', 430, 310, 'Petit spatioport bâti sur le socle rocheux sous la glace.', 'spaceport', 1), p('alecto-ice-lab', 'Station Krios', 'Station scientifique', 350, 410, 'Centre d’étude du climat et des glaces profondes.', 'observatory')],
  },
  {
    id: 'alecto-oblique-ridge', planetId: 'stl-3', name: 'Inexploré', adminName: 'Dorsale Oblique', explored: false, kind: 'Chaîne montagneuse', x: 500, y: 360,
    description: 'Long massif rocheux marquant approximativement la transition diagonale entre les régions froides et les bassins arides.', bannerTone: 'mountain', climate: 'Froid sec', faction: 'Humanis',
    places: [p('alecto-pass', 'Passe du Méridien', 'Colonie de transit', 500, 300, 'Nœud de transport entre les deux grands ensembles climatiques.', 'industrial', 1), p('alecto-mine', 'Mine Azur-12', 'Site minier', 610, 410, 'Mine profonde exploitant des veines métalliques sous la dorsale.', 'industrial')],
  },
  {
    id: 'alecto-red-basin', planetId: 'stl-3', name: 'Inexploré', adminName: 'Bassin Rouge', explored: false, kind: 'Désert minéral', x: 650, y: 350,
    description: 'Grande région aride de l’hémisphère chaud, couverte d’oxydes rouges et de canyons asséchés.', bannerTone: 'desert', climate: 'Aride', faction: 'Humanis',
    places: [p('alecto-red-city', 'Méridia', 'Ville coloniale', 500, 310, 'Plus grande ville d’Alecto, construite autour d’un réseau de cavités pressurisées.', 'city', 2), p('alecto-canyon', 'Canyon Serein', 'Site naturel', 620, 420, 'Canyon immense parcouru par les convois terrestres.', 'desert')],
  },
  {
    id: 'alecto-south-steppe', planetId: 'stl-3', name: 'Inexploré', adminName: 'Steppes Australes', explored: false, kind: 'Plateaux arides', x: 555, y: 500,
    description: 'Plateaux secs où se concentrent fermes sous serre, collecteurs d’eau et pistes de transport.', bannerTone: 'field', climate: 'Froid aride', faction: 'Humanis',
    places: [p('alecto-greenhouse', 'Complexe Verdant', 'Ferme sous serre', 450, 300, 'Grand complexe agricole pressurisé.', 'field'), p('alecto-truckstop', 'Relais Sud', 'Relais routier', 610, 420, 'Relais de maintenance et de repos pour les convois.', 'industrial')],
  },

  // LUNES D’ALECTO
  { id: 'iria-surface', objectId: 'stl-3-m1', name: 'Inexploré', adminName: 'Plateau d’Iria', explored: false, kind: 'Zone lunaire', x: 500, y: 360, description: 'Unique zone RP définie sur Iria pour le prototype.', bannerTone: 'moon', climate: 'Vide', faction: 'Humanis', places: [p('iria-prospect', 'Camp Prospecteur', 'Camp minier', 430, 300, 'Camp de prospection à faible gravité.', 'industrial'), p('iria-ridge', 'Crête 19', 'Site naturel', 590, 400, 'Crête rocheuse surplombant les installations.', 'moon')] },
  { id: 'tarsis-surface', objectId: 'stl-3-m2', name: 'Inexploré', adminName: 'Bassin Tarsis', explored: false, kind: 'Zone lunaire', x: 500, y: 360, description: 'Unique zone RP définie sur Tarsis pour le prototype.', bannerTone: 'moon', climate: 'Vide', faction: 'Humanis', places: [p('tarsis-depot', 'Dépôt T-2', 'Dépôt souterrain', 430, 310, 'Dépôt logistique installé dans une cavité naturelle.', 'industrial'), p('tarsis-observation', 'Balcon Minéral', 'Point d’observation', 600, 410, 'Corniche naturelle tournée vers Alecto.', 'moon')] },

  // LUNES MINIÈRES DE CAELUS : une zone = un minerai
  { id: 'bronte-iridium', explored: true, objectId: 'stl-4-m1', name: 'Iridium', kind: 'Zone minière', x: 500, y: 360, description: 'Zone d’extraction d’iridium couvrant les principaux puits de Bronté.', bannerTone: 'industrial', climate: 'Vide', faction: 'Humanis', places: [p('bronte-pit', 'Puits B-1', 'Mine', 430, 300, 'Puits principal d’extraction.', 'industrial'), p('bronte-camp', 'Camp Bronté', 'Habitat minier', 600, 405, 'Habitat pressurisé des équipes.', 'city')] },
  { id: 'kora-cobalt', explored: true, objectId: 'stl-4-m2', name: 'Cobalt', kind: 'Zone minière', x: 500, y: 360, description: 'Zone d’extraction du cobalt de Kora.', bannerTone: 'industrial', climate: 'Vide', faction: 'Humanis', places: [p('kora-gallery', 'Galerie K-7', 'Mine', 440, 300, 'Galerie automatisée à haut rendement.', 'industrial'), p('kora-freight', 'Terminal Cobalt', 'Terminal de fret', 600, 410, 'Point de chargement à destination d’Argos.', 'spaceport')] },
  { id: 'melia-titanium', explored: true, objectId: 'stl-4-m3', name: 'Titane', kind: 'Zone minière', x: 500, y: 360, description: 'Zone d’extraction du titane de Mélia.', bannerTone: 'industrial', climate: 'Très froid', faction: 'Humanis', places: [p('melia-quarry', 'Front de Taille M-3', 'Mine à ciel ouvert', 430, 305, 'Immense excavation industrielle.', 'industrial'), p('melia-hab', 'Module Mélia', 'Habitat minier', 600, 405, 'Petite base permanente.', 'city')] },
  { id: 'tethra-palladium', explored: true, objectId: 'stl-4-m4', name: 'Palladium', kind: 'Zone minière', x: 500, y: 360, description: 'Zone d’extraction du palladium de Téthra.', bannerTone: 'industrial', climate: 'Vide', faction: 'Humanis', places: [p('tethra-shaft', 'Puits T-4', 'Mine', 430, 305, 'Puits profond sous la croûte.', 'industrial'), p('tethra-relay', 'Relais Téthra', 'Relais logistique', 600, 405, 'Petit relais reliant la mine à Argos.', 'spaceport')] },
  { id: 'oros-osmium', explored: true, objectId: 'stl-4-m5', name: 'Osmium', kind: 'Zone minière', x: 500, y: 360, description: 'Zone d’extraction de l’osmium d’Oros.', bannerTone: 'industrial', climate: 'Vide', faction: 'Humanis', places: [p('oros-deep', 'Puits Profond O-2', 'Mine', 440, 300, 'Puits particulièrement profond et renforcé.', 'industrial'), p('oros-bunker', 'Bunker Oros', 'Habitat', 600, 410, 'Habitat enterré des équipes.', 'city')] },
  { id: 'varda-vanadium', explored: true, objectId: 'stl-4-m6', name: 'Vanadium', kind: 'Zone minière', x: 500, y: 360, description: 'Zone d’extraction du vanadium de Varda.', bannerTone: 'industrial', climate: 'Vide', faction: 'Humanis', places: [p('varda-strip', 'Tranchée V-6', 'Mine', 430, 300, 'Longue tranchée d’extraction.', 'industrial'), p('varda-dock', 'Dock Varda', 'Terminal de fret', 600, 405, 'Dock orbital de petite capacité.', 'spaceport')] },
  { id: 'calix-tungsten', explored: true, objectId: 'stl-4-m7', name: 'Tungstène', kind: 'Zone minière', x: 500, y: 360, description: 'Zone d’extraction du tungstène de Calix.', bannerTone: 'industrial', climate: 'Vide', faction: 'Humanis', places: [p('calix-mine', 'Mine Calix', 'Mine', 430, 300, 'Dernière grande exploitation du cortège de Caelus.', 'industrial'), p('calix-beacon', 'Balise extérieure', 'Balise de navigation', 600, 410, 'Balise marquant les limites de l’espace minier.', 'observatory')] },

  // NIVÉA ET SILEX
  { id: 'nivea-glass-ice', planetId: 'stl-5', name: 'Inexploré', adminName: 'Glaces de Verre', explored: false, kind: 'Plaine glacée', x: 420, y: 330, description: 'Plaine de glace translucide où se concentrent les rares installations de Nivéa.', bannerTone: 'ice', climate: 'Cryogénique', faction: 'Humanis', places: [p('nivea-lab', 'Station N-Prime', 'Station scientifique', 480, 310, 'Principal habitat de Nivéa.', 'observatory'), p('nivea-array', 'Champ d’Antennes', 'Réseau scientifique', 610, 410, 'Réseau d’antennes profondes.', 'ice')] },
  { id: 'nivea-dark-ridge', planetId: 'stl-5', name: 'Inexploré', adminName: 'Dorsale Noire', explored: false, kind: 'Massif glacé', x: 620, y: 420, description: 'Reliefs sombres dépassant de la croûte de glace.', bannerTone: 'mountain', climate: 'Cryogénique', faction: 'Humanis', places: [p('nivea-refuge', 'Refuge N-7', 'Refuge', 500, 340, 'Petit refuge de maintenance.', 'observatory')] },
  { id: 'silex-surface', objectId: 'stl-5-m1', name: 'Inexploré', adminName: 'Plaine Silex', explored: false, kind: 'Zone lunaire', x: 500, y: 360, description: 'Unique zone définie sur Silex.', bannerTone: 'ice', climate: 'Vide cryogénique', faction: 'Humanis', places: [p('silex-beacon', 'Balise S-1', 'Balise', 480, 330, 'Balise de navigation automatique.', 'observatory')] },
]

export const objectInteriorPlaces: Record<string, RpPlace[]> = {
  'elysia-defense': [
    p('bastion-command', 'Centre tactique', 'Centre de commandement', 500, 255, 'Salle de coordination défensive de l’orbite d’Elysia.', 'city', 1, 'Accès militaire'),
    p('bastion-hangars', 'Hangars d’interception', 'Hangars', 350, 375, 'Baies accueillant chasseurs et navettes d’intervention.', 'spaceport', 1, 'Accès contrôlé'),
    p('bastion-ring', 'Anneau d’équipage', 'Zone de vie', 650, 385, 'Quartiers de repos, mess et services du personnel.', 'city'),
    p('bastion-observation', 'Galerie d’observation', 'Galerie', 520, 500, 'Galerie blindée donnant sur Elysia et son trafic orbital.', 'observatory'),
  ],
  'helios-station': [
    p('helios-concourse', 'Grande coursive', 'Centre public', 500, 260, 'Cœur de circulation de la station Hélios.', 'city', 2, 'Ouvert'),
    p('helios-docks', 'Docks Hélios', 'Docks', 350, 380, 'Ensemble de quais civils et commerciaux.', 'spaceport', 2, 'Ouvert'),
    p('helios-customs', 'Douanes', 'Administration', 650, 375, 'Zone de contrôle des cargaisons et des équipages.', 'industrial', 1, 'Accès réglementé'),
    p('helios-commons', 'Carré des équipages', 'Zone de vie', 520, 500, 'Bars, cantines et petites boutiques fréquentés par les équipages de passage.', 'market', 2, 'Ouvert'),
  ],
  'argos-depot': [
    p('argos-docks', 'Docks de fret', 'Docks industriels', 500, 220, 'Immenses docks où convergent les cargaisons des sept lunes de Caelus.', 'spaceport', 2, 'Ouvert'),
    p('argos-refinery', 'Galeries de raffinage', 'Zone industrielle', 340, 330, 'Chaîne de tri et de prétraitement des minerais avant expédition.', 'industrial', 1, 'Accès contrôlé'),
    p('argos-operations', 'Tour des opérations', 'Centre de commandement', 660, 330, 'Centre logistique qui coordonne les rotations minières et le trafic local.', 'city', 1, 'Accès réglementé'),
    p('argos-concourse', 'Coursive des Mineurs', 'Zone de vie', 380, 500, 'Quartier animé mêlant logements, cantines et commerces.', 'market', 2, 'Ouvert'),
    p('argos-vaults', 'Entrepôts profonds', 'Stockage sécurisé', 620, 500, 'Réseau d’entrepôts creusés dans le cœur de l’astéroïde.', 'industrial', 1, 'Accès contrôlé'),
  ],
}

export const zonesForPlanet = (planetId: string) => planetZones.filter((zone) => zone.planetId === planetId)
export const zonesForObject = (objectId: string) => planetZones.filter((zone) => zone.objectId === objectId)
export const placesForObject = (objectId: string) => objectInteriorPlaces[objectId] ?? []
