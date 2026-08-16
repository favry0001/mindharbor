const reports = [
  {
    id: 1,
    category: "INQUIETANT",
    contenu: "Publication signalée dans le groupe Gestion du stress",
    status: "EN_ATTENTE",
  },
  {
    id: 2,
    category: "SPAM",
    contenu: "Commentaire signalé",
    status: "EN_ATTENTE",
  },
];

export default function AdminPage() {
  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Administration</p>
          <h1>Tableau de bord administrateur</h1>
          <p className="page-description">
            Statistiques anonymisées et gestion des signalements.
          </p>
        </div>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <p>Utilisateurs</p>
          <strong>128</strong>
          <span>Comptes actifs</span>
        </article>

        <article className="card stat-card">
          <p>Groupes</p>
          <strong>12</strong>
          <span>Groupes actifs</span>
        </article>

        <article className="card stat-card">
          <p>Signalements</p>
          <strong>2</strong>
          <span>En attente</span>
        </article>

        <article className="card stat-card">
          <p>Ressources</p>
          <strong>34</strong>
          <span>Disponibles</span>
        </article>
      </section>

      <section className="card reports-card">
        <h2>Signalements récents</h2>

        <div className="reports-list">
          {reports.map((report) => (
            <article className="report-item" key={report.id}>
              <div>
                <span className="resource-category">{report.category}</span>
                <h3>{report.contenu}</h3>
                <p>Statut : {report.status}</p>
              </div>

              <div className="report-actions">
                <button className="secondary-button" type="button">
                  Voir
                </button>
                <button className="primary-small-button" type="button">
                  Traiter
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}