import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="navbar">
        <Link to="/" className="brand">
          MindHarbor
        </Link>

        <nav>
          <Link to="/dashboard">Tableau de bord</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/trends">Tendances</Link>
          <Link to="/resources">Ressources</Link>
          <Link to="/groups">Groupes</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/profile">Profil</Link>
        </nav>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}