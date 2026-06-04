import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDashboard } from "../../../../context/DashboardContext";
import Metricas from "./Metricas";
import api from "../../../../api/api";

const SeccionMain = () => {
  const { setCurrentSection } = useDashboard();
  const { user, token } = useSelector((s) => s.auth);
  const esPremium = user?.plan === "premium";
  const totalRecetas = esPremium ? null : 4;

  const [cantidadRecetas, setCantidadRecetas] = useState(0);
  const [cantidadCategorias, setCantidadCategorias] = useState(0);
  const [cantidadReviews, setCantidadReviews] = useState(0);

  const pct = totalRecetas
    ? Math.round((cantidadRecetas / totalRecetas) * 100)
    : 0;

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      api.get("/recetas", { headers, params: { autor: user?.correo } }),
      api.get("/categorias", { headers }),
      api.get("/reviews/usuario/me", { headers }),
    ])
      .then(([recetasRes, categoriasRes, reviewsRes]) => {
        setCantidadRecetas(recetasRes.data.recetas?.length ?? 0);
        setCantidadCategorias(categoriasRes.data.categorias?.length ?? 0);
        setCantidadReviews(reviewsRes.data.reviews?.length ?? 0);
      })
      .catch(console.error);
  }, [token, user]);

  return (
    <>
      <Metricas
        cantidadRecetas={cantidadRecetas}
        cantidadCategorias={cantidadCategorias}
        cantidadReviews={cantidadReviews}
      />

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

        {/* Tarjeta uso del plan */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Uso del plan</div>
              <div className="card-subtitle">
                Plan {esPremium ? "Premium" : "Plus"} activo
              </div>
            </div>
            <span
              className={`badge ${esPremium ? "badge-green" : "badge-amber"}`}
            >
              {esPremium ? "Premium" : "Plus"}
            </span>
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
              {esPremium
                ? `${cantidadRecetas} / ∞`
                : `${cantidadRecetas}/${totalRecetas}`}
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
            {!esPremium && (
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
                  <span>{pct}%</span>
                  <span>{totalRecetas}</span>
                </div>
                <div className="usage-bar-track">
                  <div
                    className="usage-bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}
            {esPremium && (
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--primary)",
                  fontWeight: 600,
                }}
              >
                Sin límite de recetas
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeccionMain;
