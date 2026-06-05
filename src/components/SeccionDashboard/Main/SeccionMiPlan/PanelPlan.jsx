import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../../api/api";
import { setCredentials } from "../../../../features/auth/auth.slice";

const CheckIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 6l3 3 5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FEATURES_PLUS = [
  "Hasta 4 recetas guardadas",
  "Generación básica con IA",
  "Adaptación de recetas con IA",
  "Gestión de categorías",
  "Gestión de ingredientes",
  "Subida de imágenes",
];

const FEATURES_PREMIUM = [
  "Recetas ilimitadas",
  "Generación avanzada con IA",
  "Adaptación de recetas con IA",
  "Gestión completa de categorías",
  "Gestión completa de ingredientes",
  "Subida ilimitada de imágenes",
  "Estadísticas avanzadas",
  "Acceso prioritario a nuevas funciones",
];

const CIRCUMFERENCE = 2 * Math.PI * 54;

const PanelPlan = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((s) => s.auth);
  const esAdmin = user?.rol === "admin";
  const esPremium = user?.plan === "premium";

  const [upgrading, setUpgrading] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  const [cantidadRecetas, setCantidadRecetas] = useState(0);

  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  const [soloPlusFiltro, setSoloPlusFiltro] = useState(false);
  const [cambiando, setCambiando] = useState(null);

  const total = esPremium ? null : 4;
  const used = cantidadRecetas;
  const pct = total ? Math.round((used / total) * 100) : 0;
  const offset = CIRCUMFERENCE * (1 - pct / 100);

  useEffect(() => {
    api
      .get("/recetas", {
        headers: { Authorization: `Bearer ${token}` },
        params: { autor: user?.correo },
      })
      .then((res) => setCantidadRecetas(res.data.recetas?.length ?? 0))
      .catch(() => {});
  }, [token, user]);

  useEffect(() => {
    if (!esAdmin) return;
    setLoadingUsuarios(true);
    api
      .get("/usuarios", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUsuarios(res.data))
      .catch(() => toast.error("Error al cargar los usuarios"))
      .finally(() => setLoadingUsuarios(false));
  }, [esAdmin, token]);

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      await api.patch(
        "/usuarios/cambiar-plan",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUpgraded(true);
      dispatch(setCredentials({ token, user: { ...user, plan: "premium" } }));
      toast.success("¡Plan actualizado a Premium exitosamente!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Error al cambiar el plan",
      );
    } finally {
      setUpgrading(false);
    }
  };

  const handleCambiarPlanUsuario = async (correo, id) => {
    setCambiando(id);
    try {
      await api.patch(
        "/usuarios/cambiar-plan-admin",
        { correo },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUsuarios((prev) =>
        prev.map((u) => (u._id === id ? { ...u, plan: "premium" } : u)),
      );
      toast.success("Plan del usuario actualizado a Premium");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Error al cambiar el plan",
      );
    } finally {
      setCambiando(null);
    }
  };

  const usuariosFiltrados = soloPlusFiltro
    ? usuarios.filter((u) => u.plan === "plus")
    : usuarios;

  return (
    <>
      <div className="plan-grid">
        {/* Plan Plus (actual) */}
        <div className="plan-card plan-card-current">
          <div className="plan-badge pb-plus">⭐ Plan Plus</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <div>
              <div className="plan-price">Gratis</div>
              <div className="plan-period">Plan base por defecto</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                className="usage-ring"
                style={{ width: "90px", height: "90px" }}
              >
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                }}
              >
              </div>
            </div>
          </div>

          <ul className="plan-features">
            {FEATURES_PLUS.map((f) => (
              <li key={f} className="plan-feature">
                <div className="plan-check">
                  <CheckIcon />
                </div>
                {f}
              </li>
            ))}
          </ul>

          <button className="btn btn-outline btn-full" type="button" disabled>
            Plan actual
          </button>
        </div>

        {/* Plan Premium */}
        <div className="plan-card plan-card-premium">
          <div className="plan-badge pb-premium">✨ Plan Premium</div>
          <div className="plan-price">$9.99</div>
          <div className="plan-period">por mes · facturación mensual</div>

          <ul className="plan-features">
            {FEATURES_PREMIUM.map((f) => (
              <li key={f} className="plan-feature">
                <div className="plan-check">
                  <CheckIcon />
                </div>
                {f}
              </li>
            ))}
          </ul>

          {!esAdmin && (
            <div
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                textAlign: "center",
                marginBottom: "8px",
              }}
            >
              Solo un administrador puede cambiar el plan
            </div>
          )}

          {upgraded || esPremium ? (
            <div className="alert alert-success">
              ¡Plan actualizado a Premium exitosamente!
            </div>
          ) : (
            <button
              className="btn btn-primary btn-lg btn-full"
              type="button"
              onClick={esAdmin ? handleUpgrade : undefined}
              disabled={!esAdmin || upgrading}
            >
              {upgrading ? (
                <>
                  <span className="spinner" /> Procesando…
                </>
              ) : (
                "Actualizar a Premium →"
              )}
            </button>
          )}
        </div>
      </div>

      {/* Información del plan */}
      <div className="card" style={{ marginTop: "0" }}>
        <div className="card-header">
          <div>
            <div className="card-title">Información del plan</div>
            <div className="card-subtitle">
              Detalles de tu suscripción actual
            </div>
          </div>
        </div>
        <div className="plan-info-grid">
          {[
            {
              label: "Plan actual",
              value: user?.plan
                ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1)
                : "Plus",
              badge: esPremium ? "badge-green" : "badge-amber",
            },
            {
              label: "Recetas usadas",
              value: esPremium ? `${used} / ∞` : `${used} / ${total}`,
              badge: null,
            },
            { label: "Estado", value: "Activo", badge: "badge-green" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: "16px",
                background: "var(--surface-2)",
                borderRadius: "var(--r-md)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  marginBottom: "8px",
                }}
              >
                {item.label}
              </div>
              {item.badge ? (
                <span className={`badge ${item.badge}`}>{item.value}</span>
              ) : (
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "var(--text)",
                  }}
                >
                  {item.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gestión de usuarios — solo admin */}
      {esAdmin && (
        <div className="card" style={{ marginTop: "0" }}>
          <div className="section-header">
            <div>
              <div className="card-title">Gestión de usuarios</div>
              <div className="card-subtitle">
                {loadingUsuarios
                  ? "Cargando…"
                  : `${usuariosFiltrados.length} usuario${usuariosFiltrados.length !== 1 ? "s" : ""}`}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "8px",
                }}
              >
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  Todos
                </span>
                <div
                  onClick={() => setSoloPlusFiltro(!soloPlusFiltro)}
                  style={{
                    width: "44px",
                    height: "24px",
                    borderRadius: "999px",
                    background: soloPlusFiltro
                      ? "var(--primary, #16a34a)"
                      : "#cbd5e1",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: soloPlusFiltro ? "23px" : "3px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "white",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      transition: "left 0.2s ease",
                    }}
                  />
                </div>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  Solo Plus
                </span>
              </div>
            </div>
          </div>

          {loadingUsuarios ? (
            <div style={{ padding: "16px", color: "var(--text-muted)" }}>
              Cargando usuarios…
            </div>
          ) : usuariosFiltrados.length === 0 ? (
            <div style={{ padding: "16px", color: "var(--text-muted)" }}>
              No hay usuarios para mostrar
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              {usuariosFiltrados.map((u) => (
                <div
                  key={u._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    padding: "12px 16px",
                    background: "var(--surface-2)",
                    borderRadius: "var(--r-md)",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>
                      {u.nombre}
                    </div>
                    <div
                      style={{ fontSize: "12px", color: "var(--text-muted)" }}
                    >
                      {u.correo}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      className={`badge ${u.plan === "premium" ? "badge-green" : "badge-amber"}`}
                    >
                      {u.plan}
                    </span>
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: "12px", padding: "6px 12px" }}
                      type="button"
                      disabled={u.plan === "premium" || cambiando === u._id}
                      onClick={() => handleCambiarPlanUsuario(u.correo, u._id)}
                    >
                      {cambiando === u._id ? (
                        <>
                          <span className="spinner" /> Procesando…
                        </>
                      ) : (
                        "→ Premium"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PanelPlan;
