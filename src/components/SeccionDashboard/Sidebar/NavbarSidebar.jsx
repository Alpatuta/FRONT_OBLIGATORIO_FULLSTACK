import { useDashboard } from "../../../context/DashboardContext";
import BadgeGemini from "../../ui/BadgeGemini";

const IconHome = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconBook = () => (
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
);
const IconPlus = () => (
  <svg
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
);
const IconSparkle = () => (
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
);
const IconWand = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 4V2" />
    <path d="M15 16v-2" />
    <path d="M8 9h2" />
    <path d="M20 9h2" />
    <path d="M17.8 11.8L19 13" />
    <path d="M15 9h.01" />
    <path d="M17.8 6.2L19 5" />
    <path d="M3 21l9-9" />
    <path d="M12.2 6.2L11 5" />
  </svg>
);
const IconTag = () => (
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
);
const IconLeaf = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 22 16 8" />
    <path d="M3.6 12.6S2 18 10 20c0-8 6-12 6-12s-8 2-12.4-7.4" />
  </svg>
);
const IconChart = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);
const IconCrown = () => (
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
);
const IconStar = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const NAV_GROUPS = [
  {
    label: "Principal",
    items: [
      { id: "resumen", label: "Resumen", icon: <IconHome /> },
      { id: "mis-recetas", label: "Recetas", icon: <IconBook /> },
      { id: "nueva-receta", label: "Nueva Receta", icon: <IconPlus /> },
    ],
  },
  {
    label: "IA Chef",
    items: [
      { id: "generar-ia", label: "Generar con IA", icon: <IconSparkle /> },
      { id: "adaptar-receta", label: "Adaptar Receta", icon: <IconWand /> },
    ],
  },
  {
    label: "Gestión",
    items: [
      { id: "categorias", label: "Categorías", icon: <IconTag /> },
      { id: "ingredientes", label: "Ingredientes", icon: <IconLeaf /> },
      { id: "reviews", label: "Reviews", icon: <IconStar /> },
    ],
  },
  {
    label: "Cuenta",
    items: [
      { id: "estadisticas", label: "Estadísticas", icon: <IconChart /> },
      { id: "mi-plan", label: "Mi Plan", icon: <IconCrown /> },
    ],
  },
];

const NavbarSidebar = () => {
  const { currentSection, setCurrentSection, closeSidebar } = useDashboard();

  const handleNav = (id) => {
    setCurrentSection(id);
    closeSidebar();
  };

  return (
    <nav className="sidebar-nav" aria-label="Navegación principal">
      {NAV_GROUPS.map((group) => (
        <div key={group.label} className="nav-group">
          <div className="nav-group-label">{group.label}</div>
          {group.label === "IA Chef" && (
            <div style={{ padding: "2px 12px 6px" }}>
              <BadgeGemini label="Powered by Gemini" size="sm" />
            </div>
          )}
          {group.items.map((item) => (
            <button
              key={item.id}
              className={`nav-item${currentSection === item.id ? " active" : ""}`}
              onClick={() => handleNav(item.id)}
              type="button"
              aria-current={currentSection === item.id ? "page" : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default NavbarSidebar;
