import type { CSSProperties, ReactNode } from 'react'
import type { CharacterProfile } from './characterData'

export function CharacterVisualRail({ currentCharacter, characters, onChangeCharacter }: { currentCharacter: CharacterProfile; characters: CharacterProfile[]; onChangeCharacter: (characterId: string) => void }) {
  return (
    <aside className="character-visual-panel" style={{ '--faction': currentCharacter.factionColor } as CSSProperties}>
      <div className="character-switch-wrap">
        <select className="character-switch" value={currentCharacter.id} onChange={(event) => onChangeCharacter(event.target.value)} aria-label="Choisir un personnage">
          {characters.map((character) => <option key={character.id} value={character.id}>{character.name}</option>)}
        </select>
      </div>
      <div className="grand-avatar-frame">
        <img src={currentCharacter.grandAvatar} alt={`Grand avatar de ${currentCharacter.name}`} />
        <div className="avatar-glass" />
      </div>
      <div className="visual-vitals">
        <div><span>Âge</span><strong>{currentCharacter.age}</strong></div>
        <div><span>Taille</span><strong>{currentCharacter.height}</strong></div>
        <div><span>Poids</span><strong>{currentCharacter.weight}</strong></div>
      </div>
    </aside>
  )
}

export function CharacterInspector({ currentCharacter, onOpenDynasty }: { currentCharacter: CharacterProfile; onOpenDynasty: () => void }) {
  return (
    <div className="character-panel cozy-panel" style={{ '--faction': currentCharacter.factionColor } as CSSProperties}>
      <div className="inspector-kicker character-kicker">DOSSIER PERSONNAGE · DONNÉES TEST</div>
      <div className="character-title">
        <div>
          <button className="faction-link" onClick={() => alert(`Prototype : future page de la faction ${currentCharacter.faction}.`)}>{currentCharacter.faction}</button>
          <h2>{currentCharacter.name}</h2>
          <button className="dynasty-link" onClick={onOpenDynasty}>{currentCharacter.dynasty}</button>
        </div>
      </div>
      <div className="rank-card">{currentCharacter.rank.replace(currentCharacter.shipName, '')}<b>{currentCharacter.shipName}</b></div>
      <div className="character-prime"><span>Prime</span><strong>Aucune</strong></div>
      <div className="character-wallet"><span>Solde personnel</span><strong>{currentCharacter.personalFunds.toLocaleString('fr-FR')} ¤</strong></div>
      {currentCharacter.dialogueAvatars.length > 0 && (
        <div className="small-avatar-block">
          <div className="small-avatar-row">
            {currentCharacter.dialogueAvatars.slice(0, 3).map((avatar, index) => (
              <button key={avatar + index} className={`small-avatar ${index === 0 ? 'active' : ''}`} title={`Avatar ${index + 1}`}>
                <img src={avatar} alt={`Avatar ${index + 1} de ${currentCharacter.name}`} />
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="character-species"><span>Espèce</span><button onClick={() => alert(`Prototype : future liste des membres filtrée sur ${currentCharacter.species}.`)}>{currentCharacter.species} ↗</button></div>
      <SectionLabel>Histoire</SectionLabel>
      <div className="bio-card">{currentCharacter.bio}</div>
      <SectionLabel>Personnalité</SectionLabel>
      <div className="bio-card">{currentCharacter.personality}</div>
      <button className="edit-primary" onClick={() => alert('Prototype : future page de modification de la fiche personnage.')}>Modifier le personnage</button>
      <DevNote />
    </div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="section-label">{children}</div>
}

function DevNote() {
  return <div className="dev-note"><strong>Prototype V2</strong><span>Les noms et chiffres TEST restent des données temporaires destinées à éprouver l’interface.</span></div>
}
