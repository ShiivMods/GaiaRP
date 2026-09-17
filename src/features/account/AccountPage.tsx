const streakSlots = Array.from({ length: 7 }, (_, index) => index + 1)

export function AccountPage() {
  return (
    <main className="simple-page account-page">
      <section className="account-shell">
        <header className="account-heading">
          <div>
            <div className="inspector-kicker">COMPTE · BONUS</div>
            <h2>Bonus de compte</h2>
            <p>Les récompenses exactes seront définies plus tard. Cette page pose le fonctionnement prévu.</p>
          </div>
        </header>

        <div className="account-bonus-grid">
          <article className="account-bonus-card cozy-panel">
            <div className="account-bonus-head">
              <div>
                <small>SÉRIE DE CONNEXION</small>
                <h3>Série de 7 bonus</h3>
              </div>
              <span>Fenêtre de 11 jours</span>
            </div>
            <p>
              Chaque série comprend 7 jours de bonus et reste disponible pendant 11 jours.
            </p>
            <div className="account-streak-row" aria-label="Série de sept bonus de connexion">
              {streakSlots.map((slot) => (
                <div key={slot} className="account-streak-slot">
                  <span>{slot}</span>
                  <small>Bonus</small>
                </div>
              ))}
            </div>
          </article>

          <article className="account-bonus-card cozy-panel">
            <div className="account-bonus-head">
              <div>
                <small>ACTIVITÉ RP</small>
                <h3>Premier RP du jour</h3>
              </div>
              <span>1 fois par jour</span>
            </div>
            <p>
              Le premier RP publié dans la journée déclenche un bonus de compte. Sa valeur sera définie avec le système de récompenses.
            </p>
            <div className="account-daily-state">
              <strong>Bonus journalier</strong>
              <span>Déclenché automatiquement au premier RP du jour.</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
