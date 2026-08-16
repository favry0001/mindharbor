import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pseudonyme, setPseudonyme] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        email,
        pseudonyme,
        password,
      });

      navigate("/login");
    } catch {
      setError("Impossible de créer le compte.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="form-page">
      <section className="form-card">
        <h1>Inscription</h1>

        <form onSubmit={handleSubmit}>
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
            <label htmlFor="email">Courriel</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <p className="helper-text">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </section>
    </main>
  );
}