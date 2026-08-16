import { useEffect, useState } from "react";
import api from "../api/axios";

type AdminStats = {
  users: number;
  groups: number;
  reports: number;
  resources: number;
};

type Report = {
  id: number;
  category: string;
  status: string;
  motif?: string;
};

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    users: 0,
    groups: 0,
    reports: 0,
    resources: 0,
  });

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAdminData() {
      try {
        const statsResponse = await api.get<AdminStats>("/admin/stats");
        const reportsResponse = await api.get<Report[]>("/admin/reports");

        setStats(statsResponse.data);
        setReports(reportsResponse.data);
      } catch {
        setError("Impossible de charger les données administrateur.");
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  async function handleReport(reportId: number) {
    try {
      await api.patch(`/admin/reports/${reportId}`, {
        status: "TRAITE",
      });

      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === reportId
            ? { ...report, status: "TRAITE" }
            : report
        )
      );
    } catch {
      setError("Impossible de traiter le signalement.");
    }
  }

  if (loading) {
    return <p>Chargement de l'administration...</p>;
  }

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Administration</p>

          <h1>Tableau de bord administrateur</h1>

          <p className="page-description">
            Statistiques anonymisées et gestion des signalements.
          </p>
        </div>
      </section>

      {error && <p className="error-message">{error}</p>}

      <section className="stats-grid">
        <article className="card stat-card">
          <p>Utilisateurs</p>
          <strong>{stats.users}</strong>
          <span>Comptes actifs</span>
        </article>

        <article className="card stat-card">
          <p>Groupes</p>
          <strong>{stats.groups}</strong>
          <span>Groupes actifs</span>
        </article>

        <article className="card stat-card">
          <p>Signalements</p>
          <strong>{stats.reports}</strong>
          <span>En attente</span>
        </article>

        <article className="card stat-card">
          <p>Ressources</p>
          <strong>{stats.resources}</strong>
          <span>Disponibles</span>
        </article>
      </section>

      <section className="card reports-card">
        <h2>Signalements récents</h2>

        {reports.length === 0 && (
          <p>Aucun signalement à afficher.</p>
        )}

        <div className="reports-list">
          {reports.map((report) => (
            <article className="report-item" key={report.id}>
              <div>
                <span className="resource-category">
                  {report.category}
                </span>

                <h3>
                  {report.motif || "Signalement utilisateur"}
                </h3>

                <p>Statut : {report.status}</p>
              </div>

              <div className="report-actions">
                <button
                  className="primary-small-button"
                  type="button"
                  onClick={() => handleReport(report.id)}
                  disabled={report.status === "TRAITE"}
                >
                  {report.status === "TRAITE"
                    ? "Traité"
                    : "Traiter"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}