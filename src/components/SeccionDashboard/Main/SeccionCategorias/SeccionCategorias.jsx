import HeaderCategorias from "./HeaderCategorias";
import FormularioCategoria from "./FormularioCategoria";
import TarjetaCategoria from "./TarjetaCategoria";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../../api/api";

const SeccionCategorias = () => {
  const token = useSelector((state) => state.auth.token);
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -------- OBTENER CATEGORIAS --------
  const obtenerCategorias = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/categorias", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(response.data.categorias ?? response.data);
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error desconocido";
      setError(mensaje);
      console.error(mensaje);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Esto sirve para que cuando se cree o edite una categoría, se vuelva a cargar la lista actualizada
  useEffect(() => {
    obtenerCategorias();
  }, [obtenerCategorias]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categorias/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Categoría eliminada correctamente");
      // Actualizar la lista de categorías después de eliminar
      setCategorias((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      toast.error(
        "Error al eliminar la categoría: " +
          (err.response?.data?.message ?? "Error desconocido"),
      );
    }
  };

  return (
    <div className="crud-grid">
      <aside className="crud-form-card">
        <div className="card">
          <FormularioCategoria
            editando={editando}
            onCancelEdit={() => setEditando(null)}
            onSaved={obtenerCategorias}
          />
        </div>
      </aside>

      <div>
        <HeaderCategorias count={categorias.length} loading={loading} />

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "48px 0",
            }}
          >
            <span className="spinner spinner-dark spinner-lg" />
          </div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : categorias.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏷</div>
            <h3>Sin categorías</h3>
            <p>Crea tu primera categoría para organizar tus recetas.</p>
          </div>
        ) : (
          <div className="entity-list">
            {categorias.map((cat) => (
              <TarjetaCategoria
                key={cat._id}
                categoria={cat}
                onEdit={() => setEditando(cat)}
                onDelete={() => handleDelete(cat._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionCategorias;
