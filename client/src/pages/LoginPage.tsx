import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import type { User } from "../types/User";

type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      login(
        response.data.user,
        response.data.accessToken,
        response.data.refreshToken
      );

      navigate("/dashboard");
    } catch {
      setError("Courriel ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="form-page">
      <section className="form-card">
        <h1>Connexion</h1>

        <form onSubmit={handleSubmit}>
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
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="helper-text">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </section>
    </main>
  );
}