import { useState } from "react";

const TIPOS_ADAPTACION = [
  { value: "vegan", label: "Vegana" },
  { value: "vegetarian", label: "Vegetariana" },
  { value: "gluten-free", label: "Sin gluten" },
  { value: "keto", label: "Keto" },
  { value: "low-carb", label: "Bajo en carbohidratos" },
  { value: "paleo", label: "Paleo" },
  { value: "dairy-free", label: "Sin lácteos" },
  { value: "nut-free", label: "Sin frutos secos" },
  { value: "low-fat", label: "Bajo en grasa" },
  { value: "high-protein", label: "Alto en proteína" },
  { value: "low-sodium", label: "Bajo en sodio" },
  { value: "sugar-free", label: "Sin azúcar" },
  { value: "whole30", label: "Whole30" },
  { value: "mediterranean", label: "Mediterránea" },
  { value: "raw", label: "Cruda / Raw" },
  { value: "low-calorie", label: "Baja en calorías" },
  { value: "high-fiber", label: "Alto en fibra" },
  { value: "diabetic-friendly", label: "Apta para diabéticos" },
  { value: "kid-friendly", label: "Para niños" },
  { value: "quick-and-easy", label: "Rápida y fácil" },
  { value: "comfort-food", label: "Comfort food" },
  { value: "gourmet", label: "Gourmet" },
  { value: "fusion", label: "Fusión" },
  { value: "seasonal", label: "De temporada" },
  { value: "holiday", label: "Festiva" },
  { value: "budget-friendly", label: "Económica" },
  { value: "slow-cooker", label: "Olla lenta" },
  { value: "one-pot", label: "Una sola olla" },
  { value: "grilling", label: "A la parrilla" },
  { value: "air-fryer", label: "Air fryer" },
  { value: "instant-pot", label: "Instant pot" },
  { value: "sheet-pan", label: "Bandeja de horno" },
  { value: "stir-fry", label: "Salteado (wok)" },
  { value: "soup-and-stew", label: "Sopas y guisos" },
];

const RECETA_ADAPTADA_DEMO = {
  titulo: "Tarta rústica de verduras — Versión Vegana",
  descripcion:
    "La misma receta clásica, ahora completamente libre de productos de origen animal. La ricota fue reemplazada por tofu sedoso condimentado y los huevos por una mezcla de lino.",
  cambios: [
    "Ricota → Tofu sedoso con levadura nutricional y limón",
    "Huevos → 2 cucharadas de lino molido + 6 cucharadas de agua",
    "Masa con manteca → Masa con aceite de coco",
  ],
};

const FormularioAdaptarIA = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult(RECETA_ADAPTADA_DEMO);
    }, 2000);
  };

  return (
    <>
      <form
        className="form"
        style={{ marginTop: "4px" }}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="adaptar-receta">Seleccioná la receta a adaptar</label>
          <select id="adaptar-receta" defaultValue="">
            <option value="" disabled>
              Elegí una receta…
            </option>
            <option>Tarta rústica de verduras</option>
            <option>Pasta al pesto casero</option>
            <option>Brownies de chocolate negro</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="adaptar-tipo">Tipo de adaptación</label>
          <select id="adaptar-tipo" defaultValue="">
            <option value="" disabled>
              Seleccioná el tipo…
            </option>
            {TIPOS_ADAPTACION.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <span className="field-hint">
            {TIPOS_ADAPTACION.length} tipos disponibles
          </span>
        </div>

        <button
          className="btn btn-primary btn-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Adaptando receta…
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
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
              Adaptar receta
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="ia-result animate-in" style={{ marginTop: "20px" }}>
          <div className="ia-result-title">🔄 {result.titulo}</div>

          <div className="ia-result-section">
            <h4>Descripción de los cambios</h4>
            <p>{result.descripcion}</p>
          </div>

          <div className="ia-result-section">
            <h4>Cambios realizados</h4>
            <ul style={{ display: "grid", gap: "6px" }}>
              {result.cambios.map((cambio, i) => (
                <li key={i} className="ia-step">
                  <div className="ia-step-num">✓</div>
                  <p>{cambio}</p>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
            <button className="btn btn-primary" type="button">
              Guardar adaptación
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => setResult(null)}
            >
              Descartar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioAdaptarIA;
