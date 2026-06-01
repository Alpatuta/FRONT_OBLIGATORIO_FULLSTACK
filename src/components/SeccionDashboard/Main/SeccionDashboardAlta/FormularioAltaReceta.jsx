import { useState } from "react";

const FormularioAltaReceta = () => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="receta-titulo">Título</label>
        <input
          id="receta-titulo"
          type="text"
          placeholder="Tarta rústica de verduras"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="receta-categoria">Categoría</label>
        <select id="receta-categoria">
          <option value="">Seleccioná una categoría</option>
          <option>Vegetariana</option>
          <option>Pastas</option>
          <option>Postres</option>
          <option>Ensaladas</option>
          <option>Carnes</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="receta-dificultad">Dificultad</label>
        <select id="receta-dificultad">
          <option value="">Seleccioná dificultad</option>
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="receta-imagen">Imagen</label>
        <input id="receta-imagen" type="file" accept="image/*" />
        <span className="field-hint">PNG, JPG o WEBP. Máximo 5MB</span>
      </div>

      <div className="field span-2">
        <label htmlFor="receta-descripcion">Descripción</label>
        <textarea
          id="receta-descripcion"
          rows={3}
          placeholder="Descripción breve de la receta…"
        />
      </div>

      <div className="field span-2">
        <label htmlFor="receta-ingredientes">Ingredientes</label>
        <textarea
          id="receta-ingredientes"
          rows={3}
          placeholder="Un ingrediente por línea: Harina, Huevos, Queso…"
        />
        <span className="field-hint">Escribí un ingrediente por línea</span>
      </div>

      <div className="field span-2">
        <label htmlFor="receta-pasos">Pasos de preparación</label>
        <textarea
          id="receta-pasos"
          rows={4}
          placeholder="Un paso por línea: Mezclar la harina, Agregar los huevos…"
        />
        <span className="field-hint">Escribí un paso por línea</span>
      </div>

      {saved && (
        <div className="alert alert-success span-2">
          ¡Receta guardada correctamente!
        </div>
      )}

      <button
        className="btn btn-primary btn-lg btn-full span-2"
        type="submit"
        disabled={loading}
      >
        {loading ? <span className="spinner" /> : null}
        {loading ? "Guardando…" : "Guardar receta"}
      </button>
    </form>
  );
};

export default FormularioAltaReceta;
