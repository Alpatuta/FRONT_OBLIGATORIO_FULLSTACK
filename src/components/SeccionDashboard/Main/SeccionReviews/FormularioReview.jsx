import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import api from "../../../../api/api";
import {
  crearReviewSchema,
  actualizarReviewSchema,
} from "../../../../validators/reviews.validators";

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
  const [errors, setErrors] = useState({
    receta: "",
    calificacion: "",
    comentario: "",
  });
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
    setErrors({ receta: "", calificacion: "", comentario: "" });
  }, [editando]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = editando
      ? { comentario: comentario.trim(), calificacion }
      : { comentario: comentario.trim(), calificacion, receta: recetaId };

    const schema = editando ? actualizarReviewSchema : crearReviewSchema;
    const { error: validationError } = schema.validate(data, {
      abortEarly: false,
    });

    if (validationError) {
      const newErrors = { receta: "", calificacion: "", comentario: "" };
      validationError.details.forEach((detail) => {
        const field = detail.path[0];
        if (field in newErrors) newErrors[field] = detail.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({ receta: "", calificacion: "", comentario: "" });
    setLoading(true);

    try {
      const payload = editando
        ? { comentario: comentario.trim(), calificacion }
        : { comentario: comentario.trim(), calificacion, receta: recetaId };
      const headers = { Authorization: `Bearer ${token}` };

      if (editando) {
        await api.patch(`/reviews/${editando._id}`, payload, { headers });
      } else {
        await api.post("/reviews", payload, { headers });
        setCalificacion(0);
        setComentario("");
        setRecetaId("");
      }
      toast.success(
        `Review ${editando ? "actualizada" : "publicada"} correctamente.`,
      );
      setSaved(true);
      onSaved();
      if (editando) onCancelEdit();
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error desconocido";
      toast.error(
        "Error al guardar la review: " + (mensaje ?? "Error desconocido"),
      );
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
            onChange={(e) => {
              setRecetaId(e.target.value);
              setErrors((prev) => ({ ...prev, receta: "" }));
            }}
          >
            <option value="">Seleccioná una receta…</option>
            {recetas.map((r) => (
              <option key={r._id} value={r._id}>
                {r.titulo}
              </option>
            ))}
          </select>
          {errors.receta && <span className="error">{errors.receta}</span>}
        </div>

        <div className="field">
          <label>Calificación</label>
          <StarPicker
            value={calificacion}
            onChange={(val) => {
              setCalificacion(val);
              setErrors((prev) => ({ ...prev, calificacion: "" }));
            }}
          />
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
          {errors.calificacion && (
            <span className="error">{errors.calificacion}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="rev-comentario">Comentario</label>
          <textarea
            id="rev-comentario"
            rows={4}
            placeholder="Contá cómo te resultó la receta, qué cambiarías…"
            value={comentario}
            onChange={(e) => {
              setComentario(e.target.value);
              setErrors((prev) => ({ ...prev, comentario: "" }));
            }}
            maxLength={1000}
          />
          <span className="field-hint">
            {comentario.length}/1000 caracteres
          </span>
          {errors.comentario && (
            <span className="error">{errors.comentario}</span>
          )}
        </div>

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
