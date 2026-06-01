import { useState } from "react";

const FormularioCategoria = ({ editando, onCancelEdit }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      if (editando) onCancelEdit();
      setTimeout(() => setSaved(false), 2500);
    }, 1000);
  };

  return (
    <>
      <div className="card-header">
        <div>
          <div className="card-title">
            {editando ? "Editar categoría" : "Nueva categoría"}
          </div>
          <div className="card-subtitle">
            {editando
              ? `Editando: ${editando.nombre}`
              : "Completá los datos de la nueva categoría"}
          </div>
        </div>
        {editando && <span className="badge badge-amber">Editando</span>}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="cat-nombre">Nombre</label>
          <input
            id="cat-nombre"
            type="text"
            placeholder="Ej: Postres, Ensaladas…"
            defaultValue={editando?.nombre ?? ""}
            key={editando?.id ?? "new"}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="cat-descripcion">Descripción</label>
          <textarea
            id="cat-descripcion"
            rows={3}
            placeholder="Descripción breve de la categoría…"
            defaultValue={editando?.descripcion ?? ""}
            key={editando?.id ?? "new"}
            required
          />
        </div>

        {saved && (
          <div className="alert alert-success">
            Categoría {editando ? "actualizada" : "creada"} correctamente.
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? <span className="spinner" /> : null}
            {editando ? "Actualizar" : "Crear categoría"}
          </button>
          {editando && (
            <button
              className="btn btn-ghost"
              type="button"
              onClick={onCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default FormularioCategoria;
