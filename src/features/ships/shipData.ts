import { assetUrl } from '../../utils/assets'
// DONNÉES ÉDITABLES : modèles de vaisseaux, slots, composants et bonus.
import type { CharacterProfile } from '../characters/characterData'

export type ShipSlotKind = 'engine' | 'scanner' | 'thrusters' | 'shield' | 'crew' | 'paint' | 'module' | 'armor' | 'pilotWeapon' | 'gunnerWeapon'

export type ShipComponentStats = {
  firepower?: number
  speed?: number
  dodge?: number
  shield?: number
  shieldRegen?: number
  hull?: number
  armor?: number
  armorRegen?: number
  crew?: number
  firingPosts?: number
  powerCapacity?: number
  powerUse?: number
}

export type ShipComponentOption = ShipComponentStats & {
  id: string
  name: string
  description: string
  propulsion?: string
  ammo?: string
  technology?: string
}

export type ShipSlotDefinition = {
  id: string
  label: string
  kind: ShipSlotKind
  required?: boolean
  area: 'left' | 'top' | 'right' | 'bottom'
  defaultId: string
  options: ShipComponentOption[]
}

export type ShipBlueprint = {
  id: string
  role: string
  tier: string
  image: string
  accent: string
  base: Required<Pick<ShipComponentStats, 'firepower' | 'speed' | 'dodge' | 'shield' | 'shieldRegen' | 'hull' | 'armor' | 'armorRegen' | 'crew' | 'firingPosts'>>
  slots: ShipSlotDefinition[]
}

const emptyModule: ShipComponentOption = { id: 'empty', name: 'Emplacement vide', description: 'Aucun module installé.', powerUse: 0 }

