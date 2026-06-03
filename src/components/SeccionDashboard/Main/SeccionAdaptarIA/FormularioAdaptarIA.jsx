import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../../api/api";

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

const FormularioAdaptarIA = () => {
  const token = useSelector((s) => s.auth.token);
  const user = useSelector((s) => s.auth.user);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recetas, setRecetas] = useState([]);
  const [loadingRecetas, setLoadingRecetas] = useState(true);
  const [recetaId, setRecetaId] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    api
      .get("/recetas", {
        headers: { Authorization: `Bearer ${token}` },
        params: { autor: user?.correo },
      })
      .then(({ data }) => setRecetas(data.recetas ?? data))
      .catch(() => toast.error("No se pudieron cargar las recetas"))
      .finally(() => setLoadingRecetas(false));
  }, [token, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recetaId) return toast.error("Seleccioná una receta");
    if (!tipo) return toast.error("Seleccioná el tipo de adaptación");

    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post(
        `/recetas/${recetaId}/adaptar`,
        { tipo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(data.receta);
      toast.success("Receta adaptada y guardada correctamente");
    } catch (err) {
      toast.error(err.response?.data?.message ?? "Error al adaptar la receta");
    } finally {
      setLoading(false);
    }
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
          <select
            id="adaptar-receta"
            value={recetaId}
            onChange={(e) => setRecetaId(e.target.value)}
            disabled={loadingRecetas}
            required
          >
            <option value="" disabled>
              {loadingRecetas ? "Cargando…" : "Elegí una receta…"}
            </option>
            {recetas.map((r) => (
              <option key={r._id} value={r._id}>
                {r.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="adaptar-tipo">Tipo de adaptación</label>
          <select
            id="adaptar-tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="" disabled>Seleccioná el tipo…</option>
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
          disabled={loading || loadingRecetas}
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
            <h4>Descripción</h4>
            <p>{result.descripcion}</p>
          </div>

          <div className="ia-result-section">
            <h4>Ingredientes adaptados</h4>
            <ul style={{ display: "grid", gap: "5px", paddingLeft: "16px", listStyle: "disc" }}>
              {result.ingredientes.map((ing, i) => (
                <li key={i} style={{ fontSize: "14px", color: "var(--text-2)" }}>
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="ia-result-section">
            <h4>Preparación</h4>
            <div className="ia-steps">
              {result.pasos.map((paso, i) => (
                <div key={i} className="ia-step">
                  <div className="ia-step-num">{i + 1}</div>
                  <p>{paso}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="alert alert-success" style={{ marginTop: "16px" }}>
            La receta adaptada fue guardada automáticamente en tu colección.
          </div>

          <div style={{ marginTop: "12px" }}>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => {
                setResult(null);
                setRecetaId("");
                setTipo("");
              }}
            >
              Adaptar otra receta
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioAdaptarIA;
