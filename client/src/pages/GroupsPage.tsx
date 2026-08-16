import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

type Post = {
  id: number;
  contenu: string;
  author?: {
    pseudonyme: string;
  };
  createdAt: string;
};

type GroupDetails = {
  id: number;
  nom: string;
  thematique: string;
  description: string;
  visibility: "PUBLIC" | "PRIVE";
  posts: Post[];
};

export default function GroupDetailsPage() {
  const { id } = useParams();

  const [group, setGroup] = useState<GroupDetails | null>(null);
  const [contenu, setContenu] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGroup() {
      try {
        const response = await api.get<GroupDetails>(`/groups/${id}`);
        setGroup(response.data);
      } catch {
        setError("Impossible de charger le groupe.");
      } finally {
        setLoading(false);
      }
    }

    loadGroup();
  }, [id]);

  async function handlePost() {
    if (!contenu.trim()) {
      return;
    }

    try {
      const response = await api.post<Post>(`/groups/${id}/posts`, {
        contenu,
      });

      if (group) {
        setGroup({
          ...group,
          posts: [response.data, ...group.posts],
        });
      }

      setContenu("");
    } catch {
      setError("Impossible de publier le message.");
    }
  }

  if (loading) {
    return <p>Chargement du groupe...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!group) {
    return <p>Groupe introuvable.</p>;
  }

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">{group.thematique}</p>
          <h1>{group.nom}</h1>
          <p className="page-description">{group.description}</p>
        </div>
      </section>

      <section className="group-detail-grid">
        <div>
          <article className="card post-form-card">
            <h2>Nouvelle publication</h2>

            <textarea
              rows={4}
              value={contenu}
              onChange={(event) => setContenu(event.target.value)}
              placeholder="Partage quelque chose avec le groupe..."
            />

            <button
              className="primary-button"
              type="button"
              onClick={handlePost}
            >
              Publier
            </button>
          </article>

          {group.posts.length === 0 && (
            <article className="card">
              <p>Aucune publication pour le moment.</p>
            </article>
          )}

          {group.posts.map((post) => (
            <article className="card group-post" key={post.id}>
              <div className="post-header">
                <strong>{post.author?.pseudonyme ?? "Utilisateur"}</strong>
                <span>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p>{post.contenu}</p>

              <button type="button" className="favorite-button">
                Commenter
              </button>
            </article>
          ))}
        </div>

        <aside className="card group-info">
          <h2>À propos</h2>

          <p>{group.description}</p>

          <p>
            Visibilité :{" "}
            <strong>
              {group.visibility === "PRIVE" ? "Privé" : "Public"}
            </strong>
          </p>
        </aside>
      </section>
    </div>
  );
}