const HeaderGrafico = ({ loading }) => {
  return (
    <div className="section-header">
      <div>
        <div className="card-title">Distribución de recetas</div>
        <div className="card-subtitle">
          {loading ? "Cargando…" : "Recetas por categoría y dificultad"}
        </div>
      </div>
    </div>
  );
};

export default HeaderGrafico;