import FiltrosListado from "./FiltrosListado";

const HeaderListado = ({
  count,
  loading,
  filtroDificultad,
  setFiltroDificultad,
  filtroCategoria,
  setFiltroCategoria,
  categoriasDisponibles,
  soloMias,
  setSoloMias,
}) => {
  return (
    <div className="section-header">
      <div>
        <div className="card-title">Listado de recetas</div>
        <div className="card-subtitle">
          {loading
            ? "Cargando…"
            : `${count} receta${count !== 1 ? "s" : ""} ${soloMias ? "en tu colección" : "en total"}`}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div className="toggle-group">
          <button
            type="button"
            className={`toggle-btn${soloMias ? " active" : ""}`}
            onClick={() => setSoloMias(true)}
          >
            Mis recetas
          </button>
          <button
            type="button"
            className={`toggle-btn${!soloMias ? " active" : ""}`}
            onClick={() => setSoloMias(false)}
          >
            Todas
          </button>
        </div>
        <FiltrosListado
          filtroDificultad={filtroDificultad}
          setFiltroDificultad={setFiltroDificultad}
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          categoriasDisponibles={categoriasDisponibles}
        />
      </div>
    </div>
  );
};

export default HeaderListado;