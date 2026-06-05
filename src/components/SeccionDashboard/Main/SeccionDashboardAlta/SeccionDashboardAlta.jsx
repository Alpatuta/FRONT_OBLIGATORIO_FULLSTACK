import Panel from "./Panel";
import PanelUso from "./PanelUso";
import api from "../../../../api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SeccionDashboardAlta = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [categorias, setCategorias] = useState([]);
  const [cantidadRecetas, setCantidadRecetas] = useState(0);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  const fetchCantidadRecetas = () => {
    const headers = { Authorization: `Bearer ${token}` };
    api
      .get("/recetas", { headers, params: { autor: user.correo } })
      .then((res) => setCantidadRecetas(res.data.recetas.length))
      .catch(console.error);
  };

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    const obtenerCategorias = api.get("/categorias", { headers });
    const obtenerCantidadRecetas = api.get("/recetas", {
      headers,
      params: { autor: user.correo },
    });
    // Usamos Promise.all para esperar a que ambas peticiones terminen antes de actualizar el estado
    Promise.allSettled([obtenerCategorias, obtenerCantidadRecetas])
      .then(([categoriasResponse, cantidadResponse]) => {
        setCategorias(categoriasResponse.value.data.categorias);
        setCantidadRecetas(cantidadResponse.value.data.recetas.length);
      })
      .catch((error) => {
        const mensaje =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Error desconocido";
        toast.error(`Error al cargar los datos: ${mensaje}`);
      })
      .finally(() => setLoadingCategorias(false));
  }, [token, user]);

  return (
    <div className="dashboard-grid">
      <Panel
        categorias={categorias}
        loadingCategorias={loadingCategorias}
        onRecetaCreada={fetchCantidadRecetas}
        cantidadRecetas={cantidadRecetas}
        plan={user?.plan}
      />
      <PanelUso cantidadRecetas={cantidadRecetas} plan={user?.plan} />
    </div>
  );
};

export default SeccionDashboardAlta;
