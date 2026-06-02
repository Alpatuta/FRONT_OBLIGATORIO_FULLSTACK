import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeaderIngredientes from "./HeaderIngredientes";
import FormularioIngrediente from "./FormularioIngrediente";
import TarjetaIngrediente from "./TarjetaIngrediente";
import api from "../../../../api/api";

//SAQUE LA PARTE DE DEMO PARA USAR LO REAL!! 
const SeccionIngredientes = () => {
  const token = useSelector((state) => state.auth.token);
  const [ingredientes, setIngredientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerIngredientes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/ingredientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIngredientes(response.data.ingredientes ?? response.data);
    } catch (err) {
      //Esto es lo que te decia que el backend tira 404 cuando no hay ingredientes a diferencia de categorias por eso le pregunte a cloude y me dijo de distinguirlo
      if (err.response?.status === 404) {
        setIngredientes([]); // Si no hay ingredientes, mostramos una lista vacía en lugar de un error, no es un error error en si
      } else {
        setError(err.response?.data?.message ?? "Error al cargar los ingredientes");
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    obtenerIngredientes();
  }, [obtenerIngredientes]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/ingredientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Ingrediente eliminado correctamente");
      setIngredientes((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      toast.error("Error al eliminar el ingrediente");
      console.error(err);
    }
  };

  return (
    <div className="crud-grid">
      <aside className="crud-form-card">
        <div className="card">
          <FormularioIngrediente
            editando={editando}
            onCancelEdit={() => setEditando(null)}
            onSaved={obtenerIngredientes}
          />
        </div>
      </aside>

      <div>
        <HeaderIngredientes count={ingredientes.length} />
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
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : ingredientes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌿</div>
            <h3>Sin ingredientes</h3>
            <p>Agregá ingredientes para gestionar tu stock y usarlos en recetas.</p>
          </div>
        ) : (
          <div className="entity-list">
            {ingredientes.map((ing) => (
              <TarjetaIngrediente
                key={ing._id}
                ingrediente={ing}
                onEdit={() => setEditando(ing)}
                onDelete={() => handleDelete(ing._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionIngredientes;
