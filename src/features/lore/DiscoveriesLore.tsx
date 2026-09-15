import { useState } from 'react'
import type { ReactNode } from 'react'
import type { DangerLevel } from './loreData'
import { anomalies, resourceCategories, resourceMaterials } from './discoveriesData'
import type { AnomalyEntry, DiscoveryMode, ResourceCategoryId, ResourceMaterialEntry } from './discoveriesData'

export function DiscoveriesLore() {
  const [mode, setMode] = useState<DiscoveryMode>(null)
  const [resource, setResource] = useState<ResourceMaterialEntry | null>(null)
  const [anomaly, setAnomaly] = useState<AnomalyEntry | null>(null)

  const goHome = () => {
    setMode(null)
    setResource(null)
    setAnomaly(null)
  }

  if (resource) return <ResourceDetail entry={resource} onBack={() => setResource(null)} />
  if (anomaly) return <AnomalyDetail entry={anomaly} onBack={() => setAnomaly(null)} />
  if (mode === 'resources') return <ResourceDirectory onOpen={setResource} onBack={goHome} />
  if (mode === 'technologies') return <TechnologiesPlaceholder onBack={goHome} />
  if (mode === 'anomalies') return <AnomalyDirectory onOpen={setAnomaly} onBack={goHome} />

  return (
    <div className="discovery-home">
      <div className="discovery-subtabs">
        <button onClick={() => setMode('resources')}>Ressources & Matériaux</button>
        <button onClick={() => setMode('technologies')}>Technologies</button>
        <button onClick={() => setMode('anomalies')}>Anomalies</button>
      </div>
      <div className="discovery-intro">
        <h2>Journal commun des découvertes</h2>
        <p>Cette section rassemble les connaissances confirmées et documentées au fil des aventures. Elle évolue avec les explorations, recherches et événements vécus en RP.</p>
        <div className="discovery-intro-grid">
          <section><h3>Ressources & Matériaux</h3><p>Minéraux, cristaux, gaz et autres matières remarquables observées ou étudiées.</p></section>
          <section><h3>Technologies</h3><p>Répertoire technologique commun. Sa structure détaillée sera conçue lors d’une passe dédiée.</p></section>
          <section><h3>Anomalies</h3><p>Phénomènes réellement observés et documentés, même lorsque leur origine ou leur fonctionnement reste inconnu.</p></section>
        </div>
      </div>
    </div>
  )
}

