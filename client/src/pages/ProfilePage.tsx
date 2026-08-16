import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProfilePage() {
  const [pseudonyme, setPseudonyme] = useState("");
  const [nomReel, setNomReel] = useState("");
  const [bio, setBio] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [contactLevel, setContactLevel] = useState("TOUT_LE_MONDE");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get("/profile/me");

        setPseudonyme(response.data.pseudonyme ?? "");
        setNomReel(response.data.nomReel ?? "");
        setBio(response.data.bio ?? "");
        setVisibility(response.data.profileVisibility ?? "PUBLIC");
        setContactLevel(response.data.contactLevel ?? "TOUT_LE_MONDE");
      } catch {
        setError("Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      await api.patch("/profile/me", {
        pseudonyme,
        nomReel,
        bio,
        profileVisibility: visibility,
        contactLevel,
      });

      setMessage("Profil enregistré avec succès.");
    } catch {
      setError("Impossible d’enregistrer le profil.");
    }
  }

  async function handleExport() {
    try {
      const response = await api.get("/profile/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");

      link.href = url;
      link.download = "mindharbor-donnees.json";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch {
      setError("Impossible d’exporter les données.");
    }
  }

  async function handleDelete() {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer votre compte ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      await api.delete("/profile/me");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.href = "/login";
    } catch {
      setError("Impossible de supprimer le compte.");
    }
  }

  if (loading) {
    return <p>Chargement du profil...</p>;
  }

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Mon compte</p>

          <h1>Profil et confidentialité</h1>

          <p className="page-description">
            Gère les informations visibles et les personnes qui peuvent te
            contacter.
          </p>
        </div>
      </section>

      {error && <p className="error-message">{error}</p>}

      <section className="profile-grid">
        <form className="card" onSubmit={handleSubmit}>
          <h2>Informations du profil</h2>

          <div className="form-group">
            <label htmlFor="pseudonyme">Pseudonyme</label>

            <input
              id="pseudonyme"
              type="text"
              value={pseudonyme}
              onChange={(event) => setPseudonyme(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nomReel">Nom réel</label>

            <input
              id="nomReel"
              type="text"
              value={nomReel}
              onChange={(event) => setNomReel(event.target.value)}
              placeholder="Optionnel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biographie</label>

            <textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Quelques mots sur toi..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="visibility">Visibilité du profil</label>

            <select
              id="visibility"
              value={visibility}
              onChange={(event) => setVisibility(event.target.value)}
            >
              <option value="PUBLIC">Public</option>

              <option value="GROUPES_SEULEMENT">
                Groupes seulement
              </option>

              <option value="PRIVE">Privé</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="contactLevel">
              Qui peut me contacter ?
            </label>

            <select
              id="contactLevel"
              value={contactLevel}
              onChange={(event) => setContactLevel(event.target.value)}
            >
              <option value="PERSONNE">Personne</option>

              <option value="MEMBRES_DE_MES_GROUPES">
                Membres de mes groupes
              </option>

              <option value="TOUT_LE_MONDE">
                Tout le monde
              </option>
            </select>
          </div>

          {message && (
            <p className="success-message">{message}</p>
          )}

          <button className="primary-button" type="submit">
            Enregistrer
          </button>
        </form>

        <aside className="card profile-actions">
          <h2>Mes données</h2>

          <p>
            Tu peux télécharger une copie de tes données ou demander la
            suppression de ton compte.
          </p>

          <button
            className="secondary-button"
            type="button"
            onClick={handleExport}
          >
            Exporter mes données
          </button>

          <button
            className="danger-button"
            type="button"
            onClick={handleDelete}
          >
            Supprimer mon compte
          </button>
        </aside>
      </section>
    </div>
  );
}