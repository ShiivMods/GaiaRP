// DONNÉES ÉDITABLES : personnages de démonstration du prototype.
export type CharacterProfile = {
  id: string
  name: string
  dynasty: string
  faction: string
  factionColor: string
  rank: string
  shipName: string
  species: string
  age: string
  height: string
  weight: string
  bio: string
  personality: string
  grandAvatar: string
  dialogueAvatars: string[]
  personalFunds: number
  shipFunds: number
  isCaptain: boolean
}

export const characterProfiles: CharacterProfile[] = [
  {
    id: 'lysa',
    name: 'Lysa Arven',
    dynasty: 'Dynastie Arven',
    faction: 'Humanis',
    factionColor: '#69c4d9',
    rank: 'Commandante du VVF Raviolo',
    shipName: 'VVF Raviolo',
    species: 'Humain',
    age: '31 ans',
    height: '1,72 m',
    weight: '64 kg',
    bio: 'Capitaine d’exploration affectée aux routes périphériques de Starlight. Texte entièrement temporaire pour tester le volume de la fiche.',
    personality: 'Curieuse, pragmatique et très attachée à son équipage. Cette zone accueillera plus tard le texte libre du joueur.',
    grandAvatar: '/lysa-grand-realistic.png',
    dialogueAvatars: ['/lysa-dialogue-realistic.png'],
    personalFunds: 3240,
    shipFunds: 18450,
    isCaptain: true,
  },
  {
    id: 'seris',
    name: 'Seris Vaelor',
    dynasty: 'Dynastie Vaelor',
    faction: 'Primordia',
    factionColor: '#c890ff',
    rank: 'Observatrice du VVF Mnémosyne',
    shipName: 'VVF Mnémosyne',
    species: 'Humain',
    age: '27 ans',
    height: '1,68 m',
    weight: '58 kg',
    bio: 'Archiviste de terrain spécialisée dans les vestiges et relevés de bordure. Fiche de démonstration destinée au test du switch de personnage.',
    personality: 'Réservée, méticuleuse et fascinée par les anomalies. Elle parle peu, mais observe tout.',
    grandAvatar: '/character-grand-avatar.png',
    dialogueAvatars: [],
    personalFunds: 1710,
    shipFunds: 9200,
    isCaptain: false,
  },
  {
    id: 'nael',
    name: 'Nael Coris',
    dynasty: 'Dynastie Coris',
    faction: 'Humanis',
    factionColor: '#69c4d9',
    rank: 'Pilote du VVF Azur',
    shipName: 'VVF Azur',
    species: 'Humain',
    age: '24 ans',
    height: '1,81 m',
    weight: '73 kg',
    bio: 'Pilote d’escorte intégré à une cellule de reconnaissance. Profil test servant à vérifier plusieurs personnages sur le même compte.',
    personality: 'Impulsif, sociable et volontaire. Il aime les approches directes et les décisions rapides.',
    grandAvatar: '/character-grand-avatar.png',
    dialogueAvatars: ['/character-dialogue-avatar.png'],
    personalFunds: 860,
    shipFunds: 6300,
    isCaptain: false,
  },
]

