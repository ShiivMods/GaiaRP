// DONNÉES ÉDITABLES : fil RP et messages de démonstration.
import { currentChapterId } from '../../world/data'

export type RpAccessMode = 'open' | 'invite'

export type RpMessage = {
  id: string
  authorId: string
  grandAvatarIndex?: number
  timestamp: string
  content: string
}

export type RpCombatInstance = {
  status: 'active' | 'completed'
  insertAfterMessageId: string
  opponent: string
  turns: number
  outcome: string
  summary: string
}

export type RpThread = {
  id: string
  title: string
  chapterId: string
  dateLabel: string
  status: 'Ouvert' | 'Fermé'
  accessMode: RpAccessMode
  creatorId: string
  participantIds: string[]
  invitedIds: string[]
  tags: string[]
  combat?: RpCombatInstance
  location: {
    kind: 'place' | 'space'
    placeId: string
    zoneId: string
    bodyId: string
    systemId: string
    place: string
    zone: string
    body: string
    system: string
    sector: string
  }
  messages: RpMessage[]
}

export const prototypeRp: RpThread = {
  id: 'aster-quiet-stop',
  title: 'Une escale trop calme',
  chapterId: currentChapterId,
  dateLabel: 'An 153 - Mois 1 - Semaine 1 - 18:42',
  status: 'Ouvert',
  accessMode: 'invite',
  creatorId: 'lysa',
  participantIds: ['lysa', 'nael', 'seris'],
  invitedIds: ['nael', 'seris'],
  tags: ['Civil', 'Aster', 'Soirée'],
  location: {
    kind: 'place',
    placeId: 'aster-crown-market',
    zoneId: 'elysia-aster',
    bodyId: 'stl-2',
    systemId: 'starlight',
    place: 'Marché de la Couronne',
    zone: 'Aster',
    body: 'Elysia',
    system: 'Starlight',
    sector: 'Tōchaku',
  },
  messages: [
    {
      id: 'rp-msg-1', authorId: 'lysa', timestamp: '18:42',
      content: 'Le Marché de la Couronne avait cette étrange manière de rester bruyant même lorsque personne ne semblait vraiment parler. Lysa ralentit devant une rangée d’échoppes encore éclairées, puis leva les yeux vers les verrières d’Aster. Pour une escale supposément banale, l’endroit lui paraissait beaucoup trop calme.\n\n[dialogue]Je vous préviens, si cette permission finit encore en enquête, je facture les heures supplémentaires.[/dialogue]',
    },
    {
      id: 'rp-msg-2', authorId: 'nael', timestamp: '18:49',
      content: 'Nael arriva quelques minutes plus tard, un gobelet chaud à la main et l’air de quelqu’un qui n’avait absolument pas remarqué l’atmosphère étrange. Il salua Lysa d’un geste avant de suivre son regard vers les passerelles supérieures.\n\n[dialogue]Si tu me dis qu’on est encore tombés sur quelque chose de louche pendant une permission, je remonte dans le vaisseau.[/dialogue]',
    },
    {
      id: 'rp-msg-3', authorId: 'seris', timestamp: '19:03',
      content: 'Seris ne répondit pas immédiatement. Elle observait une borne d’information dont l’écran répétait la même séquence depuis leur arrivée.\n\n[dialogue]Ce n’est peut-être rien.[/dialogue]\n\nUne courte pause.\n\n[dialogue]Mais le réseau local n’a enregistré aucun départ civil depuis quarante-sept minutes.[/dialogue]',
    },
  ],
}



export const completedCombatRp: RpThread = {
  id: 'starlight-after-action',
  title: 'Des étincelles dans le vide',
  chapterId: currentChapterId,
  dateLabel: 'An 153 - Mois 1 - Semaine 1 - 18:42',
  status: 'Fermé',
  accessMode: 'invite',
  creatorId: 'lysa',
  participantIds: ['lysa', 'nael', 'seris'],
  invitedIds: ['nael', 'seris'],
  tags: ['Espace', 'Combat', 'Starlight'],
  combat: {
    status: 'completed',
    insertAfterMessageId: 'combat-rp-msg-2',
    opponent: 'Contact hostile K-17',
    turns: 3,
    outcome: 'Victoire du VVF Raviolo',
    summary: 'Contact hostile contraint à la reddition. Raviolo : boucliers endommagés, aucune perte de coque.',
  },
  location: {
    kind: 'space',
    placeId: 'space-starlight',
    zoneId: '',
    bodyId: '',
    systemId: 'starlight',
    place: 'Espace de Starlight',
    zone: 'Espace interplanétaire',
    body: 'Aucun astre',
    system: 'Starlight',
    sector: 'Tōchaku',
  },
  messages: [
    {
      id: 'combat-rp-msg-1', authorId: 'lysa', timestamp: '22:14',
      content: 'Le Raviolo venait à peine de quitter le trafic orbital lorsqu’un écho non identifié avait coupé sa trajectoire. Lysa resta debout derrière le siège du pilote, les yeux fixés sur la silhouette sombre qui grossissait sur les capteurs.\n\n[dialogue]On ne tire pas les premiers. Mais tout le monde à son poste.[/dialogue]',
    },
    {
      id: 'combat-rp-msg-2', authorId: 'nael', timestamp: '22:17',
      content: 'Nael poussa les propulseurs latéraux juste assez pour offrir au vaisseau une trajectoire de fuite. Les premières signatures d’armement adverses rendirent pourtant l’intention du contact parfaitement claire.\n\n[dialogue]Ils verrouillent leurs armes. Je crois que la diplomatie vient de prendre fin.[/dialogue]',
    },
    {
      id: 'combat-rp-msg-3', authorId: 'seris', timestamp: '22:43',
      content: 'Lorsque le dernier signal hostile disparut enfin des écrans, Seris resta quelques secondes silencieuse devant les relevés du combat.\n\n[dialogue]Boucliers entamés, coque intacte. J’enregistre tout avant que quelqu’un prétende que c’était une rencontre de routine.[/dialogue]',
    },
    {
      id: 'combat-rp-msg-4', authorId: 'lysa', timestamp: '22:46',
      content: 'Lysa relâcha enfin ses épaules, puis observa le contact désormais immobile au loin, ses systèmes offensifs coupés.\n\n[dialogue]Très bien. On rentre. Et personne ne touche à mon rapport avant que j’aie trouvé une formulation qui ne commence pas par « encore ».[/dialogue]',
    },
  ],
}

export const rpThreads: RpThread[] = [prototypeRp, completedCombatRp]
