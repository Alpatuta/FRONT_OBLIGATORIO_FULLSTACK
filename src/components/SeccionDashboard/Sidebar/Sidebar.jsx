import { Link } from "react-router";
import HeaderSidebar from "./HeaderSidebar";
import NavbarSidebar from "./NavbarSidebar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/auth.slice";

const Sidebar = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const primerLetraNombre = user?.nombre
    ? user.nombre.charAt(0).toUpperCase()
    : "U";
  const primerLetraApellido = user?.nombre
    ? user.nombre.split(" ").slice(-1)[0].charAt(0).toUpperCase()
    : "N";
  const dispatch = useDispatch();
  const cerrarSesion = () => {
    localStorage.clear();
    dispatch(logout((token = null), (user = null), (isAuthenticated = false)));
  };

  return (
    <aside className="sidebar">
      <HeaderSidebar />
      <NavbarSidebar />
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {primerLetraNombre}
            {primerLetraApellido}
          </div>
          <div>
            <div className="sidebar-user-name">{user?.nombre}</div>
            <div className="sidebar-user-plan">Plan {user?.plan}</div>
          </div>
        </div>
        <Link to="/" className="btn-sidebar-logout" onClick={cerrarSesion}>
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
