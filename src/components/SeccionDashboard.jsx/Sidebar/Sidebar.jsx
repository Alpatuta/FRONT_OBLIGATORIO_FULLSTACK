import HeaderSidebar from "./HeaderSidebar";
import NavbarSidebar from "./NavbarSidebar";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <HeaderSidebar />
      <NavbarSidebar />
      <a className="button button-ghost logout-link" href="#login">
        Cerrar sesion
      </a>
    </aside>
  );
};

export default Sidebar;
