import { Link } from "react-router";
import HeaderSidebar from "./HeaderSidebar";
import NavbarSidebar from "./NavbarSidebar";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <HeaderSidebar />
      <NavbarSidebar />
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">RP</div>
          <div>
            <div className="sidebar-user-name">Rodrigo Pintos</div>
            <div className="sidebar-user-plan">Plan plus</div>
          </div>
        </div>
        <Link to="/" className="btn-sidebar-logout">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
