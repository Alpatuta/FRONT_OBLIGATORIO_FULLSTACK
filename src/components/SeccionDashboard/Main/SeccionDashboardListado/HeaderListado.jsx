import FiltrosListado from "./FiltrosListado";

const HeaderListado = ({
  count,
  loading,
  filtroDificultad,
  setFiltroDificultad,
  filtroCategoria,
  setFiltroCategoria,
  categoriasDisponibles,
}) => {
  return (
    <div className="section-header">
      <div>
        <div className="card-title">Listado de recetas</div>
        <div className="card-subtitle">
          {loading
            ? "Cargando…"
            : `${count} receta${count !== 1 ? "s" : ""} en tu colección`}
        </div>
      </div>
      <FiltrosListado
        filtroDificultad={filtroDificultad}
        setFiltroDificultad={setFiltroDificultad}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        categoriasDisponibles={categoriasDisponibles}
      />
    </div>
  );
};

export default HeaderListado;