export const explorationBlueprint: ShipBlueprint = {
  id: 'exploration-t1', role: 'Exploration', tier: 'Tier I', image: assetUrl('/ship-lysa-exploration.png'), accent: '#69c4d9',
  base: { firepower: 2, speed: 40, dodge: 35, shield: 6000, shieldRegen: 0, hull: 3000, armor: 0, armorRegen: 0, crew: 4, firingPosts: 0 },
  slots: [
    { id: 'engine', label: 'Moteur', kind: 'engine', required: true, area: 'left', defaultId: 'engine-horizon-1', options: [
      { id: 'engine-horizon-1', name: 'Moteur Horizon I', description: 'Moteur standard fourni avec le vaisseau. Bonne réserve énergétique.', powerCapacity: 8 },
      { id: 'engine-horizon-2', name: 'Moteur Horizon II', description: 'Version améliorée, plus coûteuse mais capable d’alimenter davantage de modules.', powerCapacity: 11, speed: 2 },
    ] },
    { id: 'crew', label: 'Cabine d’équipage', kind: 'crew', area: 'left', defaultId: 'crew-standard', options: [
      { id: 'crew-standard', name: 'Cabines standard', description: 'Aménagement équilibré pour un équipage d’exploration.', crew: 1, powerUse: 0 },
      { id: 'crew-extended', name: 'Cabines étendues', description: 'Réduit les espaces de stockage au profit de deux couchettes supplémentaires.', crew: 3, powerUse: 1 },
    ] },
    { id: 'paint', label: 'Peinture', kind: 'paint', area: 'left', defaultId: 'paint-humanis', options: [
      { id: 'paint-humanis', name: 'Livrée Humanis', description: 'Peinture réglementaire claire utilisée sur de nombreux appareils Humanis.' },
      { id: 'paint-deep', name: 'Livrée profonde', description: 'Revêtement sombre pensé pour les longues opérations hors des routes principales.' },
    ] },
    { id: 'module-1', label: 'Module I', kind: 'module', area: 'top', defaultId: 'module-lab', options: [
      emptyModule,
      { id: 'module-lab', name: 'Laboratoire compact', description: 'Améliore les capacités scientifiques du bord.', powerUse: 2, technology: 'Analyse I' },
      { id: 'module-cargo', name: 'Soute optimisée', description: 'Augmente la capacité logistique sans consommation énergétique.', powerUse: 0 },
    ] },
    { id: 'module-2', label: 'Module II', kind: 'module', area: 'top', defaultId: 'module-nav', options: [
      emptyModule,
      { id: 'module-nav', name: 'Calculateur de navigation', description: 'Aide aux corrections de trajectoire et aux manœuvres complexes.', powerUse: 1, dodge: 8, speed: 4 },
      { id: 'module-repair', name: 'Atelier de réparation', description: 'Équipe le bord pour les réparations de campagne.', powerUse: 2, hull: 300 },
    ] },
    { id: 'module-3', label: 'Module III', kind: 'module', area: 'top', defaultId: 'empty', options: [
      emptyModule,
      { id: 'module-med', name: 'Infirmerie renforcée', description: 'Module médical autonome pour les missions prolongées.', powerUse: 1 },
      { id: 'module-defense', name: 'Contre-mesures', description: 'Suite défensive améliorant l’esquive du bâtiment.', powerUse: 2, dodge: 10 },
    ] },
    { id: 'scanner', label: 'Scanner', kind: 'scanner', required: true, area: 'right', defaultId: 'scanner-pathfinder', options: [
      { id: 'scanner-pathfinder', name: 'Scanner Pathfinder', description: 'Scanner d’exploration fiable, fourni d’origine.', powerUse: 1, technology: 'Scan I' },
      { id: 'scanner-deepsight', name: 'Scanner Deepsight', description: 'Suite de détection plus fine réduisant le risque de mauvaises surprises.', powerUse: 2, technology: 'Scan II' },
    ] },
    { id: 'thrusters', label: 'Propulseurs', kind: 'thrusters', required: true, area: 'right', defaultId: 'thruster-ion', options: [
      { id: 'thruster-ion', name: 'Propulseurs ioniques', description: 'Propulsion standard, souple et économe.', powerUse: 1, speed: 14, dodge: 12, propulsion: 'Ionique' },
      { id: 'thruster-plasma', name: 'Propulseurs plasma', description: 'Plus rapides, mais nettement plus énergivores.', powerUse: 3, speed: 25, dodge: 6, propulsion: 'Plasma' },
    ] },
    { id: 'shield', label: 'Générateur bouclier', kind: 'shield', required: true, area: 'right', defaultId: 'shield-aegis', options: [
      { id: 'shield-aegis', name: 'Bouclier Aegis I', description: 'Générateur défensif standard.', powerUse: 1, shield: 2500, shieldRegen: 0 },
      { id: 'shield-aegis-2', name: 'Bouclier Aegis II', description: 'Protection supérieure avec recharge lente intégrée.', powerUse: 3, shield: 4000, shieldRegen: 200 },
    ] },
  ],
}

