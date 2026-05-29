import { Link } from "react-router";
import HeaderSidebar from "./HeaderSidebar";
import NavbarSidebar from "./NavbarSidebar";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <HeaderSidebar />
      <NavbarSidebar />
      <Link className="button button-ghost logout-link" to="/">
        Cerrar sesion
      </Link>
    </aside>
  );
};

export default Sidebar;
