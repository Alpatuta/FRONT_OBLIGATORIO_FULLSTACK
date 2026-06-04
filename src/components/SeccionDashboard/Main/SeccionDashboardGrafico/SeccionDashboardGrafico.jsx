import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../../api/api";
import HeaderGrafico from "./HeaderGrafico";
import Grafico from "./Grafico";

const COLORS_DIFICULTAD = ["#16a34a", "#d97706", "#dc2626"];
const COLORS_CATEGORIAS = ["#16a34a", "#2563eb", "#7c3aed", "#d97706", "#dc2626", "#0891b2", "#be185d"];

const SeccionDashboardGrafico = () => {
  const { token, user } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(true);
  const [barData, setBarData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/recetas", {
        headers: { Authorization: `Bearer ${token}` },
        params: { autor: user?.correo },
      })
      .then(({ data }) => {
        const recetas = data.recetas ?? [];

        // Bar: recetas por categoría
        const porCategoria = recetas.reduce((acc, r) => {
          const cat = r.categoria?.nombre ?? "Sin categoría";
          acc[cat] = (acc[cat] ?? 0) + 1;
          return acc;
        }, {});
        const catLabels = Object.keys(porCategoria);
        const catValues = Object.values(porCategoria);

        setBarData({
          labels: catLabels,
          datasets: [
            {
              label: "Recetas",
              data: catValues,
              backgroundColor: catLabels.map((_, i) => COLORS_CATEGORIAS[i % COLORS_CATEGORIAS.length]),
              borderRadius: 6,
              borderSkipped: false,
            },
          ],
        });

        // Doughnut: recetas por dificultad
        const conteos = { Fácil: 0, Media: 0, Difícil: 0 };
        recetas.forEach((r) => {
          if (r.dificultad in conteos) conteos[r.dificultad]++;
        });

        setDoughnutData({
          labels: ["Fácil", "Media", "Difícil"],
          datasets: [
            {
              data: [conteos["Fácil"], conteos["Media"], conteos["Difícil"]],
              backgroundColor: COLORS_DIFICULTAD,
              borderWidth: 0,
              hoverOffset: 6,
            },
          ],
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, user]);

  return (
    <section className="card">
      <HeaderGrafico loading={loading} />
      {!loading && barData && doughnutData && (
        <Grafico barData={barData} doughnutData={doughnutData} />
      )}
      {loading && (
        <div style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)" }}>
          Cargando estadísticas…
        </div>
      )}
    </section>
  );
};

export default SeccionDashboardGrafico;