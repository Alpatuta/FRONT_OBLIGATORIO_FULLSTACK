import { useSelector } from "react-redux";
import TarjetaMetrica from "./TarjetaMetrica";

const SkeletonMetrica = () => (
  <article className="metric-card">
    <div className="skeleton-block" style={{ width: 40, height: 40, borderRadius: "var(--r)", marginBottom: 14 }} />
    <div className="skeleton-block" style={{ width: "55%", height: 13, borderRadius: 6, marginBottom: 10 }} />
    <div className="skeleton-block" style={{ width: "70%", height: 30, borderRadius: 6, marginBottom: 10 }} />
    <div className="skeleton-block" style={{ width: "85%", height: 12, borderRadius: 6 }} />
  </article>
);

const Metricas = ({ cantidadRecetas, cantidadCategorias, cantidadReviews, loading }) => {
  const { user } = useSelector((s) => s.auth);
  const esPremium = user?.plan === "premium";
  const totalRecetas = esPremium ? null : 4;
  const pct = totalRecetas
    ? Math.round((cantidadRecetas / totalRecetas) * 100)
    : 0;
  const planLabel = esPremium ? "Premium" : "Plus";

  const METRICAS = [
    {
      label: "Recetas guardadas",
      value: esPremium
        ? `${cantidadRecetas} / ∞`
        : `${cantidadRecetas} / ${totalRecetas}`,
      sub: esPremium ? "Sin límite de recetas" : `${pct}% de uso del plan`,
      colorClass: "mi-green",
      icon: (
        <svg
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
      ),
    },
    {
      label: "Categorías creadas",
      value: `${cantidadCategorias}`,
      sub:
        cantidadCategorias === 0
          ? "Aún no creaste categorías"
          : `${cantidadCategorias} categoría${cantidadCategorias !== 1 ? "s" : ""} disponible${cantidadCategorias !== 1 ? "s" : ""}`,
      colorClass: "mi-amber",
      icon: (
        <svg
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
      ),
    },
    {
      label: "Reviews escritas",
      value: `${cantidadReviews}`,
      sub:
        cantidadReviews === 0
          ? "Aún no escribiste reviews"
          : `Review${cantidadReviews !== 1 ? "s" : ""} en recetas`,
      colorClass: "mi-purple",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      label: "Plan actual",
      value: planLabel,
      sub: esPremium
        ? "Disfrutás de todos los beneficios"
        : "Upgrade disponible a Premium",
      colorClass: "mi-blue",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7z" />
          <path d="M5 20h14" />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <section className="metrics-grid" aria-label="Cargando métricas">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonMetrica key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="metrics-grid" aria-label="Resumen de uso">
      {METRICAS.map((m) => (
        <TarjetaMetrica key={m.label} {...m} />
      ))}
    </section>
  );
};

export default Metricas;
