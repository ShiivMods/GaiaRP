import { useMemo, useState } from 'react'
import type { CSSProperties, ChangeEvent } from 'react'
import type { CharacterProfile } from '../characters/characterData'
import {
  combatActions,
  combatRpMessages,
  completedCombatTurns,
  completedEnemyCombatShip,
  completedPlayerCombatShip,
  enemyCombatShip,
  playerCombatShip,
  previousTurnEvents,
} from './combatData'
import type { CombatAction, CombatCrewMember, CombatRpMessage, CombatShipState } from './combatData'
import { armamentPerformance, propulsionPerformance } from './combatRules'

type PlayerCommitment = 'none' | 'ready' | 'surrender'

export function CombatPage({ currentCharacter, onBack, completed = false }: { currentCharacter: CharacterProfile; onBack: () => void; completed?: boolean }) {
  const [selectedActions, setSelectedActions] = useState<string[]>(['evasion'])
  const [commitment, setCommitment] = useState<PlayerCommitment>('none')
  const [mention, setMention] = useState('')
  const [draft, setDraft] = useState('')
  const actionBudget = 2
  const activePlayerShip = completed ? completedPlayerCombatShip : playerCombatShip
  const activeEnemyShip = completed ? completedEnemyCombatShip : enemyCombatShip
  const currentCrewMember = playerCombatShip.crew.find((member) => member.id === currentCharacter.id) ?? playerCombatShip.crew[0]

  const spent = useMemo(() => selectedActions.reduce((sum, id) => sum + (combatActions.find((action) => action.id === id)?.cost ?? 0), 0), [selectedActions])
  const selectedActionLabels = useMemo(() => selectedActions.map((id) => combatActions.find((action) => action.id === id)?.label).filter(Boolean) as string[], [selectedActions])

  const toggleAction = (action: CombatAction) => {
    if (commitment !== 'none') return
    if (selectedActions.includes(action.id)) {
      setSelectedActions((items) => items.filter((id) => id !== action.id))
      return
    }
    if (spent + action.cost > actionBudget) return
    setSelectedActions((items) => [...items, action.id])
  }

  const ready = commitment === 'ready'
  const surrender = commitment === 'surrender'
  const ownReady = playerCombatShip.crew.filter((member) => member.id !== currentCrewMember.id && member.ready).length + (ready ? 1 : 0)
  const ownReadyMax = playerCombatShip.crew.length
  const enemyReady = enemyCombatShip.crew.filter((member) => member.ready).length
  const finalReady = !ready && ownReady + 1 >= ownReadyMax && enemyReady >= enemyCombatShip.crew.length
  const surrenderVotes = playerCombatShip.crew.filter((member) => member.id !== currentCrewMember.id && member.surrenderVote).length + (surrender ? 1 : 0)
  const surrenderMajority = surrenderVotes > ownReadyMax / 2
  const surrenderSuspended = surrenderMajority && enemyReady >= enemyCombatShip.crew.length

  const toggleReady = () => {
    if (ready) {
      setCommitment('none')
      return
    }
    if (selectedActions.length === 0) return
    if (finalReady) {
      const confirmed = window.confirm('Tous les participants concernés sont prêts. Valider déclenchera la résolution du tour. Continuer ?')
      if (!confirmed) return
    }
    setCommitment('ready')
  }

  const toggleSurrender = () => setCommitment((value) => value === 'surrender' ? 'none' : 'surrender')

  return (
    <main className="combat-page">
      <section className="combat-shell">
        <header className="combat-page-head">
          <div>
            <button className="combat-back" onClick={onBack}>‹ Retour au RP</button>
            <div className="eyebrow">INSTANCE MÉCANIQUE · COMBAT SPATIAL · PROTOTYPE VISUEL</div>
            <h2>Engagement dans l’espace de Starlight</h2>
          </div>
          <div className={`combat-turn-state ${completed ? 'completed' : ''}`}><small>{completed ? 'INSTANCE' : 'TOUR ACTUEL'}</small><strong>{completed ? '✓' : '02'}</strong><span>{completed ? 'Combat terminé' : surrenderSuspended ? 'Combat suspendu' : 'Choix des actions'}</span></div>
        </header>

        <section className="combat-versus">
          <ShipCombatCard ship={activePlayerShip} side="player" status={completed ? 'Rapport final' : `${ownReady} / ${ownReadyMax} prêts`} revealSystems />
          <div className="combat-versus-center"><span>VS</span><b>{completed ? 'ARCHIVE DE COMBAT' : 'ORDRES SIMULTANÉS'}</b><small>{completed ? 'Instance terminée, conservée dans la chronologie du RP.' : 'Les choix adverses restent masqués jusqu’à la résolution.'}</small></div>
          <ShipCombatCard ship={activeEnemyShip} side="enemy" status={completed ? 'Reddition acceptée' : `${enemyReady} / ${enemyCombatShip.crew.length} prêts`} revealSystems={completed} scanned={!completed} />
        </section>

        {completed ? <CompletedCombatArchive /> : (
          <>
            {surrenderSuspended && <div className="combat-surrender-banner"><b>REDDITION MAJORITAIRE</b><span>Le signal a été transmis. Les adversaires avaient déjà validé leurs ordres : le combat est suspendu jusqu’à la décision de leur capitaine.</span></div>}
            <section className="combat-control-grid">
              <div className="combat-actions-panel">
                <div className="combat-section-heading">
                  <div><span>POSTE ACTIF</span><b>{currentCharacter.name} · {currentCrewMember.role}</b></div>
                  <div className="combat-ap"><span>POINTS D’ACTION</span><b>{actionBudget - spent} / {actionBudget}</b></div>
                </div>
                <div className="combat-action-list">
                  {combatActions.map((action) => {
                    const selected = selectedActions.includes(action.id)
                    const unavailable = !selected && spent + action.cost > actionBudget
                    return <button key={action.id} className={`combat-action ${selected ? 'selected' : ''} ${action.category}`} disabled={commitment !== 'none' || unavailable} onClick={() => toggleAction(action)}><div><strong>{action.label}</strong><span>{action.description}</span></div><b>{action.cost} PA</b></button>
                  })}
                </div>
                <div className="combat-order-summary">
                  <div><span>Ordres sélectionnés</span><b>{selectedActionLabels.length ? selectedActionLabels.join(' + ') : 'Aucun ordre'}</b><small>{commitment === 'none' ? 'Les ordres restent modifiables jusqu’à validation.' : surrender ? 'Vote de reddition actif. Ready est indisponible.' : 'Ready peut être annulé tant que le tour n’est pas résolu.'}</small></div>
                  <div className="combat-commit-actions">
                    <button className={ready ? 'ready-toggle is-ready' : 'ready-toggle'} disabled={surrender || (!ready && selectedActions.length === 0)} onClick={toggleReady}>{ready ? 'Annuler Ready' : finalReady ? 'Valider Ready' : 'Ready'}</button>
                    <button className={surrender ? 'surrender-toggle active' : 'surrender-toggle'} disabled={ready} onClick={toggleSurrender}>{surrender ? 'Annuler reddition' : 'Se rendre'}</button>
                  </div>
                </div>
              </div>

              <aside className="combat-ready-panel">
                <div className="combat-section-heading compact"><div><span>READY CHECK & REDDITION</span><b>Équipages engagés</b></div></div>
                <div className="combat-ready-layout">
                  <ReadyGroup title={playerCombatShip.name} side="ally" count={`${ownReady}/${ownReadyMax}`} crew={playerCombatShip.crew} currentMemberId={currentCrewMember.id} currentReady={ready} currentSurrender={surrender} currentOrders={ready ? selectedActionLabels.join(' + ') : ''} />
                  <ReadyGroup title={enemyCombatShip.name} side="enemy" count={`${enemyReady}/${enemyCombatShip.crew.length}`} crew={enemyCombatShip.crew} />
                </div>
                <div className="combat-ready-note compact-note"><span>{surrenderVotes}/{ownReadyMax}</span><p>Votes de reddition du Raviolo. Une majorité suspend les actions du vaisseau et transmet immédiatement le signal à l’adversaire.</p></div>
              </aside>
            </section>

            <section className="combat-history">
              <div className="combat-history-head"><div><span>TOUR 01</span><h3>Résolution précédente</h3></div><b>TERMINÉ</b></div>
              <div className="combat-event-list">{previousTurnEvents.map((event, index) => <div key={`${event.label}-${index}`} className={`combat-event ${event.side}`}><span>{event.label}</span><p>{event.text}</p></div>)}</div>
            </section>
            <CombatRpSection messages={combatRpMessages} mention={mention} draft={draft} onMention={setMention} onDraft={setDraft} onPublish={() => { setDraft(''); setMention('') }} />
          </>
        )}
      </section>
    </main>
  )
}

