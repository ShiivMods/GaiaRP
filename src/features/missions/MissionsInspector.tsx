import type { CharacterProfile } from '../characters/characterData'
import { missionBoard } from './missionData'
import type { MissionBrief } from './missionData'

export function MissionsInspector({ currentCharacter, selectedMissionId, activeMissionId, onSelectMission, onAcceptMission }: {
  currentCharacter: CharacterProfile
  selectedMissionId: string
  activeMissionId: string | null
  onSelectMission: (missionId: string) => void
  onAcceptMission: (missionId: string) => void
}) {
  // Au lancement, le vaisseau ne reçoit que le canal Humanis. D'autres canaux
  // pourront être ajoutés plus tard, y compris des contrats financés par des joueurs.
  const accessibleChannels: MissionBrief['channel'][] = ['Humanis']
  const available = missionBoard.filter((mission) => accessibleChannels.includes(mission.channel))
  const activeMission = activeMissionId ? missionBoard.find((mission) => mission.id === activeMissionId) ?? null : null
  const selectedMission = activeMission ?? available.find((mission) => mission.id === selectedMissionId) ?? available[0]

  if (!selectedMission) return null

  return (
    <div className={`mission-browser ${activeMission ? 'has-active-mission' : 'selection-mode'}`}>
      <section className="mission-browser-list">
        <div className="mission-channel-head">
          <span>CANAL DISPONIBLE</span>
          <strong><i>H</i> Humanis</strong>
        </div>
        {activeMission ? (
          <div className="mission-active-rail" title={activeMission.title}>
            <div className="mission-faction-icon">H</div>
            <span>ACTIVE</span>
          </div>
        ) : (
          <div className="mission-cards">
            {available.map((mission) => (
              <button
                key={mission.id}
                className={`mission-card ${mission.id === selectedMission.id ? 'selected' : ''}`}
                onClick={() => onSelectMission(mission.id)}
              >
                <span className="mission-faction-icon">H</span>
                <span className="mission-card-copy"><strong>{mission.title}</strong><small>{mission.channel}</small></span>
                <span className="mission-time"><small>Temps restant</small><b>{mission.timeLeft}</b></span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="mission-detail">
        <div className="mission-detail-top">
          <div><small>Type</small><strong>{selectedMission.type}</strong></div>
          <div className="mission-detail-title"><small>Mission</small><h2>{selectedMission.title}</h2></div>
          <div><small>Récompense</small><strong>{selectedMission.reward}</strong></div>
          <div className="mission-destination"><small>Destination</small><strong>{selectedMission.destination[0]}</strong><span>{selectedMission.destination[1]}</span><span>{selectedMission.destination[2]}</span></div>
        </div>

        <div className={`mission-difficulty tone-${selectedMission.tone}`}>
          <div><small>Difficulté estimée</small><strong>{selectedMission.difficulty}</strong></div>
          <div className="mission-issuer"><span>Émise par</span><b>Humanis</b><i>H</i></div>
        </div>

        <div className="mission-description-block">
          <div className="mission-description-kicker">DESCRIPTION DE MISSION</div>
          <p>{selectedMission.description}</p>
          <div className="mission-contract-meta">
            <div><span>Canal</span><b>Humanis</b></div>
            <div><span>Vaisseau</span><b>{currentCharacter.shipName}</b></div>
            <div><span>Fin du contrat</span><b>{selectedMission.timeLeft}</b></div>
          </div>
        </div>

        <div className="mission-actions">
          {activeMission ? (
            <><span className="mission-active-badge">MISSION ACTIVE</span><button onClick={() => alert('Prototype : journal et objectifs de mission à venir.')}>Voir les objectifs</button></>
          ) : (
            <><span>Sélectionne un contrat puis confirme son acceptation.</span><button className="mission-accept" onClick={() => onAcceptMission(selectedMission.id)}>Accepter la mission</button></>
          )}
        </div>
      </section>
    </div>
  )
}

