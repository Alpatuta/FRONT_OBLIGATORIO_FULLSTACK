import TarjetaReceta from "./TarjetaReceta";



const RecetasListado = ({ recetas, loading, error, onDelete, onEdit, correoUsuario }) => {
  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "48px 0" }}
      >
        <span className="spinner spinner-dark spinner-lg" />
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
          onEdit={() => onEdit(receta)}
          esPropia={receta.autor === correoUsuario}
        />
      ))}
    </div>
  );
};

export default RecetasListado;
