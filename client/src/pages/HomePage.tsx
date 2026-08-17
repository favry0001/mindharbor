import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="home-page">
      <header className="home-header">
        <Link to="/" className="logo">
          <span className="logo-mark">MH</span>

          <span className="logo-text">
            <span className="logo-title">MindHarbor</span>
            <span className="logo-subtitle">bien-être et soutien</span>
          </span>
        </Link>

        <nav className="home-nav">
          <Link to="/resources">Ressources</Link>
          <Link to="/groups">Groupes</Link>
          <Link to="/login">Connexion</Link>
        </nav>
      </header>

      <section className="home-hero">
        <div className="home-hero-content">
          <p className="eyebrow">Ton espace de bien-être</p>

          <h1>
            Prends soin de ton équilibre,
            <br />
            un jour à la fois.
          </h1>

          <p className="home-description">
            MindHarbor t’aide à suivre ton bien-être, comprendre tes tendances,
            découvrir des ressources utiles et trouver des groupes de soutien
            adaptés à tes besoins.
          </p>

          <div className="home-actions">
            <Link to="/register" className="primary-button home-button">
              Créer un compte
            </Link>

            <Link
              to="/login"
              className="secondary-button-link home-button"
            >
              Se connecter
            </Link>
          </div>
        </div>

        <div className="home-illustration">
          <div className="wellness-card main-wellness-card">
            <span className="wellness-icon">🌿</span>

            <h2>Comment te sens-tu aujourd’hui ?</h2>

            <div className="mood-row">
              <span>😔</span>
              <span>😕</span>
              <span>😐</span>
              <span>🙂</span>
              <span>😊</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features">
        <article>
          <span>📝</span>
          <h3>Journal quotidien</h3>
          <p>
            Suis ton humeur, ton énergie, ton sommeil et ton anxiété.
          </p>
        </article>

        <article>
          <span>📊</span>
          <h3>Tendances</h3>
          <p>
            Observe ton évolution au fil des jours et comprends mieux ton
            quotidien.
          </p>
        </article>

        <article>
          <span>🤝</span>
          <h3>Soutien</h3>
          <p>
            Accède à des ressources utiles et à des groupes de soutien.
          </p>
        </article>
      </section>
    </main>
  );
}
