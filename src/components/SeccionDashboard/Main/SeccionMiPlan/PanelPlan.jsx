import { useState } from "react";

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
  const [upgrading, setUpgrading] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  const used = 3;
  const total = 4;
  const pct = Math.round((used / total) * 100);
  const offset = CIRCUMFERENCE * (1 - pct / 100);

  const handleUpgrade = () => {
    setUpgrading(true);
    setTimeout(() => {
      setUpgrading(false);
      setUpgraded(true);
    }, 1500);
  };

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
                <svg viewBox="0 0 120 120">
                  <circle className="usage-ring-bg" cx="60" cy="60" r="54" />
                  <circle
                    className="usage-ring-fill"
                    cx="60"
                    cy="60"
                    r="54"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                  />
                </svg>
                <div className="usage-ring-text">
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "var(--text)",
                    }}
                  >
                    {pct}%
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                }}
              >
                {used}/{total} recetas
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

          {upgraded ? (
            <div className="alert alert-success">
              ¡Plan actualizado a Premium exitosamente!
            </div>
          ) : (
            <button
              className="btn btn-primary btn-lg btn-full"
              type="button"
              onClick={handleUpgrade}
              disabled={upgrading}
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

      {/* Información adicional */}
      <div className="card" style={{ marginTop: "0" }}>
        <div className="card-header">
          <div>
            <div className="card-title">Información del plan</div>
            <div className="card-subtitle">
              Detalles de tu suscripción actual
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {[
            { label: "Plan actual", value: "Plus", badge: "badge-amber" },
            {
              label: "Recetas usadas",
              value: `${used} / ${total}`,
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
    </>
  );
};

export default PanelPlan;
