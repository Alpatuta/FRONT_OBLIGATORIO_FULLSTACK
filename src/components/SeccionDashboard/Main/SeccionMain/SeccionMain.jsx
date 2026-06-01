import { useDashboard } from "../../../../context/DashboardContext";
import Metricas from "./Metricas";

const SeccionMain = () => {
  const { setCurrentSection } = useDashboard();

  return (
    <>
      <Metricas />

      <div className="overview-grid">
        <div>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Accesos rápidos</div>
                <div className="card-subtitle">
                  Atajos a las funciones principales
                </div>
              </div>
            </div>
            <div className="quick-actions">
              <button
                className="quick-action-btn"
                type="button"
                onClick={() => setCurrentSection("nueva-receta")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Nueva receta
              </button>
              <button
                className="quick-action-btn"
                type="button"
                onClick={() => setCurrentSection("generar-ia")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                Generar con IA
              </button>
              <button
                className="quick-action-btn"
                type="button"
                onClick={() => setCurrentSection("mis-recetas")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Ver recetas
              </button>
              <button
                className="quick-action-btn"
                type="button"
                onClick={() => setCurrentSection("categorias")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                Categorías
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Uso del plan</div>
              <div className="card-subtitle">Plan plus activo</div>
            </div>
            <span className="badge badge-amber">Plus</span>
          </div>
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div
              style={{
                fontSize: "36px",
                fontWeight: 900,
                color: "var(--text)",
                lineHeight: 1,
              }}
            >
              3/4
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                marginTop: "6px",
                marginBottom: "16px",
              }}
            >
              Recetas utilizadas
            </div>
            <div className="usage-bar-wrap">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "var(--text-subtle)",
                  marginBottom: "6px",
                }}
              >
                <span>0</span>
                <span>75%</span>
                <span>4</span>
              </div>
              <div className="usage-bar-track">
                <div className="usage-bar-fill" style={{ width: "75%" }} />
              </div>
            </div>
          </div>
          <button
            className="btn btn-amber btn-full"
            style={{ marginTop: "16px" }}
            type="button"
            onClick={() => setCurrentSection("mi-plan")}
          >
            Actualizar a Premium
          </button>
        </div>
      </div>
    </>
  );
};

export default SeccionMain;
