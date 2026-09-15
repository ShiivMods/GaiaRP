export type CombatAction = {
  id: string
  label: string
  description: string
  cost: number
  category: 'offense' | 'defense' | 'utility'
}

export type CombatCrewMember = {
  id: string
  name: string
  role: string
  ready: boolean
  orders?: string
  surrenderVote?: boolean
}

export type CombatShipState = {
  name: string
  role: string
  image: string
  accent: string
  hull: { current: number; max: number }
  shield: { current: number; max: number }
  armor: { current: number; max: number }
  propulsionIntegrity: number
  armamentIntegrity: number
  baseSpeed: number
  baseEvasion: number
  offensiveEquipmentCount: number
  crew: CombatCrewMember[]
}

export type CombatRpMessage = {
  id: string
  author: string
  mention: string
  text: string
  side: 'ally' | 'enemy'
  avatar: string
}

export type CombatArchiveTurn = {
  turn: number
  allyOrders: string[]
  enemyOrders: string[]
  events: Array<{ side: 'player' | 'enemy' | 'system'; label: string; text: string }>
  messages: CombatRpMessage[]
}

export const playerCombatShip: CombatShipState = {
  name: 'VVF Raviolo',
  role: 'Exploration · Tier I',
  image: '/ship-lysa-exploration.png',
  accent: '#69c4d9',
  hull: { current: 3000, max: 3000 },
  shield: { current: 4950, max: 5000 },
  armor: { current: 0, max: 0 },
  propulsionIntegrity: 100,
  armamentIntegrity: 100,
  baseSpeed: 58,
  baseEvasion: 55,
  offensiveEquipmentCount: 2,
  crew: [
    { id: 'lysa', name: 'Lysa Arven', role: 'Capitaine', ready: false },
    { id: 'nael', name: 'Nael Coris', role: 'Pilote', ready: true, orders: 'Esquive de trajectoire + correction d’angle' },
    { id: 'crew-test-1', name: 'Mira Sol', role: 'Systèmes', ready: false, surrenderVote: true },
    { id: 'crew-test-2', name: 'Jonas Venn', role: 'Canonnier', ready: false, surrenderVote: true },
  ],
}

export const enemyCombatShip: CombatShipState = {
  name: 'Contact hostile K-17',
  role: 'Combat · Modèle inconnu',
  image: '/ship-seris-combat.png',
  accent: '#cf6f78',
  hull: { current: 7600, max: 7600 },
  shield: { current: 4200, max: 4200 },
  armor: { current: 2800, max: 2800 },
  propulsionIntegrity: 88,
  armamentIntegrity: 92,
  baseSpeed: 135,
  baseEvasion: 70,
  offensiveEquipmentCount: 3,
  crew: [
    { id: 'enemy-1', name: 'Poste A', role: 'Commandement', ready: true },
    { id: 'enemy-2', name: 'Poste B', role: 'Pilotage', ready: true },
    { id: 'enemy-3', name: 'Poste C', role: 'Armement', ready: true },
  ],
}

export const completedPlayerCombatShip: CombatShipState = {
  ...playerCombatShip,
  shield: { current: 3610, max: 5000 },
  propulsionIntegrity: 100,
  armamentIntegrity: 100,
  crew: playerCombatShip.crew.map((member) => ({ ...member, ready: false, surrenderVote: false })),
}

export const completedEnemyCombatShip: CombatShipState = {
  ...enemyCombatShip,
  shield: { current: 0, max: 4200 },
  armor: { current: 1900, max: 2800 },
  hull: { current: 7600, max: 7600 },
  propulsionIntegrity: 58,
  armamentIntegrity: 46,
  crew: enemyCombatShip.crew.map((member) => ({ ...member, ready: false })),
}

export const combatActions: CombatAction[] = [
  { id: 'fire', label: 'Tir principal', description: 'Effectue un tir avec l’armement actuellement opérationnel.', cost: 1, category: 'offense' },
  { id: 'double-fire', label: 'Double salve', description: 'Deux tirs successifs. Mobilise toute l’attention du poste offensif.', cost: 2, category: 'offense' },
  { id: 'evasion', label: 'Manœuvre d’esquive', description: 'Augmente fortement les chances d’éviter les tirs reçus pendant ce tour.', cost: 1, category: 'defense' },
  { id: 'shield-boost', label: 'Renforcer les boucliers', description: 'Détourne temporairement de l’énergie vers la protection du vaisseau.', cost: 1, category: 'defense' },
  { id: 'scan', label: 'Analyse tactique', description: 'Révèle progressivement les informations techniques du vaisseau adverse.', cost: 1, category: 'utility' },
]

export const previousTurnEvents = [
  { side: 'player' as const, label: 'VVF Raviolo', text: 'Double salve engagée. Les deux tirs sont évités par la manœuvre adverse.' },
  { side: 'enemy' as const, label: 'Contact K-17', text: 'Un tir adverse atteint le Raviolo pour 50 dégâts.' },
  { side: 'player' as const, label: 'VVF Raviolo', text: 'Boucliers : 5 000 → 4 950. Aucune autre avarie.' },
  { side: 'player' as const, label: 'Analyse tactique', text: 'Le scanner obtient une première estimation de la vitesse et des équipements offensifs visibles du contact.' },
]