function ReadyGroup({ title, side, count, crew, currentMemberId, currentReady = false, currentSurrender = false, currentOrders = '' }: { title: string; side: 'ally' | 'enemy'; count: string; crew: CombatCrewMember[]; currentMemberId?: string; currentReady?: boolean; currentSurrender?: boolean; currentOrders?: string }) {
  return <section className={`combat-ready-group ${side}`}><div className="combat-ready-group-head"><b>{title}</b><span>{count} prêts</span></div><div className="combat-crew-ready compact-grid">{crew.map((member) => {
    const isCurrent = member.id === currentMemberId
    const memberReady = isCurrent ? currentReady : member.ready
    const memberSurrender = isCurrent ? currentSurrender : Boolean(member.surrenderVote)
    const memberOrders = isCurrent ? currentOrders : member.orders
    return <div key={member.id} className={memberReady ? 'ready' : memberSurrender ? 'surrender' : ''}><span><b>{member.name}</b><small>{member.role}</small>{side === 'ally' && memberReady && memberOrders && <em>{memberOrders}</em>}</span><strong>{memberSurrender ? 'REDDITION' : memberReady ? 'PRÊT' : 'ATTENTE'}</strong></div>
  })}</div></section>
}

function ShipCombatCard({ ship, side, status, revealSystems = false, scanned = false }: { ship: CombatShipState; side: 'player' | 'enemy'; status: string; revealSystems?: boolean; scanned?: boolean }) {
  const propulsion = propulsionPerformance(ship.propulsionIntegrity)
  const armament = armamentPerformance(ship.armamentIntegrity)
  const effectiveSpeed = Math.round(ship.baseSpeed * propulsion.speedMultiplier)
  const effectiveEvasion = Math.round(ship.baseEvasion * propulsion.evasionMultiplier)
  return <article className={`combat-ship-card ${side}`} style={{ '--combat-accent': ship.accent } as CSSProperties}>
    <div className="combat-ship-image"><img src={ship.image} alt="" /></div>
    <div className="combat-ship-title"><div><span>{ship.role}</span><h3>{ship.name}</h3></div><b>{status}</b></div>
    <CombatStat label="Coque" current={ship.hull.current} max={ship.hull.max} />
    <CombatStat label="Boucliers" current={ship.shield.current} max={ship.shield.max} />
    <CombatStat label="Blindage" current={ship.armor.current} max={ship.armor.max} emptyLabel="Aucun" />
    {side === 'player' || revealSystems ? <div className="combat-observed-row exact"><div><span>Propulsion</span><b>{ship.propulsionIntegrity}%</b><small>Vitesse {effectiveSpeed} · Esquive {effectiveEvasion}%</small></div><div><span>Armement</span><b>{ship.armamentIntegrity}%</b><small>Dégâts {Math.round(armament.damageMultiplier * 100)}%</small></div></div> : <div className="combat-observed-row"><div><span>Vitesse estimée</span><b>{scanned ? `≈ ${effectiveSpeed}` : '???'}</b><small>{scanned ? 'Première estimation scanner' : 'Non analysée'}</small></div><div><span>Équipements offensifs visibles</span><b>{ship.offensiveEquipmentCount}</b><small>Observation visuelle uniquement</small></div></div>}
  </article>
}

