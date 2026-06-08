import { useDashboard } from "../../../context/DashboardContext";
import SeccionMain from "./SeccionMain/SeccionMain";
import SeccionDashboardAlta from "./SeccionDashboardAlta/SeccionDashboardAlta";
import SeccionDashboardListado from "./SeccionDashboardListado/SeccionDashboardListado";
import SeccionDashboardGrafico from "./SeccionDashboardGrafico/SeccionDashboardGrafico";
import SeccionGenerarIA from "./SeccionGenerarIA/SeccionGenerarIA";
import SeccionAdaptarIA from "./SeccionAdaptarIA/SeccionAdaptarIA";
import SeccionCategorias from "./SeccionCategorias/SeccionCategorias";
import SeccionMiPlan from "./SeccionMiPlan/SeccionMiPlan";
import SeccionReviews from "./SeccionReviews/SeccionReviews";
import HeaderMain from "./SeccionMain/HeaderMain";

const SECTION_META = {
  resumen: { eyebrow: "Dashboard", title: "Gestión de Recetas" },
  "mis-recetas": { eyebrow: "Documentos", title: "Mis Recetas" },
  "nueva-receta": { eyebrow: "Alta", title: "Agregar Nueva Receta" },
  "generar-ia": {
    eyebrow: "Inteligencia Artificial",
    title: "Generar Receta con IA",
  },
  "adaptar-receta": {
    eyebrow: "Inteligencia Artificial",
    title: "Adaptar Receta con IA",
  },
  categorias: { eyebrow: "Gestión", title: "Categorías" },
  ingredientes: { eyebrow: "Gestión", title: "Ingredientes" },
  estadisticas: { eyebrow: "Análisis", title: "Estadísticas" },
  "mi-plan": { eyebrow: "Cuenta", title: "Mi Plan" },
  reviews: { eyebrow: "Comunidad", title: "Reviews" },
};

const SECTIONS = {
  resumen: <SeccionMain />,
  "mis-recetas": <SeccionDashboardListado />,
  "nueva-receta": <SeccionDashboardAlta />,
  "generar-ia": <SeccionGenerarIA />,
  "adaptar-receta": <SeccionAdaptarIA />,
  categorias: <SeccionCategorias />,
  estadisticas: <SeccionDashboardGrafico />,
  "mi-plan": <SeccionMiPlan />,
  reviews: <SeccionReviews />,
};

const MainDashboard = () => {
  const { currentSection } = useDashboard();
  const meta = SECTION_META[currentSection] ?? SECTION_META["resumen"];

  return (
    <main className="main-content">
      <HeaderMain eyebrow={meta.eyebrow} title={meta.title} />
      <div className="section-animate" key={currentSection}>
        {SECTIONS[currentSection] ?? <SeccionMain />}
      </div>
    </main>
  );
};

export default MainDashboard;
