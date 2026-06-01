const NavbarSidebar = () => {
  return (
    <nav className="nav-list" aria-label="Navegacion principal">
      <a className="active" href="#dashboard">
        Resumen
      </a>
      <a href="#dashboard">Agregar receta</a>
      <a href="#dashboard">Recetas</a>
      <a href="#dashboard">Uso del plan</a>
      <a href="#dashboard">Grafico</a>
    </nav>
  );
};

export default NavbarSidebar;
