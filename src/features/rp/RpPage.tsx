import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { CharacterProfile } from '../characters/characterData'
import { currentChapterId } from '../../world/data'
import { prototypeRp, rpThreads } from './rpData'
import type { RpAccessMode, RpMessage, RpThread } from './rpData'

export function RpInspector({ chapterId, contextLabel, contextKey, onBack, onOpenRp }: { chapterId: string; contextLabel: string; contextKey: string; onBack: () => void; onOpenRp: (thread: RpThread) => void }) {
  const historical = chapterId !== currentChapterId
  const visibleThreads = !historical ? rpThreads.filter((thread) => {
    if (thread.location.kind === 'space') return contextKey === `system:${thread.location.systemId}`
    return contextKey === `place:${thread.location.placeId}`
  }) : []

  return (
    <div className="rp-inspector cozy-panel">
      <div className="inspector-kicker">ZONE RP · PROTOTYPE</div>
      <h2>{historical ? `Flashbacks · ${contextLabel}` : `RPs · ${contextLabel}`}</h2>
      <p className="description">Les fils affichés ici appartiennent uniquement à ce lieu précis.</p>
      <div className="rp-browser-list">
        {visibleThreads.length > 0 ? visibleThreads.map((thread) => (
          <button key={thread.id} onClick={() => onOpenRp(thread)}>
            <span>{thread.title}</span>
            <small>{thread.status} · {thread.accessMode === 'invite' ? 'sur invitation' : 'ouvert'} · {thread.participantIds.length} participants</small>
          </button>
        )) : (
          <div className="rp-empty-context">
            <b>Aucun RP ici pour le moment</b>
            <span>{historical ? 'Aucun flashback n’est enregistré dans ce lieu et cette époque.' : 'Ce lieu ne contient encore aucun fil actif.'}</span>
          </div>
        )}
      </div>
      <button className="edit-primary" onClick={() => alert(historical ? 'Prototype : créer un flashback dans cette époque.' : 'Prototype : créer un nouveau RP dans ce lieu.')}>{historical ? 'Créer un flashback' : 'Créer un RP'}</button>
      <button className="secondary-action" onClick={onBack}>Retour aux informations</button>
    </div>
  )
}


function renderInlineRpMarkup(value: string, keyPrefix: string): ReactNode[] {
  const tokenRegex = /\[(b|i)\]([\s\S]*?)\[\/\1\]/gi
  const nodes: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null
  let index = 0

  while ((match = tokenRegex.exec(value)) !== null) {
    if (match.index > cursor) nodes.push(value.slice(cursor, match.index))
    const content = match[2]
    if (match[1].toLowerCase() === 'b') nodes.push(<strong key={`${keyPrefix}-b-${index++}`}>{content}</strong>)
    else nodes.push(<em key={`${keyPrefix}-i-${index++}`}>{content}</em>)
    cursor = match.index + match[0].length
  }
  if (cursor < value.length) nodes.push(value.slice(cursor))
  return nodes
}

function RpCombatInsert({ thread, onOpenCombat }: { thread: RpThread; onOpenCombat: () => void }) {
  if (!thread.combat || thread.location.kind !== 'space') return null
  const completed = thread.combat.status === 'completed'
  return (
    <div className={`rp-inline-instance ${completed ? 'completed' : 'active'}`}>
      <div className="rp-inline-instance-copy">
        <small>{completed ? 'INSTANCE COMBAT SPATIAL · TERMINÉE' : 'INSTANCE COMBAT SPATIAL'}</small>
        <b>VVF Raviolo ↔ {thread.combat.opponent}</b>
        <span>{completed ? `${thread.combat.outcome} · ${thread.combat.turns} tours` : 'Combat en cours · ordres simultanés'}</span>
        {completed && <em>{thread.combat.summary}</em>}
      </div>
      <button onClick={onOpenCombat}>{completed ? 'Voir le rapport' : 'Ouvrir l’instance'}</button>
    </div>
  )
}

