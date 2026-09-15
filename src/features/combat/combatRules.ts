export type CombatDurability = { current: number; max: number }

export function integrityPercent(value: CombatDurability) {
  if (value.max <= 0) return 0
  return Math.max(0, Math.min(100, Math.round((value.current / value.max) * 100)))
}

export function propulsionPerformance(integrity: number) {
  const value = Math.max(0, Math.min(100, integrity))
  if (value === 0) return { speedMultiplier: 0, evasionMultiplier: 0, label: 'Arrêt' }
  if (value <= 20) return { speedMultiplier: 0.5, evasionMultiplier: 0.3, label: 'Critique' }
  if (value <= 65) return { speedMultiplier: 0.75, evasionMultiplier: 0.9, label: 'Dégradée' }
  return { speedMultiplier: 1, evasionMultiplier: 1, label: 'Nominale' }
}

export function armamentPerformance(integrity: number) {
  const value = Math.max(0, Math.min(100, integrity))
  if (value === 0) return { damageMultiplier: 0, label: 'Désactivé' }
  if (value <= 20) return { damageMultiplier: 0.5, label: 'Critique' }
  if (value <= 65) return { damageMultiplier: 0.75, label: 'Dégradé' }
  return { damageMultiplier: 1, label: 'Nominal' }
}

export function applyStandardDamage(
  damage: number,
  shield: CombatDurability,
  armor: CombatDurability,
  hull: CombatDurability,
) {
  let remaining = Math.max(0, damage)
  const nextShield = { ...shield }
  const nextArmor = { ...armor }
  const nextHull = { ...hull }

  const shieldDamage = Math.min(nextShield.current, remaining)
  nextShield.current -= shieldDamage
  remaining -= shieldDamage

  const armorDamage = Math.min(nextArmor.current, remaining)
  nextArmor.current -= armorDamage
  remaining -= armorDamage

  const hullDamage = Math.min(nextHull.current, remaining)
  nextHull.current -= hullDamage

  return {
    shield: nextShield,
    armor: nextArmor,
    hull: nextHull,
    destroyed: nextHull.current <= 0,
    absorbed: { shield: shieldDamage, armor: armorDamage, hull: hullDamage },
  }
}
