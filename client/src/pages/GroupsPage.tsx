import { Link } from "react-router-dom";

const groups = [
  {
    id: 1,
    nom: "Gestion du stress",
    thematique: "Stress",
    description: "Un espace pour partager des stratégies et expériences.",
    membres: 24,
    prive: false,
  },
  {
    id: 2,
    nom: "Sommeil et habitudes",
    thematique: "Sommeil",
    description: "Échanger autour des routines, difficultés et progrès.",
    membres: 17,
    prive: false,
  },
  {
    id: 3,
    nom: "Parler sans jugement",
    thematique: "Soutien",
    description: "Un groupe privé pour échanger dans un cadre bienveillant.",
    membres: 12,
    prive: true,
  },
];

export default function GroupsPage() {
  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Communauté</p>
          <h1>Groupes de soutien</h1>
          <p className="page-description">
            Rejoins des espaces d’échange selon les sujets qui t’intéressent.
          </p>
        </div>
      </section>

      <section className="groups-grid">
        {groups.map((group) => (
          <article className="card group-card" key={group.id}>
            <div className="group-card-header">
              <span className="resource-category">{group.thematique}</span>
              <span className="group-visibility">
                {group.prive ? "Privé" : "Public"}
              </span>
            </div>

            <h2>{group.nom}</h2>

            <p>{group.description}</p>

            <div className="group-footer">
              <span>{group.membres} membres</span>

              <Link to={`/groups/${group.id}`} className="text-link">
                Voir le groupe
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}