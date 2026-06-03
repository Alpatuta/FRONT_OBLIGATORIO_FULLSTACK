import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../../api/api";
import HeaderListado from "./HeaderListado";
import RecetasListado from "./RecetasListado";
import FormularioEditarReceta from "./FormularioEditarReceta";

const SeccionDashboardListado = () => {
  const token = useSelector((s) => s.auth.token);
  const user = useSelector((s) => s.auth.user);
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroDificultad, setFiltroDificultad] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [editando, setEditando] = useState(null);

  const obtenerRecetas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { autor: user?.correo };
      if (filtroDificultad) params.dificultad = filtroDificultad;
      const { data } = await api.get("/recetas", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setRecetas(data.recetas ?? data);
    } catch (err) {
      setError(err.response?.data?.message ?? "Error al cargar las recetas");
    } finally {
      setLoading(false);
    }
  }, [token, user, filtroDificultad]);

  useEffect(() => {
    obtenerRecetas();
  }, [obtenerRecetas]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recetas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Receta eliminada correctamente");
      setRecetas((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message ?? "Error al eliminar la receta");
    }
  };

  const recetasFiltradas = filtroCategoria
    ? recetas.filter((r) => r.categoria?.nombre === filtroCategoria)
    : recetas;

  const categoriasDisponibles = [
    ...new Set(recetas.map((r) => r.categoria?.nombre).filter(Boolean)),
  ];

  return (
    <section className="card">
      <HeaderListado
        count={recetasFiltradas.length}
        filtroDificultad={filtroDificultad}
        setFiltroDificultad={setFiltroDificultad}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        categoriasDisponibles={categoriasDisponibles}
        loading={loading}
      />
      <RecetasListado
        recetas={recetasFiltradas}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        onEdit={(receta) => setEditando(receta)}
      />
      {editando && (
        <FormularioEditarReceta
          receta={editando}
          onCancelEdit={() => setEditando(null)}
          onSaved={() => {
            setEditando(null);
            obtenerRecetas();
          }}
        />
      )}
    </section>
  );
};

export default SeccionDashboardListado;
