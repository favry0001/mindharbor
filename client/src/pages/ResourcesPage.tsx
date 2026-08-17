import { useEffect, useState } from "react";
import api from "../api/axios";

type Resource = {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  dureeMinutes: number;
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadResources() {
      try {
        const response = await api.get<Resource[]>("/resources");
        setResources(response.data);
      } catch {
        setError("Impossible de charger les ressources.");
      } finally {
        setLoading(false);
      }
    }

    loadResources();
  }, []);

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

      {loading && <p>Chargement des ressources...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && resources.length === 0 && (
        <p>Aucune ressource disponible.</p>
      )}

      <section className="resources-grid">
        {resources.map((resource) => (
          <article className="card resource-card" key={resource.id}>
            <span className="resource-category">
              {resource.categorie}
            </span>

            <h2>{resource.titre}</h2>

            <p>{resource.description}</p>

            <div className="resource-footer">
              <span>{resource.dureeMinutes} min</span>

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