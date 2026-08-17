import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function HomePage() {
  return (
    <main className="home-page">
      <header className="home-header">
        <Logo />

        <div className="home-nav">
          <Link to="/resources">Ressources</Link>
          <Link to="/groups">Groupes</Link>
          <Link to="/login">Connexion</Link>
        </div>
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
            découvrir des ressources utiles et échanger dans des groupes de
            soutien.
          </p>

          <div className="home-actions">
            <Link to="/register" className="primary-button home-button">
              Créer un compte
            </Link>

            <Link to="/login" className="secondary-button-link home-button">
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

          <div className="floating-card floating-card-one">
            <span>📖</span>
            <strong>Journal quotidien</strong>
          </div>

          <div className="floating-card floating-card-two">
            <span>📈</span>
            <strong>Suivre tes tendances</strong>
          </div>
        </div>
      </section>

      <section className="home-features">
        <article>
          <span>📝</span>
          <h3>Journal</h3>
          <p>Note ton humeur, ton énergie, ton sommeil et tes ressentis.</p>
        </article>

        <article>
          <span>📊</span>
          <h3>Tendances</h3>
          <p>Observe ton évolution et comprends mieux ton quotidien.</p>
        </article>

        <article>
          <span>🤝</span>
          <h3>Soutien</h3>
          <p>Découvre des ressources et des groupes adaptés à tes besoins.</p>
        </article>
      </section>
    </main>
  );
}