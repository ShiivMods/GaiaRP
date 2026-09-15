import { useMemo, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { CharacterProfile } from '../characters/characterData'
import { currentChapterId, isVisibleAtChapter, planets, sectors, systems, systemObjects } from '../../world/data'
import { blueprintForCharacter } from './shipData'
import type { ShipComponentOption, ShipSlotDefinition, ShipSlotKind } from './shipData'

export function ShipModificationOverlay({ currentCharacter, combatLocked, onClose }: { currentCharacter: CharacterProfile; combatLocked: boolean; onClose: () => void }) {
  const blueprint = blueprintForCharacter(currentCharacter)
  const canEdit = currentCharacter.isCaptain && !combatLocked
  const [equipped, setEquipped] = useState<Record<string, string>>(() => Object.fromEntries(blueprint.slots.map((slot) => [slot.id, slot.defaultId])))
  const [selectedSlotId, setSelectedSlotId] = useState(blueprint.slots[0]?.id ?? '')

  const installed = useMemo(() => blueprint.slots.map((slot) => {
    const selectedId = equipped[slot.id] ?? slot.defaultId
    return { slot, component: slot.options.find((option) => option.id === selectedId) ?? slot.options[0] }
  }), [blueprint, equipped])

  const stats = useMemo(() => {
    const result = { ...blueprint.base, powerCapacity: 0, powerUse: 0, propulsion: '—', ammo: new Set<string>(), technology: new Set<string>() }
    installed.forEach(({ component }) => {
      result.firepower += component.firepower ?? 0
      result.speed += component.speed ?? 0
      result.dodge += component.dodge ?? 0
      result.shield += component.shield ?? 0
      result.shieldRegen += component.shieldRegen ?? 0
      result.hull += component.hull ?? 0
      result.armor += component.armor ?? 0
      result.armorRegen += component.armorRegen ?? 0
      result.crew += component.crew ?? 0
      result.firingPosts += component.firingPosts ?? 0
      result.powerCapacity += component.powerCapacity ?? 0
      result.powerUse += component.powerUse ?? 0
      if (component.propulsion) result.propulsion = component.propulsion
      if (component.ammo) result.ammo.add(component.ammo)
      if (component.technology) result.technology.add(component.technology)
    })
    return result
  }, [blueprint, installed])

  const selected = installed.find(({ slot }) => slot.id === selectedSlotId) ?? installed[0]
  const remainingPower = stats.powerCapacity - stats.powerUse

  const installComponent = (slotId: string, componentId: string) => {
    if (!canEdit) return
    setEquipped((current) => ({ ...current, [slotId]: componentId }))
  }

  return (
    <div className="ship-config-overlay" style={{ '--ship-accent': blueprint.accent } as CSSProperties}>
      <div className="ship-config-header">
        <div>
          <div className="ship-config-kicker">FICHE VAISSEAU · {canEdit ? 'MODIFICATION CAPITAINE' : 'CONSULTATION'}</div>
          <h2>{currentCharacter.shipName} <span>· {blueprint.role} · {blueprint.tier}</span></h2>
        </div>
        <div className="ship-config-header-actions">
          {combatLocked && <span className="ship-config-lock">COMBAT · MODIFICATIONS VERROUILLÉES</span>}
          {!currentCharacter.isCaptain && <span className="ship-config-readonly">LECTURE SEULE</span>}
          <button onClick={onClose}>Fermer ×</button>
        </div>
      </div>

      <div className={`ship-config-board ${blueprint.id}`}>
        <div className="ship-slot-column ship-slot-left">
          {installed.filter(({ slot }) => slot.area === 'left').map(({ slot, component }) => <ShipConfigSlot key={slot.id} slot={slot} component={component} selected={slot.id === selectedSlotId} onSelect={() => setSelectedSlotId(slot.id)} />)}
        </div>

        <div className="ship-config-center">
          <div className="ship-slot-row">
            {installed.filter(({ slot }) => slot.area === 'top').map(({ slot, component }) => <ShipConfigSlot key={slot.id} slot={slot} component={component} selected={slot.id === selectedSlotId} onSelect={() => setSelectedSlotId(slot.id)} compact />)}
          </div>
          <div className="ship-image-frame">
            <img src={blueprint.image} alt={`Vaisseau ${currentCharacter.shipName}`} />
            <div className="ship-image-shade" />
            <div className="ship-image-label"><strong>{currentCharacter.shipName}</strong><span>{blueprint.role} · {blueprint.tier}</span></div>
          </div>
          <div className="ship-slot-row ship-slot-row-bottom">
            {installed.filter(({ slot }) => slot.area === 'bottom').map(({ slot, component }) => <ShipConfigSlot key={slot.id} slot={slot} component={component} selected={slot.id === selectedSlotId} onSelect={() => setSelectedSlotId(slot.id)} compact />)}
          </div>
        </div>

        <div className="ship-slot-column ship-slot-right">
          {installed.filter(({ slot }) => slot.area === 'right').map(({ slot, component }) => <ShipConfigSlot key={slot.id} slot={slot} component={component} selected={slot.id === selectedSlotId} onSelect={() => setSelectedSlotId(slot.id)} />)}
        </div>
      </div>

      <div className="ship-config-lower">
        <div className="ship-stat-sheet">
          <div className="ship-stat-title">Feuille statistique dynamique</div>
          <div className="ship-stat-grid">
            <ShipStat label="Puissance de feu / tour" value={stats.firepower} />
            <ShipStat label="Vitesse" value={stats.speed} />
            <ShipStat label="Esquive / tour" value={`${stats.dodge}%`} />
            <ShipStat label="Capacité bouclier" value={stats.shield} />
            <ShipStat label="Régén. bouclier / tour" value={stats.shieldRegen} />
            <ShipStat label="Intégrité coque" value={stats.hull} />
            {stats.armor > 0 && <ShipStat label="Blindage" value={stats.armor} />}
            {stats.armor > 0 && <ShipStat label="Régén. blindage / tour" value={stats.armorRegen} />}
            <ShipStat label="Postes de tir" value={stats.firingPosts} />
            <ShipStat label="Capacité équipage" value={stats.crew} />
            <ShipStat label="Technologie" value={Array.from(stats.technology).join(', ') || 'Aucune'} />
            <ShipStat label="Alimentation" value={`${remainingPower} / ${stats.powerCapacity}`} danger={remainingPower < 0} />
            <ShipStat label="Munitions" value={Array.from(stats.ammo).join(', ') || 'Aucune'} />
            <ShipStat label="Propulsion" value={stats.propulsion} />
          </div>
        </div>

        <div className="ship-component-panel">
          {selected ? <>
            <div className="ship-component-head"><span>{selected.slot.label}</span>{selected.slot.required && <b>SYSTÈME OBLIGATOIRE</b>}</div>
            <h3>{selected.component.name}</h3>
            <p>{selected.component.description}</p>
            <div className="ship-component-power">Consommation : <b>{selected.component.powerUse ?? 0} pt</b>{selected.component.powerCapacity ? <> · Capacité moteur : <b>{selected.component.powerCapacity} pts</b></> : null}</div>
            {canEdit ? <div className="ship-component-options">
              {selected.slot.options.map((option) => <button key={option.id} className={option.id === selected.component.id ? 'active' : ''} onClick={() => installComponent(selected.slot.id, option.id)}><strong>{option.name}</strong><small>{option.description}</small></button>)}
            </div> : <div className="ship-component-readonly">{combatLocked ? 'Consultation autorisée en combat, toute modification est verrouillée.' : 'Seul le capitaine peut remplacer les équipements.'}</div>}
          </> : null}
        </div>
      </div>
    </div>
  )
}

function ShipConfigSlot({ slot, component, selected, onSelect, compact = false }: { slot: ShipSlotDefinition; component: ShipComponentOption; selected: boolean; onSelect: () => void; compact?: boolean }) {
  const empty = component.id === 'empty'
  return <button className={`ship-config-slot ${selected ? 'selected' : ''} ${empty ? 'empty' : ''} ${compact ? 'compact' : ''}`} onClick={onSelect} title={`${slot.label} · ${component.name}`}><span className="ship-slot-icon">{shipSlotGlyph(slot.kind)}</span><span className="ship-slot-copy"><b>{slot.label}</b><small>{component.name}</small></span>{slot.required && <em>REQ.</em>}</button>
}

function shipSlotGlyph(kind: ShipSlotKind) {
  if (kind === 'engine') return '⚡'
  if (kind === 'scanner') return '⌁'
  if (kind === 'thrusters') return '➤'
  if (kind === 'shield') return '◇'
  if (kind === 'crew') return '◫'
  if (kind === 'paint') return '◐'
  if (kind === 'armor') return '⬡'
  if (kind === 'pilotWeapon' || kind === 'gunnerWeapon') return '⌖'
  return '◆'
}

function ShipStat({ label, value, danger = false }: { label: string; value: string | number; danger?: boolean }) {
  return <div className={danger ? 'danger' : ''}><span>{label}</span><b>{typeof value === 'number' ? value.toLocaleString('fr-FR') : value}</b></div>
}

type ShipCrewView = 'players' | 'npcs'
type ShipContractView = 'total' | 'players' | 'npcs'
type ShipLocationMode = 'docked' | 'orbit' | 'space'
type ShipTargetKind = 'body' | 'station'
type ShipSystemPickerStep = 'closed' | 'sector' | 'system'

export function ShipInspector({ currentCharacter, onOpenConfiguration }: { currentCharacter: CharacterProfile; onOpenConfiguration: () => void }) {
  const isCaptain = currentCharacter.isCaptain
  const shipBlueprint = blueprintForCharacter(currentCharacter)
  const isCrewMember = Boolean(currentCharacter.shipName)
  const [crewFinanceVisible, setCrewFinanceVisible] = useState(true)
  const [crewView, setCrewView] = useState<ShipCrewView>('players')
  const [contractView, setContractView] = useState<ShipContractView>('total')
  const [locationMode, setLocationMode] = useState<ShipLocationMode>('docked')
  const [selectedSectorId, setSelectedSectorId] = useState('tochaku')
  const [selectedSystemId, setSelectedSystemId] = useState('starlight')
  const [systemPickerStep, setSystemPickerStep] = useState<ShipSystemPickerStep>('closed')
  const [targetKind, setTargetKind] = useState<ShipTargetKind>('body')
  const [targetId, setTargetId] = useState('stl-2')

  // Le combat sera plus tard alimenté par le sous-système de combat spatial.
  // Il reste volontairement en lecture seule dans ce panneau.
  const combatDetected = currentCharacter.shipName === 'VVF Azur' // donnée test simulant un signal du futur système de combat
  const technicalState = [
    { label: 'Coque', current: 6720, max: 8000 },
    { label: 'Boucliers', current: 5000, max: 5000 },
    { label: 'Propulsion', current: 2750, max: 5000 }, // 55 % : test jaune
    { label: 'Armement & modules', current: 960, max: 4000 }, // 24 % : test rouge
  ]
  const crewCounts: Record<ShipCrewView, { current: number; capacity: number }> = {
    players: { current: 5, capacity: 8 },
    npcs: { current: 3, capacity: 8 },
  }
  const contractValues: Record<ShipContractView, number> = {
    total: 82600,
    players: 51600,
    npcs: 31000,
  }
  const contractLabels: Record<ShipContractView, string> = {
    total: 'Valeur totale',
    players: 'PJ cumulés',
    npcs: 'PNJ cumulés',
  }

  // Pour cette première version, seuls les secteurs cartographiés et les systèmes
  // déjà visibles dans le Prologue peuvent être sélectionnés par le capitaine.
  const selectableSectors = useMemo(
    () => sectors.filter((sector) => sector.states[currentChapterId] === 'mapped'),
    [],
  )
  const selectableSystems = useMemo(
    () => systems.filter((system) => system.sectorId === selectedSectorId && isVisibleAtChapter(system.firstVisibleChapter, currentChapterId)),
    [selectedSectorId],
  )
  const selectedSector = sectors.find((sector) => sector.id === selectedSectorId)
  const selectedSystem = systems.find((system) => system.id === selectedSystemId)

  const bodyTargets = useMemo(() => {
    const planetTargets = planets
      .filter((planet) => planet.systemId === selectedSystemId && isVisibleAtChapter(planet.firstVisibleChapter, currentChapterId))
      .map((planet) => ({ id: planet.id, name: planet.name, type: planet.type }))
    const moonTargets = systemObjects
      .filter((object) => object.systemId === selectedSystemId && object.kind === 'moon' && isVisibleAtChapter(object.firstVisibleChapter, currentChapterId))
      .map((object) => ({ id: object.id, name: object.name, type: object.type }))
    return [...planetTargets, ...moonTargets]
  }, [selectedSystemId])

  const stationTargets = useMemo(
    () => systemObjects
      .filter((object) => object.systemId === selectedSystemId && (object.kind === 'station' || object.kind === 'habitat') && isVisibleAtChapter(object.firstVisibleChapter, currentChapterId))
      .map((object) => ({ id: object.id, name: object.name, type: object.type })),
    [selectedSystemId],
  )
  const activeTargets = targetKind === 'body' ? bodyTargets : stationTargets
  const selectedTarget = activeTargets.find((target) => target.id === targetId)

  const chooseSector = (sectorId: string) => {
    setSelectedSectorId(sectorId)
    setSystemPickerStep('system')
  }

  const chooseSystem = (systemId: string) => {
    setSelectedSystemId(systemId)
    setSystemPickerStep('closed')

    const nextBodies = [
      ...planets
        .filter((planet) => planet.systemId === systemId && isVisibleAtChapter(planet.firstVisibleChapter, currentChapterId))
        .map((planet) => ({ id: planet.id, name: planet.name })),
      ...systemObjects
        .filter((object) => object.systemId === systemId && object.kind === 'moon' && isVisibleAtChapter(object.firstVisibleChapter, currentChapterId))
        .map((object) => ({ id: object.id, name: object.name })),
    ]
    const nextStations = systemObjects
      .filter((object) => object.systemId === systemId && (object.kind === 'station' || object.kind === 'habitat') && isVisibleAtChapter(object.firstVisibleChapter, currentChapterId))
      .map((object) => ({ id: object.id, name: object.name }))

    if (nextBodies.length) {
      setTargetKind('body')
      setTargetId(nextBodies[0].id)
    } else if (nextStations.length) {
      setTargetKind('station')
      setTargetId(nextStations[0].id)
    } else {
      setTargetId('')
    }
  }

  const chooseTargetKind = (kind: ShipTargetKind) => {
    setTargetKind(kind)
    const nextTargets = kind === 'body' ? bodyTargets : stationTargets
    setTargetId(nextTargets[0]?.id ?? '')
  }

  const locationName = selectedTarget?.name ?? ''
  const statusLabel = combatDetected
    ? 'En combat'
    : locationMode === 'space'
      ? 'Dans l’espace'
      : locationMode === 'orbit'
        ? `En orbite de ${locationName || 'destination à sélectionner'}`
        : `Amarré sur ${locationName || 'destination à sélectionner'}`
  const lockedByCombat = combatDetected
  const positionLabel = `${selectedSector?.name ?? 'Secteur inconnu'} · ${selectedSystem?.name ?? 'Système inconnu'}`

  return (
    <div className="ship-panel cozy-panel">
      <div className="inspector-kicker">INFOS VAISSEAU · DONNÉES TEST</div>
      <div className="ship-name-row"><div><h2>{currentCharacter.shipName}</h2><span>{shipBlueprint.role} · {shipBlueprint.tier}</span></div><div className={`ship-status ${combatDetected ? 'danger' : 'good'}`}>{combatDetected ? 'EN COMBAT' : 'OPÉRATIONNEL'}</div></div>
      <p className="description">État, équipage et gestion rapide du vaisseau lié au personnage connecté.</p>

      <SectionLabel>État général</SectionLabel>
      {technicalState.map((item) => <ShipMeter key={item.label} label={item.label} current={item.current} max={item.max} />)}

      <div className="ship-core-data">
        <div><span>Capitaine</span><b>{isCaptain ? currentCharacter.name : 'Donnée équipage test'}</b></div>
        <div className="ship-crew-row">
          <span>Équipage</span>
          <div className="ship-inline-value"><b>{crewCounts[crewView].current} / {crewCounts[crewView].capacity}</b><SegmentSwitch value={crewView} options={[["players", 'PJ'], ['npcs', 'PNJ']]} onChange={(value) => setCrewView(value as ShipCrewView)} /></div>
        </div>
        <div>
          <span>Position</span>
          {isCaptain && !combatDetected
            ? <button className="ship-position-trigger" onClick={() => setSystemPickerStep((step) => step === 'closed' ? 'sector' : 'closed')} title="Modifier le secteur et le système">{positionLabel}</button>
            : <b>{positionLabel}</b>}
        </div>
        <div><span>Statut</span><b className={combatDetected ? 'status-danger-text' : ''}>{statusLabel}</b></div>
      </div>
      <div className="ship-minimum-crew">Minimum opérationnel du modèle : <b>4 membres d’équipage</b></div>

      {isCaptain && !combatDetected && systemPickerStep !== 'closed' && (
        <div className="ship-system-picker">
          <div className="ship-picker-heading">
            <span>{systemPickerStep === 'sector' ? '1 · Sélection Secteur' : '2 · Sélection Système'}</span>
            {systemPickerStep === 'system' && <button onClick={() => setSystemPickerStep('sector')}>← Secteurs</button>}
          </div>
          <div className="ship-picker-options">
            {systemPickerStep === 'sector'
              ? selectableSectors.map((sector) => <button key={sector.id} className={sector.id === selectedSectorId ? 'active' : ''} onClick={() => chooseSector(sector.id)}>{sector.name}</button>)
              : selectableSystems.map((system) => <button key={system.id} className={system.id === selectedSystemId ? 'active' : ''} onClick={() => chooseSystem(system.id)}>{system.name}</button>)}
          </div>
          {systemPickerStep === 'system' && selectableSystems.length === 0 && <small>Aucun système sélectionnable dans ce secteur.</small>}
        </div>
      )}

      {isCaptain && !combatDetected && (
        <div className="ship-status-editor">
          <div className="ship-status-editor-title">Mise à jour capitaine</div>
          <label>
            <span>État</span>
            <select value={locationMode} onChange={(event) => setLocationMode(event.target.value as ShipLocationMode)}>
              <option value="docked">Amarré sur</option>
              <option value="orbit">En orbite de</option>
              <option value="space">Dans l’espace</option>
            </select>
          </label>
          {locationMode !== 'space' && (
            <div className="ship-location-selectors">
              <label>
                <span>Type de destination</span>
                <select value={targetKind} onChange={(event) => chooseTargetKind(event.target.value as ShipTargetKind)}>
                  <option value="body">Astre</option>
                  <option value="station">Station</option>
                </select>
              </label>
              <label>
                <span>{targetKind === 'body' ? 'Astre du système' : 'Station du système'}</span>
                <select value={targetId} onChange={(event) => setTargetId(event.target.value)} disabled={activeTargets.length === 0}>
                  {activeTargets.length === 0
                    ? <option value="">Aucune destination renseignée</option>
                    : activeTargets.map((target) => <option key={target.id} value={target.id}>{target.name} · {target.type}</option>)}
                </select>
              </label>
            </div>
          )}
        </div>
      )}

      <SectionLabel>Finances du vaisseau</SectionLabel>
      <div className="finance-card ship-finance-card">
        <div><span>Fonds du vaisseau</span><strong>{currentCharacter.shipFunds.toLocaleString('fr-FR')} ¤</strong></div>
        <small>Ces fonds appartiennent au vaisseau. Leur gestion reste réservée au capitaine.</small>
        {isCaptain ? <button className="finance-visibility" onClick={() => setCrewFinanceVisible((value) => !value)}>Visibilité équipage : <b>{crewFinanceVisible ? 'Oui' : 'Non'}</b></button> : <div className="finance-visibility readonly">Visibilité équipage : <b>{crewFinanceVisible ? 'Oui' : 'Non'}</b></div>}
      </div>

      <div className="ship-contract-card">
        <div className="ship-contract-head"><span>Contrats actuels</span><b>{contractValues[contractView].toLocaleString('fr-FR')} ¤</b></div>
        <SegmentSwitch value={contractView} options={[["total", 'Total'], ['players', 'PJ'], ['npcs', 'PNJ']]} onChange={(value) => setContractView(value as ShipContractView)} />
        <small>{contractLabels[contractView]} des sommes promises sur les contrats en cours.</small>
      </div>

      <SectionLabel>Résumé</SectionLabel>
      <div className="ship-mini-grid"><div><b>2</b><span>Armes</span></div><div><b>4</b><span>Modules</span></div><div><b>3</b><span>RP liés</span></div></div>

      <div className="ship-action-grid">
        {isCrewMember && <button className="edit-primary" onClick={onOpenConfiguration}>{isCaptain && !lockedByCombat ? 'Modifier le vaisseau' : 'Consulter la fiche'}</button>}
        {isCrewMember && <button className="ship-secondary-action" disabled={lockedByCombat} onClick={() => alert('Prototype : inventaire du vaisseau à venir.')}>{lockedByCombat ? 'Inventaire verrouillé' : 'Inventaire Vaisseau'}</button>}
        {isCrewMember && !isCaptain && <button className="ship-secondary-action" onClick={() => alert('Prototype : consultation du contrat du personnage avec cet équipage.')}>Mon contrat</button>}
        {isCaptain && <button className="ship-secondary-action" onClick={() => alert('Prototype : gestion de l’équipage, recrutement, renvoi et rôles RP.')}>Gestion équipage</button>}
      </div>
      {lockedByCombat && <div className="ship-combat-lock">Combat détecté : modification et inventaire temporairement verrouillés.</div>}

      <SectionLabel>Statistiques du vaisseau</SectionLabel>
      <div className="ship-stats-card">
        <div><span>Années de service</span><b>6 ans</b></div>
        <div><span>Propriétaires connus</span><b>2</b></div>
        <div><span>Missions accomplies</span><b>47</b></div>
        <div><span>Tracker</span><b className="tracker-active">Actif</b></div>
      </div>
      <div className="ship-tracker-note">Le tracker est actif par défaut. Seul un MJ pourra modifier cet état.</div>
      <DevNote />
    </div>
  )
}

function SegmentSwitch({ value, options, onChange }: { value: string; options: Array<[string, string]>; onChange: (value: string) => void }) {
  return <div className="ship-segment-switch">{options.map(([optionValue, label]) => <button key={optionValue} className={value === optionValue ? 'active' : ''} onClick={() => onChange(optionValue)}>{label}</button>)}</div>
}

function ShipMeter({ label, current, max }: { label: string; current: number; max: number }) {
  const value = Math.max(0, Math.min(100, Math.round((current / max) * 100)))
  const tone = value > 70 ? 'good' : value >= 30 ? 'warning' : 'danger'
  return <div className={`ship-meter ${tone}`}><div><span>{label}</span><b>{value}% <small>{current.toLocaleString('fr-FR')} / {max.toLocaleString('fr-FR')}</small></b></div><div className="ship-meter-track"><span style={{ width: `${value}%` }} /></div></div>
}


function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="section-label">{children}</div>
}

function DevNote() {
  return <div className="dev-note"><strong>Prototype V2</strong><span>Les noms et chiffres TEST restent des données temporaires destinées à éprouver l’interface.</span></div>
}