export const combatRpMessages: CombatRpMessage[] = [
  { id: 'combat-rp-1', author: 'Lysa Arven', mention: 'Passerelle', text: 'Ils ont anticipé nos tirs. Rechargez et préparez-moi une autre approche.', side: 'ally', avatar: '/lysa-dialogue-realistic.png' },
  { id: 'combat-rp-2', author: 'Nael Coris', mention: 'Intercom', text: 'Leur poussée latérale est supérieure à nos relevés. Je peux les forcer à corriger leur trajectoire.', side: 'ally', avatar: '/character-dialogue-avatar.png' },
  { id: 'combat-rp-3', author: 'Contact K-17', mention: 'Canal externe', text: 'VVF Raviolo, coupez vos armes et dérivez en attente d’inspection.', side: 'enemy', avatar: '/character-grand-avatar.png' },
  { id: 'combat-rp-4', author: 'Lysa Arven', mention: 'Canal externe', text: 'Vaisseau non identifié, coupez vos armes et transmettez votre identification.', side: 'ally', avatar: '/lysa-dialogue-realistic.png' },
]

export const completedCombatTurns: CombatArchiveTurn[] = [
  {
    turn: 1,
    allyOrders: ['Double salve', 'Analyse tactique'],
    enemyOrders: ['Manœuvre d’esquive', 'Tir principal'],
    events: [
      { side: 'player', label: 'VVF Raviolo', text: 'Les deux tirs du Raviolo sont évités.' },
      { side: 'enemy', label: 'Contact K-17', text: 'Un tir touche le bouclier du Raviolo pour 50 dégâts.' },
      { side: 'player', label: 'Scanner', text: 'Premières données tactiques obtenues sur le contact hostile.' },
    ],
    messages: [
      { id: 'archive-1-a', author: 'Lysa Arven', mention: 'Passerelle', text: 'Gardez-le dans l’axe. Je veux savoir ce qu’on a devant nous avant de recommencer.', side: 'ally', avatar: '/lysa-dialogue-realistic.png' },
      { id: 'archive-1-b', author: 'Contact K-17', mention: 'Canal externe', text: 'Dernier avertissement. Réduisez votre poussée et coupez vos systèmes offensifs.', side: 'enemy', avatar: '/character-grand-avatar.png' },
    ],
  },
  {
    turn: 2,
    allyOrders: ['Tir principal', 'Renforcement bouclier'],
    enemyOrders: ['Tir principal', 'Tir principal'],
    events: [
      { side: 'player', label: 'VVF Raviolo', text: 'Le tir coordonné retire 1 200 points au bouclier adverse.' },
      { side: 'enemy', label: 'Contact K-17', text: 'La riposte inflige 540 dégâts au bouclier du Raviolo.' },
      { side: 'system', label: 'État', text: 'Raviolo : 4 410 boucliers. K-17 : 3 000 boucliers.' },
    ],
    messages: [
      { id: 'archive-2-a', author: 'Nael Coris', mention: 'Intercom', text: 'Ils compensent mal sur bâbord. Donnez-moi quelques secondes et je les maintiens devant les canons.', side: 'ally', avatar: '/character-dialogue-avatar.png' },
      { id: 'archive-2-b', author: 'Lysa Arven', mention: 'Passerelle', text: 'Fais-le. Systèmes, gardez le bouclier stable.', side: 'ally', avatar: '/lysa-dialogue-realistic.png' },
    ],
  },
  {
    turn: 3,
    allyOrders: ['Salve concentrée', 'Maintien de trajectoire'],
    enemyOrders: ['Tir principal', 'Renforcement bouclier'],
    events: [
      { side: 'player', label: 'VVF Raviolo', text: 'La salve concentrée détruit les 3 000 points de bouclier restants et retire 900 points de blindage.' },
      { side: 'enemy', label: 'Contact K-17', text: 'La dernière riposte inflige 800 dégâts au bouclier du Raviolo.' },
      { side: 'system', label: 'Reddition', text: 'Le Contact K-17 transmet un signal de reddition. L’attaque est interrompue et la reddition est acceptée.' },
    ],
    messages: [
      { id: 'archive-3-a', author: 'Contact K-17', mention: 'Canal externe', text: 'Nous cessons le feu. Nos armes sont coupées. Confirmez réception.', side: 'enemy', avatar: '/character-grand-avatar.png' },
      { id: 'archive-3-b', author: 'Lysa Arven', mention: 'Canal externe', text: 'Reddition reçue. Maintenez vos systèmes offensifs hors ligne et attendez nos instructions.', side: 'ally', avatar: '/lysa-dialogue-realistic.png' },
    ],
  },
]
