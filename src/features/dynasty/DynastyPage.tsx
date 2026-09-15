import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { CharacterProfile } from '../characters/characterData'

export type DynastyTab = 'advantages' | 'genealogy' | 'members'

type DynastyPerkNode = {
  id: string
  label: string
  cost: number
  unlocked?: boolean
  available?: boolean
  progressCurrent?: number
  progressMax?: number
  x: number
  y: number
  shape?: 'circle' | 'diamond'
  summary?: string
}

type DynastyPerkBranch = {
  id: 'family' | 'species' | 'faction'
  label: string
  context: string
  active: boolean
  nodes: DynastyPerkNode[]
  links: { from: string; to: string }[]
}

const dynastyPointBalance = 14

function defaultBranchNodeId(branchId: DynastyPerkBranch['id']) {
  return `${branchId}-core`
}



export function DynastyPage({ currentCharacter, characters, tab, onTabChange, onBack }: {
  currentCharacter: CharacterProfile
  characters: CharacterProfile[]
  tab: DynastyTab
  onTabChange: (tab: DynastyTab) => void
  onBack: () => void
}) {
  const familyName = currentCharacter.dynasty.replace(/^Dynastie\s+/i, '')
  const dynastyMembers = characters.filter((character) => character.dynasty === currentCharacter.dynasty)
  const [selectedBranchId, setSelectedBranchId] = useState<DynastyPerkBranch['id']>('family')
  const [selectedNodeId, setSelectedNodeId] = useState('family-core')

  const perkBranches: DynastyPerkBranch[] = [
    {
      id: 'family', label: 'Famille', context: familyName, active: true,
      nodes: [
        { id: 'family-core', label: 'Fondations', cost: 2, unlocked: true, progressCurrent: 1, progressMax: 1, x: 180, y: 38, summary: 'Premier palier de la branche familiale. Le détail exact reste placeholder pour le moment.' },
        { id: 'family-blood', label: 'Sang ancien', cost: 3, unlocked: true, progressCurrent: 2, progressMax: 2, x: 125, y: 105, summary: 'Deuxième compétence déjà complétée pour tester un palier à plusieurs rangs.' },
        { id: 'family-name', label: 'Nom protégé', cost: 4, available: true, progressCurrent: 1, progressMax: 3, x: 235, y: 110, summary: 'Compétence en cours d’amélioration. Les rangs supplémentaires restent achetables tant que le maximum n’est pas atteint.' },
        { id: 'family-side', label: 'Tradition secondaire', cost: 4, x: 55, y: 176, summary: 'Compétence secondaire encore masquée tant que son prérequis n’est pas atteint.' },
        { id: 'family-memory', label: 'Mémoire commune', cost: 5, available: true, progressCurrent: 0, progressMax: 1, x: 120, y: 180, summary: 'Cette compétence est maintenant visible car le prérequis de gauche est complété.' },
        { id: 'family-oath', label: 'Pacte interne', cost: 5, x: 235, y: 188, summary: 'Compétence encore inconnue : la branche de droite doit être complétée avant sa révélation.' },
        { id: 'family-honor', label: 'Honneur de maison', cost: 7, x: 175, y: 255, summary: 'Compétence de convergence entre les deux branches supérieures.' },
        { id: 'family-duty', label: 'Devoir dynastique', cost: 7, x: 165, y: 325, summary: 'Compétence avancée de la partie basse de l’arbre.' },
        { id: 'family-influence', label: 'Influence familiale', cost: 8, x: 230, y: 325, summary: 'Compétence avancée reliée au chemin principal.' },
        { id: 'family-heirs', label: 'Héritiers liés', cost: 8, x: 165, y: 395, summary: 'Avant-dernier palier de la branche familiale.' },
        { id: 'family-legacy', label: 'Héritage partagé', cost: 9, x: 230, y: 395, summary: 'Dernier cercle avant le palier ultime.' },
        { id: 'family-capstone', label: 'Maison consacrée', cost: 10, x: 165, y: 475, shape: 'diamond', summary: 'Palier ultime de l’arbre Famille. Son effet final reste volontairement placeholder.' },
      ],
      links: [
        { from: 'family-core', to: 'family-blood' },
        { from: 'family-core', to: 'family-name' },
        { from: 'family-blood', to: 'family-memory' },
        { from: 'family-memory', to: 'family-side' },
        { from: 'family-memory', to: 'family-honor' },
        { from: 'family-name', to: 'family-oath' },
        { from: 'family-oath', to: 'family-honor' },
        { from: 'family-honor', to: 'family-duty' },
        { from: 'family-duty', to: 'family-influence' },
        { from: 'family-duty', to: 'family-heirs' },
        { from: 'family-influence', to: 'family-legacy' },
        { from: 'family-heirs', to: 'family-legacy' },
        { from: 'family-heirs', to: 'family-capstone' },
      ],
    },
    {
      id: 'species', label: 'Espèce', context: currentCharacter.species, active: true,
      nodes: [
        { id: 'species-core', label: 'Patrimoine', cost: 2, unlocked: true, progressCurrent: 1, progressMax: 1, x: 180, y: 38, summary: 'Point de départ de l’arbre d’espèce.' },
        { id: 'species-blood', label: 'Adaptation', cost: 3, unlocked: true, progressCurrent: 2, progressMax: 2, x: 125, y: 105, summary: 'Compétence d’adaptation déjà complétée.' },
        { id: 'species-name', label: 'Instinct', cost: 4, available: true, progressCurrent: 1, progressMax: 3, x: 235, y: 110, summary: 'Compétence d’espèce en cours, ici à 1 rang sur 3.' },
        { id: 'species-side', label: 'Affinité cachée', cost: 4, x: 55, y: 176, summary: 'Avantage encore inconnu.' },
        { id: 'species-memory', label: 'Résilience', cost: 5, available: true, progressCurrent: 0, progressMax: 1, x: 120, y: 180, summary: 'Compétence désormais visible sur la branche gauche.' },
        { id: 'species-oath', label: 'Tradition', cost: 5, x: 235, y: 188, summary: 'Avantage encore inconnu.' },
        { id: 'species-honor', label: 'Symbiose', cost: 7, x: 175, y: 255, summary: 'Nœud de convergence des voies d’espèce.' },
        { id: 'species-duty', label: 'Aptitude supérieure', cost: 7, x: 165, y: 325, summary: 'Compétence avancée.' },
        { id: 'species-influence', label: 'Trait dominant', cost: 8, x: 230, y: 325, summary: 'Compétence avancée.' },
        { id: 'species-heirs', label: 'Lignée vivante', cost: 8, x: 165, y: 395, summary: 'Palier avancé.' },
        { id: 'species-legacy', label: 'Transmission', cost: 9, x: 230, y: 395, summary: 'Dernier cercle avant le palier ultime.' },
        { id: 'species-capstone', label: 'Accomplissement', cost: 10, x: 165, y: 475, shape: 'diamond', summary: 'Palier ultime de l’arbre d’espèce.' },
      ],
      links: [
        { from: 'species-core', to: 'species-blood' }, { from: 'species-core', to: 'species-name' },
        { from: 'species-blood', to: 'species-memory' }, { from: 'species-memory', to: 'species-side' },
        { from: 'species-memory', to: 'species-honor' }, { from: 'species-name', to: 'species-oath' },
        { from: 'species-oath', to: 'species-honor' }, { from: 'species-honor', to: 'species-duty' },
        { from: 'species-duty', to: 'species-influence' }, { from: 'species-duty', to: 'species-heirs' },
        { from: 'species-influence', to: 'species-legacy' }, { from: 'species-heirs', to: 'species-legacy' },
        { from: 'species-heirs', to: 'species-capstone' },
      ],
    },
    {
      id: 'faction', label: 'Faction', context: currentCharacter.faction, active: true,
      nodes: [
        { id: 'faction-core', label: 'Allégeance', cost: 2, unlocked: true, progressCurrent: 1, progressMax: 1, x: 180, y: 38, summary: 'Point de départ de l’arbre de faction.' },
        { id: 'faction-blood', label: 'Réseau interne', cost: 3, unlocked: true, progressCurrent: 2, progressMax: 2, x: 125, y: 105, summary: 'Réseau déjà complété pour le test.' },
        { id: 'faction-name', label: 'Doctrine', cost: 4, available: true, progressCurrent: 1, progressMax: 3, x: 235, y: 110, summary: 'Compétence de faction en cours à 1 rang sur 3.' },
        { id: 'faction-side', label: 'Contact caché', cost: 4, x: 55, y: 176, summary: 'Avantage encore inconnu.' },
        { id: 'faction-memory', label: 'Crédibilité', cost: 5, available: true, progressCurrent: 0, progressMax: 1, x: 120, y: 180, summary: 'Compétence accessible de la branche gauche.' },
        { id: 'faction-oath', label: 'Ressources', cost: 5, x: 235, y: 188, summary: 'Avantage encore inconnu.' },
        { id: 'faction-honor', label: 'Influence', cost: 7, x: 175, y: 255, summary: 'Point de convergence des voies de faction.' },
        { id: 'faction-duty', label: 'Mandat local', cost: 7, x: 165, y: 325, summary: 'Compétence avancée.' },
        { id: 'faction-influence', label: 'Voix reconnue', cost: 8, x: 230, y: 325, summary: 'Compétence avancée.' },
        { id: 'faction-heirs', label: 'Autorité', cost: 8, x: 165, y: 395, summary: 'Palier avancé.' },
        { id: 'faction-legacy', label: 'Réseau majeur', cost: 9, x: 230, y: 395, summary: 'Dernier cercle avant le palier ultime.' },
        { id: 'faction-capstone', label: 'Mandat suprême', cost: 10, x: 165, y: 475, shape: 'diamond', summary: 'Palier ultime de l’arbre de faction.' },
      ],
      links: [
        { from: 'faction-core', to: 'faction-blood' }, { from: 'faction-core', to: 'faction-name' },
        { from: 'faction-blood', to: 'faction-memory' }, { from: 'faction-memory', to: 'faction-side' },
        { from: 'faction-memory', to: 'faction-honor' }, { from: 'faction-name', to: 'faction-oath' },
        { from: 'faction-oath', to: 'faction-honor' }, { from: 'faction-honor', to: 'faction-duty' },
        { from: 'faction-duty', to: 'faction-influence' }, { from: 'faction-duty', to: 'faction-heirs' },
        { from: 'faction-influence', to: 'faction-legacy' }, { from: 'faction-heirs', to: 'faction-legacy' },
        { from: 'faction-heirs', to: 'faction-capstone' },
      ],
    },
  ]

  const selectedBranch = perkBranches.find((branch) => branch.id === selectedBranchId) ?? perkBranches[0]
  const selectedNode = selectedBranch.nodes.find((node) => node.id === selectedNodeId) ?? selectedBranch.nodes[0]
  const selectedNodeIsMystery = !selectedNode.unlocked && !selectedNode.available && (selectedNode.progressCurrent ?? 0) === 0
  const distantDynastyMember = familyName === 'Arven' ? {
    id: 'cassian-arven',
    name: 'Cassian Arven',
    rank: 'Cartographe civil',
    faction: 'Humanis',
    species: 'Humain',
    avatar: '/character-dialogue-avatar.png',
  } : null
  const dynastyMemberCount = dynastyMembers.length + (distantDynastyMember ? 1 : 0)

  const handleSelectBranch = (branchId: DynastyPerkBranch['id']) => {
    setSelectedBranchId(branchId)
    setSelectedNodeId(defaultBranchNodeId(branchId))
  }

  return (
    <main className="dynasty-page" style={{ '--dynasty-accent': currentCharacter.factionColor } as CSSProperties}>
      <section className="dynasty-hero">
        <button className="dynasty-back" onClick={onBack}>← Retour au personnage</button>
        <div className="dynasty-crest" aria-label={`Blason temporaire de la dynastie ${familyName}`}>
          <span>{familyName.slice(0, 1).toUpperCase()}</span>
        </div>
        <div className="dynasty-identity">
          <div className="inspector-kicker">DOSSIER DYNASTIQUE</div>
          <h2>Dynastie {familyName}</h2>
          <p className="dynasty-quote">« Citation dynastique à définir »</p>
          <div className="dynasty-badges">
            <span>Nom réservé · unique</span>
            <span>{dynastyMemberCount}/9 PJ actuellement liés</span>
            <span>1/3 compte joueur représenté</span>
          </div>
        </div>
        <div className="dynasty-balance-card">
          <span>Solde du compte</span>
          <strong>{dynastyPointBalance}</strong>
          <small>points dynastiques</small>
        </div>
      </section>

      <nav className="dynasty-tabs" aria-label="Pages de la dynastie">
        <button className={tab === 'advantages' ? 'active' : ''} onClick={() => onTabChange('advantages')}><span>01</span> Avantages</button>
        <button className={tab === 'genealogy' ? 'active' : ''} onClick={() => onTabChange('genealogy')}><span>02</span> Généalogie</button>
        <button className={tab === 'members' ? 'active' : ''} onClick={() => onTabChange('members')}><span>03</span> Membres</button>
      </nav>

      {tab === 'advantages' && (
        <section className="dynasty-content dynasty-advantages">
          <div className="dynasty-section-head">
            <div>
              <div className="inspector-kicker">HÉRITAGE PERMANENT · PLACEHOLDER</div>
              <h3>Arbres d’avantages</h3>
            </div>
            <p>Les points appartiennent au <b>compte</b>. Les avantages achetés appartiennent à la <b>dynastie</b> et sont définitifs.</p>
          </div>

          <div className="dynasty-advantage-layout">
            <aside className="dynasty-branch-selector">
              {perkBranches.map((branch) => (
                <button
                  key={branch.id}
                  className={`dynasty-branch-button ${selectedBranch.id === branch.id ? 'active' : ''}`}
                  onClick={() => handleSelectBranch(branch.id)}
                >
                  <small>{branch.label}</small>
                  <b>{branch.context}</b>
                  <span>{branch.active ? 'Arbre actif' : 'Arbre inactif'}</span>
                </button>
              ))}
            </aside>

            <div className="dynasty-tree-panel">
              <div className="dynasty-tree-panel-head">
                <div>
                  <small>{selectedBranch.label}</small>
                  <h4>{selectedBranch.context}</h4>
                </div>
                <span className="perk-status">SCHÉMA TEST</span>
              </div>

              <div className="dynasty-tree-canvas">
                <div className="dynasty-tree-stage">
                  <svg className="dynasty-tree-lines" viewBox="0 0 360 520" aria-hidden="true">
                    {selectedBranch.links.map((link) => {
                      const from = selectedBranch.nodes.find((node) => node.id === link.from)
                      const to = selectedBranch.nodes.find((node) => node.id === link.to)
                      if (!from || !to) return null
                      const midY = Math.round((from.y + to.y) / 2)
                      const path = Math.abs(to.x - from.x) < 8
                        ? `M ${from.x} ${from.y} V ${to.y}`
                        : Math.abs(to.y - from.y) < 18
                          ? `M ${from.x} ${from.y} H ${to.x}`
                          : `M ${from.x} ${from.y} V ${midY} H ${to.x} V ${to.y}`
                      return <path key={link.from + link.to} d={path} />
                    })}
                  </svg>

                  {selectedBranch.nodes.map((node) => {
                    const inProgress = !node.unlocked && (node.progressCurrent ?? 0) > 0
                    const state = node.unlocked ? 'complete' : inProgress ? 'progress' : node.available ? 'available' : 'locked'
                    const mystery = state === 'locked'
                    const progressText = node.progressMax ? `${node.progressCurrent ?? 0}/${node.progressMax}` : ''
                    return (
                      <button
                        key={node.id}
                        className={`dynasty-tree-node ${state} ${selectedNode.id === node.id ? 'selected' : ''} ${node.shape === 'diamond' ? 'diamond' : ''}`}
                        style={{ left: `${node.x}px`, top: `${node.y}px` }}
                        onClick={() => setSelectedNodeId(node.id)}
                        title={mystery ? '???' : node.label}
                      >
                        <span className="dynasty-tree-node-shape"><em>{mystery ? '?' : progressText}</em></span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <aside className="dynasty-node-detail">
              <div className="inspector-kicker">NŒUD SÉLECTIONNÉ</div>
              <h4>{selectedNodeIsMystery ? '???' : selectedNode.label}</h4>
              <div className="dynasty-node-meta">
                <span>{selectedBranch.label} · {selectedBranch.context}</span>
                <b>{selectedNode.unlocked ? 'Complété' : (selectedNode.progressCurrent ?? 0) > 0 ? 'En progression' : selectedNode.available ? 'Disponible' : '???'}</b>
              </div>
              <div className="dynasty-node-cost">{selectedNodeIsMystery ? <>Coût : <strong>???</strong></> : <>Coût : <strong>{selectedNode.cost} pts</strong></>}</div>
              {!selectedNodeIsMystery && selectedNode.progressMax && <div className="dynasty-node-rank">Palier : <strong>{selectedNode.progressCurrent ?? 0}/{selectedNode.progressMax}</strong></div>}
              <p>{selectedNodeIsMystery ? 'Les prérequis de cette compétence ne sont pas encore atteints. Son identité et ses effets restent inconnus.' : selectedNode.summary ?? 'Description placeholder de l’avantage. Les effets exacts seront définis plus tard.'}</p>
              <div className="dynasty-node-notes">
                <div><b>Portée</b><span>{selectedBranch.label === 'Famille' ? 'Tous les personnages de la dynastie' : selectedBranch.label === 'Espèce' ? `Uniquement les personnages ${selectedBranch.context}` : `Uniquement les personnages ${selectedBranch.context}`}</span></div>
                <div><b>Investissement</b><span>Les points sont dépensés depuis le solde du compte actuel.</span></div>
                <div><b>Persistance</b><span>Les déblocages sont définitifs. Si l’espèce ou la faction change, l’arbre devient caché mais n’est pas remboursé.</span></div>
              </div>
            </aside>
          </div>
          <div className="dynasty-rule-strip">
            <div><b>Changement de faction</b><span>L’ancien arbre reste mémorisé mais n’affecte plus le personnage et devient caché.</span></div>
            <div><b>Changement d’espèce</b><span>Même logique : un nouvel arbre devient actif, les anciens investissements ne sont pas remboursés.</span></div>
            <div><b>Gain de points</b><span>Uniquement à la mort d’un personnage, selon son histoire, ses accomplissements, ses liens RP et son fair-play.</span></div>
          </div>
        </section>
      )}

      {tab === 'genealogy' && (
        <section className="dynasty-content dynasty-genealogy">
          <div className="dynasty-section-head">
            <div>
              <div className="inspector-kicker">ARBRE CONSTRUIT PAR LES JOUEURS</div>
              <h3>Généalogie</h3>
            </div>
            <div className="genealogy-actions">
              <button onClick={() => alert('Prototype : formulaire de création d’un PJ dynastique à venir.')}>+ Ajouter un PJ</button>
              <button onClick={() => alert('Prototype : formulaire de création d’un PNJ dynastique à venir.')}>+ Ajouter un PNJ</button>
            </div>
          </div>
          <div className="genealogy-canvas">
            <div className="genealogy-generation top">
              <button className="genealogy-empty" onClick={() => alert('Prototype : choisir un parent, ancêtre ou cousin à ajouter.')}><span>+</span><small>Ajouter une branche</small></button>
              <button className="genealogy-empty" onClick={() => alert('Prototype : choisir un parent, ancêtre ou cousin à ajouter.')}><span>+</span><small>Ajouter une branche</small></button>
            </div>
            <div className="genealogy-line vertical" />
            <div className="genealogy-line siblings" />
            <div className="genealogy-generation current sibling-row">
              <button className="genealogy-empty sibling-slot" onClick={() => alert('Prototype : ajouter un frère ou une sœur à cette génération.')}><span>+</span><small>Frère / sœur</small></button>
              <article className="genealogy-person player">
                <img src={currentCharacter.dialogueAvatars[0] ?? currentCharacter.grandAvatar} alt={currentCharacter.name} />
                <div><small>PERSONNAGE JOUEUR</small><b>{currentCharacter.name}</b><span>{currentCharacter.species} · {currentCharacter.faction}</span></div>
              </article>
              <button className="genealogy-empty sibling-slot" onClick={() => alert('Prototype : ajouter un frère ou une sœur à cette génération.')}><span>+</span><small>Frère / sœur</small></button>
            </div>
            <div className="genealogy-line vertical lower" />
            <div className="genealogy-generation bottom">
              <button className="genealogy-empty" onClick={() => alert('Prototype : ajouter un descendant, un cousin ou une autre branche.')}><span>+</span><small>Étendre l’arbre</small></button>
            </div>
            {distantDynastyMember && (
              <article className="genealogy-person distant-branch">
                <img src={distantDynastyMember.avatar} alt={distantDynastyMember.name} />
                <div><small>BRANCHE ÉLOIGNÉE · AUCUN LIEN DIRECT AFFICHÉ</small><b>{distantDynastyMember.name}</b><span>{distantDynastyMember.species} · {distantDynastyMember.faction}</span></div>
              </article>
            )}
          </div>
          <div className="genealogy-note">
            <b>PNJ dynastiques</b>
            <span>Les portraits ajoutés à un PNJ deviennent disponibles comme avatars de dialogue pour tous les membres de la dynastie.</span>
          </div>
        </section>
      )}

      {tab === 'members' && (
        <section className="dynasty-content dynasty-members">
          <div className="dynasty-section-head">
            <div>
              <div className="inspector-kicker">3 COMPTES MAXIMUM · 3 PERSONNAGES PAR COMPTE</div>
              <h3>Personnages joueurs</h3>
            </div>
            <p>Les membres n’ont pas besoin d’un lien familial direct : une branche éloignée ou de simples cousins suffisent.</p>
          </div>
          <div className="dynasty-player-grid">
            <article className="dynasty-player-slot occupied">
              <header><span>JOUEUR 01</span><b>Compte actuel</b></header>
              <div className="dynasty-member-list">
                {dynastyMembers.map((member) => (
                  <div className="dynasty-member-card" key={member.id}>
                    <img src={member.dialogueAvatars[0] ?? member.grandAvatar} alt={member.name} />
                    <div><b>{member.name}</b><span>{member.rank}</span><small>{member.faction} · {member.species}</small></div>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 3 - dynastyMembers.length) }, (_, index) => <div key={index} className="dynasty-character-empty">Emplacement personnage disponible</div>)}
              </div>
            </article>
            {distantDynastyMember ? (
              <article className="dynasty-player-slot occupied">
                <header><span>JOUEUR 02</span><b>Compte membre test</b></header>
                <div className="dynasty-member-list">
                  <div className="dynasty-member-card">
                    <img src={distantDynastyMember.avatar} alt={distantDynastyMember.name} />
                    <div><b>{distantDynastyMember.name}</b><span>{distantDynastyMember.rank}</span><small>{distantDynastyMember.faction} · {distantDynastyMember.species}</small></div>
                  </div>
                  <div className="dynasty-character-empty">Emplacement personnage disponible</div>
                  <div className="dynasty-character-empty">Emplacement personnage disponible</div>
                </div>
              </article>
            ) : (
              <article className="dynasty-player-slot empty">
                <header><span>JOUEUR 02</span><b>Emplacement disponible</b></header>
                <div className="dynasty-invite-mark">+</div>
                <p>Un autre joueur pourra rejoindre cette dynastie avec jusqu’à trois personnages.</p>
              </article>
            )}
            <article className="dynasty-player-slot empty">
              <header><span>JOUEUR 03</span><b>Emplacement disponible</b></header>
              <div className="dynasty-invite-mark">+</div>
              <p>Un autre joueur pourra rejoindre cette dynastie avec jusqu’à trois personnages.</p>
            </article>
          </div>
          <div className="dynasty-name-rule">
            <span>VÉRIFICATION À L’INSCRIPTION</span>
            <b>« {familyName} » est réservé à cette dynastie.</b>
            <p>Les doublons sont interdits globalement, sans tenir compte de la casse ou des espaces superflus. Rejoindre la dynastie existante reste possible si ses membres l’autorisent.</p>
          </div>
        </section>
      )}
    </main>
  )
}