function renderRpContent(content: string, author: CharacterProfile) {
  const dialogueRegex = /\[dialogue(?:\s+avatar="(\d+)")?\]([\s\S]*?)\[\/dialogue\]/gi
  const parts: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null
  let key = 0

  const pushProse = (value: string) => {
    const paragraphs = value
      .split(/\n\s*\n/g)
      .map((part) => part.trim())
      .filter(Boolean)

    paragraphs.forEach((paragraph) => {
      const centered = /^\[center\]([\s\S]*?)\[\/center\]$/i.exec(paragraph)
      const body = centered ? centered[1].trim() : paragraph
      parts.push(
        <p className={`rp-prose ${centered ? 'rp-prose-centered' : ''}`} key={`prose-${key}`}>
          {renderInlineRpMarkup(body, `prose-${key++}`)}
        </p>,
      )
    })
  }

  while ((match = dialogueRegex.exec(content)) !== null) {
    pushProse(content.slice(cursor, match.index))
    const avatarIndex = Number(match[1] ?? 0)
    const dialogue = match[2].trim()
    const dialogueAvatar = author.dialogueAvatars[avatarIndex] ?? author.dialogueAvatars[0] ?? author.grandAvatar
    if (dialogue) {
      parts.push(
        <div className="rp-dialogue-block" key={`dialogue-${key++}`}>
          <img src={dialogueAvatar} alt={`Avatar de dialogue de ${author.name}`} />
          <div><span>«</span>{renderInlineRpMarkup(dialogue, `dialogue-${key}`)}<span>»</span></div>
        </div>,
      )
    }
    cursor = match.index + match[0].length
  }

  pushProse(content.slice(cursor))
  return parts
}

