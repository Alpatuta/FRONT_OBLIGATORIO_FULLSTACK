import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../../../api/api";

const StarPicker = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: "none",
            border: "none",
            padding: "2px 4px",
            cursor: "pointer",
            fontSize: "28px",
            lineHeight: 1,
            color: star <= (hovered || value) ? "#f59e0b" : "var(--border-md)",
            transition: "color 0.12s",
          }}
          aria-label={`${star} estrellas`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const FormularioReview = ({ editando, onCancelEdit, onSaved, recetas }) => {
  const token = useSelector((s) => s.auth.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [calificacion, setCalificacion] = useState(editando?.calificacion ?? 0);
  const [comentario, setComentario] = useState(editando?.comentario ?? "");
  const [recetaId, setRecetaId] = useState(
    editando?.receta?._id ?? editando?.receta ?? "",
  );

  useEffect(() => {
    setCalificacion(editando?.calificacion ?? 0);
    setComentario(editando?.comentario ?? "");
    setRecetaId(editando?.receta?._id ?? editando?.receta ?? "");
    setError("");
  }, [editando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!calificacion) {
      setError("Seleccioná una calificación.");
      return;
    }
    if (comentario.trim().length < 5) {
      setError("El comentario debe tener al menos 5 caracteres.");
      return;
    }
    if (!recetaId) {
      setError("Seleccioná una receta.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        comentario: comentario.trim(),
        calificacion,
        receta: recetaId,
      };
      const headers = { Authorization: `Bearer ${token}` };

      if (editando) {
        await api.put(`/reviews/${editando._id}`, payload, { headers });
      } else {
        await api.post("/reviews", payload, { headers });
        setCalificacion(0);
        setComentario("");
        setRecetaId("");
      }

      setSaved(true);
      onSaved();
      if (editando) onCancelEdit();
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.response?.data?.message ?? "Error al guardar la review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card-header">
        <div>
          <div className="card-title">
            {editando ? "Editar review" : "Nueva review"}
          </div>
          <div className="card-subtitle">
            {editando
              ? "Actualizá tu opinión sobre esta receta"
              : "Compartí tu experiencia con una receta"}
          </div>
        </div>
        {editando && <span className="badge badge-amber">Editando</span>}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="rev-receta">Receta</label>
          <select
            id="rev-receta"
            value={recetaId}
            onChange={(e) => setRecetaId(e.target.value)}
            required
          >
            <option value="">Seleccioná una receta…</option>
            {recetas.map((r) => (
              <option key={r._id} value={r._id}>
                {r.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Calificación</label>
          <StarPicker value={calificacion} onChange={setCalificacion} />
          {calificacion > 0 && (
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                marginTop: "4px",
                display: "block",
              }}
            >
              {calificacion} de 5 estrellas
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="rev-comentario">Comentario</label>
          <textarea
            id="rev-comentario"
            rows={4}
            placeholder="Contá cómo te resultó la receta, qué cambiarías…"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
            minLength={5}
            maxLength={1000}
          />
          <span className="field-hint">
            {comentario.length}/1000 caracteres
          </span>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {saved && (
          <div className="alert alert-success">
            Review {editando ? "actualizada" : "publicada"} correctamente.
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
            {editando ? "Actualizar review" : "Publicar review"}
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

export default FormularioReview;
