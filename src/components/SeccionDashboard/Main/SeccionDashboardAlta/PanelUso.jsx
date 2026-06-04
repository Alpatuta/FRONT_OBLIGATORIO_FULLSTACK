const CIRCUMFERENCE = 2 * Math.PI * 54;

const PanelUso = ({ cantidadRecetas, plan }) => {
  const esPremium = plan === "premium";
  const used = cantidadRecetas;
  const total = esPremium ? null : 4;
  const pct = total ? Math.round((used / total) * 100) : 0;
  const offset = esPremium ? CIRCUMFERENCE : CIRCUMFERENCE * (1 - pct / 100);

  return (
    <aside className="card usage-panel">
      <p className="eyebrow">Informe de uso</p>
      <div className="card-title" style={{ marginBottom: "4px" }}>
        {esPremium ? "Plan Premium" : "Plan Plus"}
      </div>
      <div className="card-subtitle" style={{ marginBottom: "16px" }}>
        {esPremium ? "Recetas ilimitadas" : `Límite de ${total} recetas`}
      </div>

      <div className="usage-ring-wrap">
        <div
          className="usage-ring"
          aria-label={
            esPremium ? "Sin límite de recetas" : `${pct}% de uso del plan`
          }
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
            <div className="usage-ring-pct">{esPremium ? "∞" : `${pct}%`}</div>
            <div className="usage-ring-sub">usado</div>
          </div>
        </div>
        <p className="usage-detail">
          <strong>{used}</strong> de <strong>{esPremium ? "∞" : total}</strong>{" "}
          recetas utilizadas
        </p>
      </div>

      <div className="divider" />

      <div style={{ display: "grid", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>Plan actual</span>
          <span
            className={`badge ${esPremium ? "badge-green" : "badge-amber"}`}
          >
            {esPremium ? "Premium" : "Plus"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>Recetas restantes</span>
          <strong style={{ color: "var(--text)" }}>
            {esPremium ? "∞" : total - used}
          </strong>
        </div>
      </div>
    </aside>
  );
};

export default PanelUso;
