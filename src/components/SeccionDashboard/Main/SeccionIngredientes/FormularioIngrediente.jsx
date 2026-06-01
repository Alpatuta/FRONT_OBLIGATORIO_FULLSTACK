import { useState } from "react";

const FormularioIngrediente = ({ editando, onCancelEdit }) => {
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
    }, 900);
  };

  return (
    <>
      <div className="card-header">
        <div>
          <div className="card-title">
            {editando ? "Editar ingrediente" : "Nuevo ingrediente"}
          </div>
          <div className="card-subtitle">
            {editando
              ? `Editando: ${editando.nombre}`
              : "Registrá un ingrediente con su cantidad"}
          </div>
        </div>
        {editando && <span className="badge badge-amber">Editando</span>}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="ing-nombre">Nombre del ingrediente</label>
          <input
            id="ing-nombre"
            type="text"
            placeholder="Ej: Harina de trigo, Aceite de oliva…"
            defaultValue={editando?.nombre ?? ""}
            key={editando?.id ?? "new"}
            required
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div className="field">
            <label htmlFor="ing-cantidad">Cantidad</label>
            <input
              id="ing-cantidad"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="500"
              defaultValue={editando?.cantidad ?? ""}
              key={editando?.id ?? "new"}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="ing-unidad">Unidad</label>
            <select
              id="ing-unidad"
              defaultValue={editando?.unidad ?? "g"}
              key={editando?.id ?? "new"}
            >
              <option value="g">gramos (g)</option>
              <option value="kg">kilogramos (kg)</option>
              <option value="ml">mililitros (ml)</option>
              <option value="l">litros (l)</option>
              <option value="unid">unidades</option>
              <option value="cdta">cucharadita</option>
              <option value="cda">cucharada</option>
              <option value="taza">taza</option>
            </select>
          </div>
        </div>

        {saved && (
          <div className="alert alert-success">
            Ingrediente {editando ? "actualizado" : "registrado"} correctamente.
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
            {editando ? "Actualizar" : "Agregar ingrediente"}
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

export default FormularioIngrediente;
