import { useParams } from "react-router-dom";

export default function GroupDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Groupe #{id}</p>
          <h1>Gestion du stress</h1>
          <p className="page-description">
            Un espace pour partager des expériences et échanger avec les membres.
          </p>
        </div>

        <button className="action-link" type="button">
          Rejoindre le groupe
        </button>
      </section>

      <section className="group-detail-grid">
        <div>
          <article className="card post-form-card">
            <h2>Nouvelle publication</h2>

            <textarea
              rows={4}
              placeholder="Partage quelque chose avec le groupe..."
            />

            <button className="primary-button" type="button">
              Publier
            </button>
          </article>

          <article className="card group-post">
            <div className="post-header">
              <strong>Alex</strong>
              <span>Aujourd’hui</span>
            </div>

            <p>
              Cette semaine, marcher 20 minutes le soir m’a vraiment aidé à
              diminuer mon stress.
            </p>

            <button type="button" className="favorite-button">
              Commenter
            </button>
          </article>

          <article className="card group-post">
            <div className="post-header">
              <strong>Sam</strong>
              <span>Hier</span>
            </div>

            <p>
              Est-ce que vous avez des techniques simples pour mieux gérer les
              moments de surcharge ?
            </p>

            <button type="button" className="favorite-button">
              Commenter
            </button>
          </article>
        </div>

        <aside className="card group-info">
          <h2>À propos</h2>

          <p>
            Groupe consacré au partage de stratégies et d’expériences autour du
            stress quotidien.
          </p>

          <p><strong>24 membres</strong></p>
          <p>Visibilité : Public</p>
        </aside>
      </section>
    </div>
  );
}