import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <Logo />

        <nav className="nav-links">
          <Link to="/dashboard">Tableau de bord</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/trends">Tendances</Link>
          <Link to="/resources">Ressources</Link>
          <Link to="/groups">Groupes</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/profile">Profil</Link>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </nav>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}