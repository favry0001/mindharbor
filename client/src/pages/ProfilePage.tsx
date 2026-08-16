import { useState } from "react";

export default function ProfilePage() {
  const [pseudonyme, setPseudonyme] = useState("Utilisateur");
  const [nomReel, setNomReel] = useState("");
  const [bio, setBio] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [contactLevel, setContactLevel] = useState("TOUT_LE_MONDE");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Profil enregistré localement pour le moment.");
  }

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Mon compte</p>
          <h1>Profil et confidentialité</h1>
          <p className="page-description">
            Gère les informations visibles et les personnes qui peuvent te contacter.
          </p>
        </div>
      </section>

      <section className="profile-grid">
        <form className="card" onSubmit={handleSubmit}>
          <h2>Informations du profil</h2>

          <div className="form-group">
            <label htmlFor="pseudonyme">Pseudonyme</label>
            <input
              id="pseudonyme"
              value={pseudonyme}
              onChange={(event) => setPseudonyme(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nomReel">Nom réel</label>
            <input
              id="nomReel"
              value={nomReel}
              onChange={(event) => setNomReel(event.target.value)}
              placeholder="Optionnel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
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
              <option value="GROUPES_SEULEMENT">Groupes seulement</option>
              <option value="PRIVE">Privé</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="contactLevel">Qui peut me contacter ?</label>
            <select
              id="contactLevel"
              value={contactLevel}
              onChange={(event) => setContactLevel(event.target.value)}
            >
              <option value="PERSONNE">Personne</option>
              <option value="MEMBRES_DE_MES_GROUPES">
                Membres de mes groupes
              </option>
              <option value="TOUT_LE_MONDE">Tout le monde</option>
            </select>
          </div>

          {message && <p className="success-message">{message}</p>}

          <button className="primary-button" type="submit">
            Enregistrer
          </button>
        </form>

        <aside className="card profile-actions">
          <h2>Mes données</h2>

          <p>
            Tu peux télécharger une copie de tes données ou demander la suppression
            de ton compte.
          </p>

          <button className="secondary-button" type="button">
            Exporter mes données
          </button>

          <button className="danger-button" type="button">
            Supprimer mon compte
          </button>
        </aside>
      </section>
    </div>
  );
}