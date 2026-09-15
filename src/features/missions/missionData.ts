// DONNÉES ÉDITABLES : contrats et missions de démonstration.
export type MissionBrief = {
  id: string
  channel: 'Humanis'
  title: string
  type: string
  reward: string
  destination: [string, string, string]
  difficulty: 'Routine' | 'Standard' | 'Risquée'
  tone: 'low' | 'medium' | 'high'
  timeLeft: string
  description: string
}

export const missionBoard: MissionBrief[] = [
  {
    id: 'humanis-relay',
    channel: 'Humanis',
    title: 'Le relais silencieux',
    type: 'Reconnaissance',
    reward: '4 800 ¤',
    destination: ['Tōchaku', 'Starlight', 'Alecto'],
    difficulty: 'Standard',
    tone: 'medium',
    timeLeft: '338 h',
    description: 'Un relais de télémétrie situé sur la trajectoire d’Alecto a cessé d’émettre. Humanis recherche un équipage capable de rejoindre la zone, d’établir l’origine de la panne et de ramener les données du relais. Le contrat privilégie l’observation et la récupération plutôt que l’affrontement.',
  },
  {
    id: 'humanis-argos',
    channel: 'Humanis',
    title: 'Fret prioritaire Argos',
    type: 'Transport',
    reward: '3 200 ¤',
    destination: ['Tōchaku', 'Starlight', 'Argos'],
    difficulty: 'Routine',
    tone: 'low',
    timeLeft: '126 h',
    description: 'Argos attend plusieurs composants de maintenance avant la prochaine rotation minière de Caelus. Le fret est peu sensible mais doit être livré dans les délais afin d’éviter l’arrêt d’une chaîne de raffinage.',
  },
  {
    id: 'humanis-vespera',
    channel: 'Humanis',
    title: 'Fenêtre sur Vespera',
    type: 'Exploration',
    reward: '7 600 ¤',
    destination: ['Tōchaku', 'Starlight', 'Vespera'],
    difficulty: 'Risquée',
    tone: 'high',
    timeLeft: '214 h',
    description: 'Une fenêtre atmosphérique inhabituelle offre quelques jours d’accès à une région encore peu documentée de Vespera. Humanis cherche un équipage volontaire pour effectuer une descente, poser des balises et revenir avec des relevés exploitables.',
  },
]

