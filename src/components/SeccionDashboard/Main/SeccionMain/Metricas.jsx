import TarjetaMetrica from "./TarjetaMetrica";

const METRICAS = [
  {
    label: "Recetas guardadas",
    value: "3 / 4",
    sub: "75% de uso del plan",
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
    value: "3",
    sub: "Vegetariana, Pastas, Postres",
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
    label: "Generadas con IA",
    value: "1",
    sub: "Recetas generadas automáticamente",
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
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    label: "Plan actual",
    value: "Plus",
    sub: "Upgrade disponible a Premium",
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

const Metricas = () => {
  return (
    <section className="metrics-grid" aria-label="Resumen de uso">
      {METRICAS.map((m) => (
        <TarjetaMetrica key={m.label} {...m} />
      ))}
    </section>
  );
};

export default Metricas;