function ResourceDirectory({ onOpen, onBack }: { onOpen: (entry: ResourceMaterialEntry) => void; onBack: () => void }) {
  const [openCategory, setOpenCategory] = useState<ResourceCategoryId>('industrial')

  return (
    <div className="discovery-directory">
      <DiscoveryHeader title="Ressources & Matériaux" onBack={onBack} />
      <div className="resource-accordion">
        {resourceCategories.map((category) => {
          const opened = openCategory === category.id
          const entries = resourceMaterials.filter((entry) => entry.category === category.id)
          return (
            <section className={`resource-category ${opened ? 'open' : ''}`} key={category.id}>
              <button className="resource-category-head" onClick={() => setOpenCategory(opened ? category.id : category.id)}>
                <span><strong>{category.label}</strong><small>{category.description}</small></span>
                <span className="resource-category-meta">{entries.length} entrée{entries.length > 1 ? 's' : ''} <b>{opened ? '⌃' : '⌄'}</b></span>
              </button>
              {opened && (
                <div className="resource-list">
                  {entries.map((entry) => (
                    <button className="resource-list-card" key={entry.id} onClick={() => onOpen(entry)}>
                      <span className="resource-list-sample" aria-hidden="true" />
                      <div><strong>{entry.name}</strong><span>{entry.description}</span></div>
                      <div className="resource-list-meta"><span>{entry.family}</span><b>{entry.rarity}</b></div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

function ResourceDetail({ entry, onBack }: { entry: ResourceMaterialEntry; onBack: () => void }) {
  return (
    <article className="discovery-detail-grid">
      <DiscoveryIllustration label={`Échantillon · ${entry.name}`} />
      <div className="discovery-detail-main">
        <button className="lore-detail-back" onClick={onBack}>‹ Retour</button>
        <h2>{entry.name}</h2>
        <TextSection title="Description"><p>{entry.description}</p></TextSection>
        <TextSection title="Propriétés" divided><p>{entry.properties}</p></TextSection>
        <TextSection title="Méthode d’extraction / collecte" divided><p>{entry.collection}</p></TextSection>
      </div>
      <aside className="discovery-detail-aside">
        <DiscoveryInfo title="Famille" values={[entry.family]} />
        <DiscoveryInfo title="Rareté" values={[entry.rarity]} />
        <DiscoveryInfo title="Usages connus" values={entry.knownUses} />
        <DiscoveryInfo title="Gisements / zones connues" values={entry.knownLocations} />
        <DiscoveryInfo title="Dangers" values={[entry.hazards]} />
        <DiscoveryInfo title="Découverte" values={[entry.discoveredBy, entry.discoveryContext]} />
      </aside>
    </article>
  )
}

function TechnologiesPlaceholder({ onBack }: { onBack: () => void }) {
  return (
    <div className="discovery-directory">
      <DiscoveryHeader title="Technologies" onBack={onBack} />
      <div className="lore-pending discovery-tech-pending">
        <span>SECTION RÉSERVÉE</span>
        <h2>Technologies</h2>
        <p>Cette partie est volontairement laissée en attente. Son organisation et son fonctionnement seront définis lors d’une discussion dédiée.</p>
      </div>
    </div>
  )
}

function AnomalyDirectory({ onOpen, onBack }: { onOpen: (entry: AnomalyEntry) => void; onBack: () => void }) {
  return (
    <div className="discovery-directory">
      <DiscoveryHeader title="Anomalies" onBack={onBack} />
      <div className="anomaly-list">
        {anomalies.map((entry) => (
          <button className="anomaly-card" key={entry.id} onClick={() => onOpen(entry)}>
            <div className="anomaly-card-main"><strong>{entry.designation}</strong><span>{entry.location}</span></div>
            <span className={`anomaly-status status-${statusClass(entry.status)}`}>{entry.status}</span>
            <div className={`danger-badge compact danger-${dangerClass(entry.danger)}`}><span>Danger</span><strong>{entry.danger}</strong></div>
          </button>
        ))}
      </div>
    </div>
  )
}

function AnomalyDetail({ entry, onBack }: { entry: AnomalyEntry; onBack: () => void }) {
  return (
    <article className="discovery-detail-grid anomaly-detail">
      <DiscoveryIllustration label={`Relevé · ${entry.designation}`} />
      <div className="discovery-detail-main">
        <button className="lore-detail-back" onClick={onBack}>‹ Retour</button>
        <h2>{entry.designation}</h2>
        <TextSection title="Description"><p>{entry.description}</p></TextSection>
        <ListSection title="Observations" values={entry.observations} divided />
        <ListSection title="Effets connus" values={entry.knownEffects} divided />
        <ListSection title="Théories actuelles" values={entry.theories} divided />
      </div>
      <aside className="discovery-detail-aside">
        <DiscoveryInfo title="Localisation" values={[entry.location]} />
        <DiscoveryInfo title="Statut" values={[entry.status]} />
        <section><h3>Niveau de danger</h3><div className={`danger-badge discovery-danger danger-${dangerClass(entry.danger)}`}><span>Niveau de danger</span><strong>{entry.danger}</strong></div></section>
        <DiscoveryInfo title="Découverte" values={[entry.discoveredBy, entry.discoveryContext]} />
      </aside>
    </article>
  )
}

function DiscoveryHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return <div className="discovery-section-header"><button className="lore-section-back" onClick={onBack}>‹ Retour</button><h2>{title}</h2></div>
}

function DiscoveryInfo({ title, values }: { title: string; values: string[] }) {
  return <section><h3>{title}</h3><div className="discovery-info-list">{values.map((value) => <span key={value}>{value}</span>)}</div></section>
}

function DiscoveryIllustration({ label }: { label: string }) {
  return <div className="lore-illustration tall discovery-illustration"><div className="lore-illustration-grid" /><span>{label}</span></div>
}

function TextSection({ title, divided = false, children }: { title: string; divided?: boolean; children: ReactNode }) {
  return <section className={`lore-text-section ${divided ? 'divided' : ''}`}><h3>{title}</h3>{children}</section>
}

function ListSection({ title, values, divided = false }: { title: string; values: string[]; divided?: boolean }) {
  return <section className={`lore-text-section ${divided ? 'divided' : ''}`}><h3>{title}</h3><ul className="lore-text-list">{values.map((value) => <li key={value}>{value}</li>)}</ul></section>
}

function dangerClass(level: DangerLevel) {
  if (level === 'Faible') return 'low'
  if (level === 'Modéré') return 'moderate'
  if (level === 'Élevé') return 'high'
  if (level === 'Extrême') return 'extreme'
  return 'deadly'
}

function statusClass(status: AnomalyEntry['status']) {
  return status.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}
