import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { jour: "Lun", humeur: 3, energie: 2, anxiete: 4 },
  { jour: "Mar", humeur: 4, energie: 3, anxiete: 3 },
  { jour: "Mer", humeur: 3, energie: 3, anxiete: 3 },
  { jour: "Jeu", humeur: 4, energie: 4, anxiete: 2 },
  { jour: "Ven", humeur: 5, energie: 4, anxiete: 2 },
  { jour: "Sam", humeur: 4, energie: 5, anxiete: 1 },
  { jour: "Dim", humeur: 4, energie: 4, anxiete: 2 },
];

export default function TrendsPage() {
  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Analyse</p>
          <h1>Mes tendances</h1>
          <p className="page-description">
            Observe l’évolution de ton bien-être dans le temps.
          </p>
        </div>
      </section>

      <section className="period-buttons">
        <button className="period-button active">7 jours</button>
        <button className="period-button">30 jours</button>
        <button className="period-button">90 jours</button>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <p>Humeur moyenne</p>
          <strong>3.9 / 5</strong>
          <span>7 derniers jours</span>
        </article>

        <article className="card stat-card">
          <p>Énergie moyenne</p>
          <strong>3.6 / 5</strong>
          <span>7 derniers jours</span>
        </article>

        <article className="card stat-card">
          <p>Anxiété moyenne</p>
          <strong>2.4 / 5</strong>
          <span>7 derniers jours</span>
        </article>

        <article className="card stat-card">
          <p>Entrées du journal</p>
          <strong>7</strong>
          <span>Cette période</span>
        </article>
      </section>

      <section className="card trends-chart">
        <h2>Évolution de la semaine</h2>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jour" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="humeur"
                stroke="#256c5a"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="energie"
                stroke="#3b82f6"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="anxiete"
                stroke="#d97706"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card insight-card">
        <h2>Observation</h2>
        <p>
          Ton humeur semble plus élevée les jours où ton énergie augmente.
          Continue à observer cette tendance dans les prochaines semaines.
        </p>
      </section>
    </div>
  );
}
