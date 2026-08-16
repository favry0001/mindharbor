import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Bonjour</p>
          <h1>Tableau de bord</h1>
          <p className="page-description">
            Un aperçu simple de ta semaine et de ton bien-être.
          </p>
        </div>

        <Link to="/journal" className="action-link">
          Écrire dans mon journal
        </Link>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <p>Humeur moyenne</p>
          <strong>4 / 5</strong>
          <span>Cette semaine</span>
        </article>

        <article className="card stat-card">
          <p>Énergie</p>
          <strong>3 / 5</strong>
          <span>Cette semaine</span>
        </article>

        <article className="card stat-card">
          <p>Sommeil</p>
          <strong>4 / 5</strong>
          <span>Cette semaine</span>
        </article>

        <article className="card stat-card">
          <p>Anxiété</p>
          <strong>2 / 5</strong>
          <span>Cette semaine</span>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="card">
          <h2>Suggestion du jour</h2>
          <p>
            Prends quelques minutes aujourd’hui pour noter une chose qui t’a
            fait du bien.
          </p>

          <Link to="/journal" className="text-link">
            Ouvrir le journal
          </Link>
        </article>

        <article className="card">
          <h2>Cette semaine</h2>
          <p>
            Tes entrées récentes permettront bientôt d’afficher ici une
            observation personnalisée.
          </p>

          <Link to="/trends" className="text-link">
            Voir mes tendances
          </Link>
        </article>
      </section>
    </div>
  );
}