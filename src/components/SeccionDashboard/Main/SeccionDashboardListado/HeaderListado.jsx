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

        {/* Toggle debajo del subtítulo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Todas
          </span>
          <div
            onClick={() => setSoloMias(!soloMias)}
            style={{
              width: "44px",
              height: "24px",
              borderRadius: "999px",
              background: soloMias ? "var(--primary, #16a34a)" : "#cbd5e1",
              position: "relative",
              cursor: "pointer",
              transition: "background 0.2s ease",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "3px",
                left: soloMias ? "23px" : "3px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transition: "left 0.2s ease",
              }}
            />
          </div>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Mis recetas
          </span>
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