function CombatStat({ label, current, max, emptyLabel }: { label: string; current: number; max: number; emptyLabel?: string }) {
  const percent = max > 0 ? Math.round((current / max) * 100) : 0
  return <div className="combat-stat"><div><span>{label}</span><b>{max > 0 ? `${current.toLocaleString('fr-FR')} / ${max.toLocaleString('fr-FR')}` : emptyLabel ?? '—'}</b></div><div className="combat-stat-track"><span style={{ width: `${percent}%` }} /></div></div>
}

function CompletedCombatArchive() {
  return <>
    <section className="combat-completed-summary"><div><span>RÉSULTAT</span><h3>Victoire du VVF Raviolo par reddition</h3><p>Le Contact hostile K-17 a cessé le feu après la perte de ses boucliers et une brèche importante dans son blindage. La coque du Raviolo est restée intacte.</p></div><div className="combat-completed-metrics"><span><b>3</b>Tours</span><span><b>0</b>Dégât coque</span><span><b>1 390</b>Bouclier perdu</span></div></section>
    <section className="combat-archive-timeline">{completedCombatTurns.map((turn) => <article className="combat-archive-turn" key={turn.turn}><header><div><span>TOUR {String(turn.turn).padStart(2, '0')}</span><h3>Ordres révélés & résolution</h3></div><b>ARCHIVÉ</b></header><div className="combat-archive-orders"><div><span>VVF Raviolo</span>{turn.allyOrders.map((order) => <b key={order}>{order}</b>)}</div><div className="enemy"><span>Contact K-17</span>{turn.enemyOrders.map((order) => <b key={order}>{order}</b>)}</div></div><div className="combat-event-list">{turn.events.map((event, index) => <div key={`${turn.turn}-${index}`} className={`combat-event ${event.side}`}><span>{event.label}</span><p>{event.text}</p></div>)}</div>{turn.messages.length > 0 && <CombatRpFeed messages={turn.messages} />}</article>)}</section>
  </>
}

