import TarjetaReceta from "./TarjetaReceta";

const RecetasListado = ({ recetas, loading, error, onDelete }) => {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
        <span className="spinner spinner-dark" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error" style={{ marginTop: "16px" }}>
        {error}
      </div>
    );
  }

  if (recetas.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🍽</div>
        <h3>Sin recetas</h3>
        <p>Aún no tenés recetas guardadas. ¡Creá tu primera receta!</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recetas.map((receta) => (
        <TarjetaReceta
          key={receta._id}
          receta={receta}
          onDelete={() => onDelete(receta._id)}
        />
      ))}
    </div>
  );
};

export default RecetasListado;