export const combatBlueprint: ShipBlueprint = {
  id: 'combat-t2', role: 'Combat', tier: 'Tier II', image: assetUrl('/ship-seris-combat.png'), accent: '#cf6f78',
  base: { firepower: 70, speed: 80, dodge: 55, shield: 7000, shieldRegen: 100, hull: 12000, armor: 2500, armorRegen: 0, crew: 6, firingPosts: 1 },
  slots: [
    { id: 'engine', label: 'Moteur', kind: 'engine', required: true, area: 'left', defaultId: 'engine-warcore', options: [
      { id: 'engine-warcore', name: 'Moteur Warcore II', description: 'Cœur énergétique militaire prévu pour une forte charge de combat.', powerCapacity: 14 },
      { id: 'engine-warcore-plus', name: 'Moteur Warcore II+', description: 'Variante renforcée réservant plus de puissance aux systèmes offensifs.', powerCapacity: 17, speed: 3 },
    ] },
    { id: 'armor', label: 'Blindage', kind: 'armor', area: 'left', defaultId: 'armor-reactive', options: [
      { id: 'armor-reactive', name: 'Blindage réactif', description: 'Plaques multicouches conçues pour encaisser les impacts cinétiques.', powerUse: 1, armor: 7500, speed: -5, dodge: -5 },
      { id: 'armor-light', name: 'Blindage composite', description: 'Protection plus légère favorisant la mobilité.', powerUse: 0, armor: 4300, speed: 5 },
    ] },
    { id: 'module-1', label: 'Module', kind: 'module', area: 'bottom', defaultId: 'module-targeting', options: [
      emptyModule,
      { id: 'module-targeting', name: 'Ordinateur de ciblage', description: 'Optimise les solutions de tir.', powerUse: 2, firepower: 12, technology: 'Ciblage II' },
      { id: 'module-evasion', name: 'Suite de contre-mesures', description: 'Améliore la survie lors des engagements rapprochés.', powerUse: 2, dodge: 12 },
    ] },
    { id: 'pilot-weapon', label: 'Armement pilote', kind: 'pilotWeapon', area: 'top', defaultId: 'weapon-rail', options: [
      { id: 'weapon-rail', name: 'Canons cinétiques jumelés', description: 'Armes fixes contrôlées par le pilote.', powerUse: 2, firepower: 35, ammo: 'Cinétique' },
      { id: 'weapon-plasma', name: 'Lances plasma', description: 'Puissance supérieure au prix d’une forte consommation.', powerUse: 4, firepower: 52, ammo: 'Énergétique' },
    ] },
    { id: 'module-2', label: 'Module II', kind: 'module', area: 'top', defaultId: 'empty', options: [
      emptyModule,
      { id: 'module-capacitor', name: 'Condensateurs tactiques', description: 'Réserve énergétique tampon pour les systèmes défensifs.', powerUse: 2, shieldRegen: 250 },
    ] },
    { id: 'gunner-weapon', label: 'Armement poste de tir', kind: 'gunnerWeapon', area: 'top', defaultId: 'weapon-turret', options: [
      { id: 'weapon-turret', name: 'Tourelle cinétique lourde', description: 'Tourelle dédiée nécessitant un poste de tir.', powerUse: 3, firepower: 30, firingPosts: 1, ammo: 'Cinétique' },
      { id: 'weapon-missile', name: 'Batterie de missiles', description: 'Armement lourd à munitions guidées.', powerUse: 2, firepower: 44, firingPosts: 1, ammo: 'Missiles' },
    ] },
    { id: 'scanner', label: 'Scanner', kind: 'scanner', required: true, area: 'right', defaultId: 'scanner-combat', options: [
      { id: 'scanner-combat', name: 'Scanner tactique II', description: 'Scanner optimisé pour l’acquisition de cibles.', powerUse: 1, technology: 'Scan tactique II' },
      { id: 'scanner-predictive', name: 'Scanner prédictif', description: 'Suite améliorée d’analyse des signatures hostiles.', powerUse: 2, technology: 'Prédiction I' },
    ] },
    { id: 'thrusters', label: 'Propulseurs', kind: 'thrusters', required: true, area: 'right', defaultId: 'thruster-plasma-mk2', options: [
      { id: 'thruster-plasma-mk2', name: 'Propulseurs plasma II', description: 'Propulsion militaire rapide.', powerUse: 3, speed: 50, dodge: 17, propulsion: 'Plasma' },
      { id: 'thruster-ion-mk2', name: 'Propulseurs ioniques II', description: 'Alternative plus sobre et plus maniable.', powerUse: 2, speed: 35, dodge: 26, propulsion: 'Ionique' },
    ] },
    { id: 'shield', label: 'Générateur bouclier', kind: 'shield', required: true, area: 'right', defaultId: 'shield-bastion', options: [
      { id: 'shield-bastion', name: 'Bouclier Bastion II', description: 'Générateur militaire à haute capacité.', powerUse: 3, shield: 3000, shieldRegen: 200 },
      { id: 'shield-bastion-r', name: 'Bouclier Bastion-R', description: 'Capacité moindre mais recharge accélérée.', powerUse: 4, shield: 1800, shieldRegen: 450 },
    ] },
  ],
}

export function blueprintForCharacter(character: CharacterProfile) {
  if (character.id === 'seris') return combatBlueprint
  return explorationBlueprint
}

