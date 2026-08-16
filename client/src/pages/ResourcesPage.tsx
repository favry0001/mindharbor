const resources = [
  {
    id: 1,
    titre: "Respiration guidée",
    description: "Un exercice simple pour ralentir et reprendre ton souffle.",
    categorie: "Apaisement",
    duree: "5 min",
  },
  {
    id: 2,
    titre: "Mieux comprendre le stress",
    description: "Quelques repères pour reconnaître les signes de stress.",
    categorie: "Comprendre",
    duree: "8 min",
  },
  {
    id: 3,
    titre: "Routine du soir",
    description: "Des habitudes simples pour favoriser un meilleur sommeil.",
    categorie: "Sommeil",
    duree: "10 min",
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Découvrir</p>
          <h1>Ressources</h1>
          <p className="page-description">
            Des contenus simples pour t’accompagner selon tes besoins.
          </p>
        </div>
      </section>

      <section className="resource-filters">
        <button className="period-button active">Toutes</button>
        <button className="period-button">Apaisement</button>
        <button className="period-button">Sommeil</button>
        <button className="period-button">Comprendre</button>
      </section>

      <section className="resources-grid">
        {resources.map((resource) => (
          <article className="card resource-card" key={resource.id}>
            <span className="resource-category">{resource.categorie}</span>

            <h2>{resource.titre}</h2>

            <p>{resource.description}</p>

            <div className="resource-footer">
              <span>{resource.duree}</span>
              <button type="button" className="favorite-button">
                Ajouter aux favoris
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}