export function RpPage({
  thread,
  characters,
  currentCharacter,
  messages,
  accessMode,
  invitedIds,
  onMessagesChange,
  onAccessModeChange,
  onInvitedIdsChange,
  onBack,
  onOpenLocation,
  onOpenCharacter,
  onOpenFaction,
  onOpenDynasty,
  onOpenCombat,
}: {
  thread: RpThread
  characters: CharacterProfile[]
  currentCharacter: CharacterProfile
  messages: RpMessage[]
  accessMode: RpAccessMode
  invitedIds: string[]
  onMessagesChange: (messages: RpMessage[]) => void
  onAccessModeChange: (mode: RpAccessMode) => void
  onInvitedIdsChange: (ids: string[]) => void
  onBack: () => void
  onOpenLocation: () => void
  onOpenCombat: () => void
  onOpenCharacter: (characterId: string) => void
  onOpenFaction: (faction: string) => void
  onOpenDynasty: (characterId: string) => void
}) {
  const [draft, setDraft] = useState('')
  const [preview, setPreview] = useState(false)
  const [dialoguePaletteOpen, setDialoguePaletteOpen] = useState(false)
  const [mjTargetMessageId, setMjTargetMessageId] = useState<string | null>(null)
  const [mjQuestionOpen, setMjQuestionOpen] = useState(false)
  const [mjNotice, setMjNotice] = useState('')
  const [mjDraft, setMjDraft] = useState('')
  const draftRef = useRef<HTMLTextAreaElement | null>(null)
  const creator = characters.find((character) => character.id === thread.creatorId) ?? characters[0]
  const participants = thread.participantIds.map((id) => characters.find((character) => character.id === id)).filter(Boolean) as CharacterProfile[]
  const isCreator = currentCharacter.id === thread.creatorId
  const currentCanPost = thread.status === 'Ouvert' && (accessMode === 'open' || thread.participantIds.includes(currentCharacter.id) || invitedIds.includes(currentCharacter.id) || isCreator)

  const toggleInvitation = (characterId: string) => {
    if (!isCreator) return
    onInvitedIdsChange(invitedIds.includes(characterId) ? invitedIds.filter((id) => id !== characterId) : [...invitedIds, characterId])
  }

  const insertTag = (open: string, close: string) => {
    if (!currentCanPost) return
    const textarea = draftRef.current
    if (!textarea) {
      setDraft((value) => `${value}${value ? '\n\n' : ''}${open}${close}`)
      return
    }

    const start = textarea.selectionStart ?? draft.length
    const end = textarea.selectionEnd ?? start
    const selected = draft.slice(start, end)
    const before = draft.slice(0, start)
    const after = draft.slice(end)
    setDraft(before + open + selected + close + after)

    requestAnimationFrame(() => {
      textarea.focus()
      const caret = start + open.length + selected.length
      textarea.setSelectionRange(caret, caret)
    })
  }

  const insertDialogueTag = (avatarIndex: number) => {
    insertTag(`[dialogue avatar="${avatarIndex}"]`, '[/dialogue]')
    setDialoguePaletteOpen(false)
  }


  const publish = () => {
    const content = draft.trim()
    if (!content || !currentCanPost) return
    onMessagesChange([...messages, {
      id: `rp-msg-${Date.now()}`,
      authorId: currentCharacter.id,
      timestamp: 'Maintenant',
      content,
    }])
    setDraft('')
    setPreview(false)
  }

  return (
    <main className="rp-page-shell">
      <section className="rp-thread-main">
        <header className="rp-thread-header">
          <div className="rp-thread-heading-row">
            <button className="rp-back-button" onClick={onBack}>← Retour au lieu</button>
            <div className="rp-thread-statuses">
              <span className={thread.status === 'Ouvert' ? 'rp-status-open' : 'rp-status-completed'}>
                {thread.status === 'Ouvert' ? 'Ouvert' : 'Terminé'}
              </span>

              {accessMode === 'invite' && (
                <span className="rp-access-invite">Sur invitation</span>
              )}
            </div>
          </div>

          <div className="rp-thread-title-row">
            <div>
              <h2>{thread.title}</h2>
            </div>
            <div className="rp-location-card" title={`${thread.location.sector} / ${thread.location.system} / ${thread.location.body} / ${thread.location.zone} / ${thread.location.place}`}>
      <div className="rp-location-card-head">
        <small>LIEU</small>

        <button
          type="button"
          className="rp-location-map-button"
          aria-label="Voir le lieu sur la carte"
          title="Voir le lieu sur la carte"
          onClick={onOpenLocation}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a14 14 0 0 1 0 18" />
            <path d="M12 3a14 14 0 0 0 0 18" />
          </svg>
        </button>
      </div>
              <strong>{thread.location.place}</strong>
              <span>{thread.location.kind === 'space' ? `${thread.location.system} · ${thread.location.sector}` : `${thread.location.zone} · ${thread.location.body} · ${thread.location.system}`}</span>
            </div>
          </div>
          <div className="rp-thread-meta-row">
            <span>Créé par <b>{creator.name}</b></span>
            <span>{messages.length} messages</span>
            <span className="rp-thread-date">{thread.dateLabel}</span>
          </div>
        </header>

        <section className="rp-message-feed">
          {messages.map((message, index) => {
            const author = characters.find((character) => character.id === message.authorId) ?? characters[0]
            return (
              <div className="rp-feed-block" key={message.id}>
                <article className="rp-message-card">
                  <aside className="rp-message-author">
                    <img
                      src={author.grandAvatar}
                      alt={`Grand avatar de ${author.name}`}
                    />

                    <button
                      type="button"
                      className="rp-author-link rp-author-name"
                      onClick={() => onOpenCharacter(author.id)}
                    >
                      {author.name}
                    </button>

                    <button
                      type="button"
                      className="rp-author-link rp-author-faction"
                      onClick={() => onOpenFaction(author.faction)}
                    >
                      {author.faction}
                    </button>

                    <button
                      type="button"
                      className="rp-author-link rp-author-dynasty"
                      onClick={() => onOpenDynasty(author.id)}
                    >
                      {author.dynasty.replace(/^Dynastie\s+/i, '')}
                    </button>
                  </aside>

                  <div className="rp-message-content">
                    <header>
                      <time>{message.timestamp}</time>
                    </header>

                    <div className="rp-message-body">
                      {renderRpContent(message.content, author)}
                    </div>

                    <footer>
                      <button
                        onClick={() => alert('Prototype : partage du message à définir.')}
                      >
                        Partager
                      </button>

                      <button
                        type="button"
                        className="rp-mj-trigger"
                        onClick={() =>
                          setMjTargetMessageId((current) =>
                            current === message.id ? null : message.id
                          )
                        }
                      >
                        MJ
                      </button>
                    </footer>

                    {mjTargetMessageId === message.id && (
                      <div className="rp-mj-panel">
                        <div className="rp-mj-panel-head">
                          <div>
                            <small>CONTACT MJ</small>
                            <b>Signaler ce post à l'équipe</b>
                            <span>{author.name} · {message.timestamp}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setMjTargetMessageId(null)}
                          >
                            ×
                          </button>
                        </div>

                        <div className="rp-mj-actions">
                          {[
                            'Action notable',
                            'En attente de réponse MJ',
                            'Demande de validation mission',
                            'Résolution conflit',
                          ].map((label) => (
                            <button
                              key={label}
                              type="button"
                              onClick={() =>
                                alert(
                                  `Prototype : ${label} pour le message ${message.id}`
                                )
                              }
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>

                {thread.combat?.insertAfterMessageId === message.id && (
                  <RpCombatInsert
                    thread={thread}
                    onOpenCombat={onOpenCombat}
                  />
                )}
              </div>
            )
          })}
        </section>

        <section className="rp-composer">
          <div className="rp-composer-head">
            <div className="rp-composer-avatar">
              <img src={currentCharacter.dialogueAvatars[0] ?? currentCharacter.grandAvatar} alt="Avatar sélectionné" />
              <div><small>RÉPONDRE AVEC</small><b>{currentCharacter.name}</b></div>
            </div>
            <span>{currentCanPost ? 'Tu peux répondre à ce RP' : 'Accès requis pour répondre'}</span>
          </div>
          <div className="rp-format-toolbar" aria-label="Mise en forme RP">
            <button title="Gras" onClick={() => insertTag('[b]', '[/b]')} disabled={!currentCanPost}><b>B</b></button>
            <button title="Italique" onClick={() => insertTag('[i]', '[/i]')} disabled={!currentCanPost}><i>I</i></button>
            <button title="Centrer" onClick={() => insertTag('[center]', '[/center]')} disabled={!currentCanPost}>Centrer</button>
            <span className="rp-toolbar-separator" />
            <button
              className={`rp-dialogue-tool ${dialoguePaletteOpen ? 'active' : ''}`}
              title="Insérer un dialogue"
              onClick={() => setDialoguePaletteOpen((value) => !value)}
              disabled={!currentCanPost || currentCharacter.dialogueAvatars.length === 0}
            >Dialogue</button>
          </div>
          {dialoguePaletteOpen && (
            <div className="rp-dialogue-avatar-row">
              <span>Avatar du dialogue</span>
              <div>
                {currentCharacter.dialogueAvatars.map((avatar, index) => (
                  <button key={`${avatar}-${index}`} onClick={() => insertDialogueTag(index)} title={`Utiliser l’avatar ${index + 1}`}>
                    <img src={avatar} alt={`Avatar de dialogue ${index + 1}`} />
                  </button>
                ))}
              </div>
              <small>Choisis l’avatar, puis la balise sera insérée autour du texte sélectionné.</small>
            </div>
          )}
          {preview && draft.trim() ? <div className="rp-draft-preview"><small>APERÇU</small><div className="rp-preview-body">{renderRpContent(draft, currentCharacter)}</div></div> : null}
          <textarea
            ref={draftRef}
            value={draft}
            disabled={!currentCanPost}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={currentCanPost ? 'Écris la réponse de ton personnage…' : 'Ce personnage n’est pas autorisé à participer à ce RP.'}
          />
          <div className="rp-composer-actions">
            <div>
              <button onClick={() => setPreview((value) => !value)} disabled={!draft.trim()}>Aperçu</button>
            </div>
            <button className="rp-publish" disabled={!draft.trim() || !currentCanPost} onClick={publish}>Publier la réponse</button>
          </div>
        </section>
        </section>
      <aside className="rp-thread-sidebar">
                <section className="rp-side-card">
          <div className="inspector-kicker">PARTICIPANTS</div>

          <div className="rp-participant-list">
            {participants.map((participant) => (
              <div className="rp-participant" key={participant.id}>
                <img
                  src={participant.dialogueAvatars[0] ?? participant.grandAvatar}
                  alt=""
                />

                <div>
                  <b>{participant.name}</b>
                  <span>{participant.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="rp-side-card rp-access-card">
          <div className="inspector-kicker">ACCÈS AU RP</div>
          <div className="rp-access-title"><b>{accessMode === 'invite' ? 'Sur invitation' : 'Ouvert'}</b><span>{isCreator ? 'Tu es le créateur' : `Géré par ${creator.name}`}</span></div>
          {isCreator ? (
            <div className="rp-access-switch">
              <button className={accessMode === 'open' ? 'active' : ''} onClick={() => onAccessModeChange('open')}>Ouvert</button>
              <button className={accessMode === 'invite' ? 'active' : ''} onClick={() => onAccessModeChange('invite')}>Invitation</button>
            </div>
          ) : null}
          {accessMode === 'invite' && (
            <div className="rp-invite-list">
              <small>PERSONNAGES AUTORISÉS</small>
              {characters.filter((character) => character.id !== thread.creatorId).map((character) => (
                <label key={character.id} className={invitedIds.includes(character.id) ? 'checked' : ''}>
                  <input type="checkbox" checked={invitedIds.includes(character.id)} disabled={!isCreator} onChange={() => toggleInvitation(character.id)} />
                  <img src={character.dialogueAvatars[0] ?? character.grandAvatar} alt="" />
                  <span><b>{character.name}</b><small>{character.faction}</small></span>
                </label>
              ))}
            </div>
          )}
        </section>
      </aside>
    </main>
  )
}

