import { useSelector } from "react-redux";
import { useDashboard } from "../../../../context/DashboardContext";

const HeaderMain = ({ eyebrow, title }) => {
  const user = useSelector((state) => state.auth.user);
  const { toggleSidebar } = useDashboard();
  const primerLetraNombre = user?.nombre
    ? user.nombre.charAt(0).toUpperCase()
    : "U";
  const primerLetraApellido = user?.nombre
    ? user.nombre.split(" ").slice(-1)[0].charAt(0).toUpperCase()
    : "N";

  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          type="button"
          className="btn-hamburger"
          onClick={toggleSidebar}
          aria-label="Abrir menú"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="topbar-left">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="dashboard-title">{title}</h1>
        </div>
      </div>
      <div className="profile-pill">
        <div className="p-avatar">
          {primerLetraNombre}
          {primerLetraApellido}
        </div>
        <div>
          <strong>{user?.nombre}</strong>
          <span>Plan {user?.plan}</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