function CombatRpFeed({ messages }: { messages: CombatRpMessage[] }) {
  return <div className="combat-rp-feed">{messages.map((message) => <article key={message.id} className={`combat-message ${message.side}`}><img src={message.avatar} alt="" /><div className="combat-message-bubble"><header><b>{message.author}</b><span className={message.mention === 'Canal externe' ? 'external' : ''}>&lt; {message.mention} &gt;</span></header><p>« {message.text} »</p></div></article>)}</div>
}

function CombatRpSection({ messages, mention, draft, onMention, onDraft, onPublish }: { messages: CombatRpMessage[]; mention: string; draft: string; onMention: (value: string) => void; onDraft: (value: string) => void; onPublish: () => void }) {
  return <section className="combat-rp-interlude"><div className="combat-rp-head"><div><span>INTERLUDE RP · ENTRE LES TOURS</span><h3>Communications & réactions</h3></div><small>Optionnel · dialogues courts</small></div><CombatRpFeed messages={messages} /><div className="combat-rp-composer"><div><label>MENTION OPTIONNELLE</label><select value={mention} onChange={(event: ChangeEvent<HTMLSelectElement>) => onMention(event.target.value)}><option value="">Aucune</option><option>Canal externe</option><option>Intercom</option><option>Passerelle</option><option>Poste de tir</option></select></div><textarea value={draft} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onDraft(event.target.value)} placeholder="Quelques lignes de dialogue ou de réaction entre deux tours…" /><button disabled={!draft.trim()} onClick={onPublish}>Publier</button></div></section>
}
