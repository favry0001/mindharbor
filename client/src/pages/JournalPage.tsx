import { useState } from "react";
import api from "../api/axios";

type JournalForm = {
  humeur: number;
  energie: number;
  sommeil: number;
  anxiete: number;
  evenements: string;
  gratitude: string;
};

export default function JournalPage() {
  const [form, setForm] = useState<JournalForm>({
    humeur: 3,
    energie: 3,
    sommeil: 3,
    anxiete: 3,
    evenements: "",
    gratitude: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: event.target.type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setMessage("");

  try {
    await api.post("/journal", {
      humeur: form.humeur,
      energie: form.energie,
      sommeil: form.sommeil,
      anxiete: form.anxiete,
      evenements: form.evenements,
      gratitude: form.gratitude,
    });

    setMessage("Entrée enregistrée avec succès.");
  } catch {
    setMessage("Impossible d’enregistrer l’entrée.");
  }
}

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Aujourd’hui</p>
          <h1>Mon journal</h1>
          <p className="page-description">
            Prends un moment pour noter comment tu te sens.
          </p>
        </div>
      </section>

      <section className="journal-grid">
        <form className="card journal-form" onSubmit={handleSubmit}>
          <h2>Entrée du jour</h2>

          <div className="metrics-grid">
            <div className="form-group">
              <label htmlFor="humeur">Humeur</label>
              <input
                id="humeur"
                name="humeur"
                type="number"
                min="1"
                max="5"
                value={form.humeur}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="energie">Énergie</label>
              <input
                id="energie"
                name="energie"
                type="number"
                min="1"
                max="5"
                value={form.energie}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="sommeil">Sommeil</label>
              <input
                id="sommeil"
                name="sommeil"
                type="number"
                min="1"
                max="5"
                value={form.sommeil}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="anxiete">Anxiété</label>
              <input
                id="anxiete"
                name="anxiete"
                type="number"
                min="1"
                max="5"
                value={form.anxiete}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="evenements">Événements de la journée</label>
            <textarea
              id="evenements"
              name="evenements"
              rows={4}
              value={form.evenements}
              onChange={handleChange}
              placeholder="Qu’est-ce qui a marqué ta journée ?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gratitude">Gratitude</label>
            <textarea
              id="gratitude"
              name="gratitude"
              rows={3}
              value={form.gratitude}
              onChange={handleChange}
              placeholder="Une chose pour laquelle tu es reconnaissant aujourd’hui..."
            />
          </div>

          {message && <p className="success-message">{message}</p>}

          <button className="primary-button" type="submit">
            Enregistrer mon entrée
          </button>
        </form>

        <aside className="card journal-side">
          <h2>Petit rappel</h2>
          <p>
            Il n’y a pas de bonne ou de mauvaise réponse. Utilise cet espace
            comme il t’aide le mieux.
          </p>

          <div className="journal-scale">
            <span>1 = difficile</span>
            <span>5 = très bien</span>
          </div>
        </aside>
      </section>

      <section className="card journal-history">
        <h2>Historique récent</h2>

        <div className="history-empty">
          <p>Aucune entrée précédente à afficher pour le moment.</p>
        </div>
      </section>
    </div>
  );
}