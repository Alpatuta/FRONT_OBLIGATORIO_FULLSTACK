import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../../api/api";
import HeaderReviews from "./HeaderReviews";
import FormularioReview from "./FormularioReview";
import TarjetaReview from "./TarjetaReview";

const SeccionReviews = () => {
  const token = useSelector((s) => s.auth.token);
  const [reviews, setReviews] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/reviews/usuario/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(data.reviews ?? data);
    } catch (error) {
      if (error.response?.status === 404) {
        setReviews([]);
      } else {
        setError("No se pudieron cargar las reviews: ");
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchRecetas = useCallback(async () => {
    try {
      const { data } = await api.get("/recetas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecetas(data.recetas ?? data);
    } catch {
      // El selector de recetas quedará vacío; no interrumpe el flujo
    }
  }, [token]);

  useEffect(() => {
    fetchReviews();
    fetchRecetas();
  }, [fetchReviews, fetchRecetas]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Review eliminada correctamente");
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      setError(
        "No se pudo eliminar la review: " +
          (error.response?.data?.message ?? "Error desconocido"),
      );
      toast.error(
        "Error al eliminar la review: " +
          (error.response?.data?.message ?? "Error desconocido"),
      );
    }
  };

  return (
    <div className="crud-grid">
      <aside className="crud-form-card">
        <div className="card">
          <FormularioReview
            editando={editando}
            onCancelEdit={() => setEditando(null)}
            onSaved={fetchReviews}
            recetas={recetas}
          />
        </div>
      </aside>

      <div>
        <HeaderReviews count={reviews.length} />

        {error && (
          <div className="alert alert-error" style={{ marginBottom: "16px" }}>
            {error}
          </div>
        )}

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "var(--text-muted)",
            }}
          >
            <span className="spinner spinner-dark" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⭐</div>
            <h3>Sin reviews</h3>
            <p>
              Publicá tu primera review para compartir tu experiencia con una
              receta.
            </p>
          </div>
        ) : (
          <div className="entity-list">
            {reviews.map((review) => (
              <TarjetaReview
                key={review._id}
                review={review}
                onEdit={() => setEditando(review)}
                onDelete={() => handleDelete(review._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionReviews;
