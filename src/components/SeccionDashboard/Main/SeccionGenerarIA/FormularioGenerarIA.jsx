import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../../../api/api";
import BadgeGemini from "../../../ui/BadgeGemini";

const FormularioGenerarIA = () => {
  const token = useSelector((s) => s.auth.token);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [ingredientes, setIngredientes] = useState("");
  const [dificultad, setDificultad] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    api
      .get("/categorias", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setCategorias(data.categorias ?? data))
      .catch(() => toast.error("No se pudieron cargar las categorías"))
      .finally(() => setLoadingCategorias(false));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredientesArray = ingredientes
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (ingredientesArray.length === 0) return toast.error("Ingresá al menos un ingrediente");
    if (!dificultad) return toast.error("Seleccioná una dificultad");
    if (!categoriaId) return toast.error("Seleccioná una categoría");

    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.post(
        "/recetas/ia",
        { ingredientes: ingredientesArray, dificultad, categoria: categoriaId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(data.receta);
      toast.success("Receta generada y guardada correctamente");
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error al generar la receta";
      toast.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="field span-2">
          <label htmlFor="ia-ingredientes">Ingredientes disponibles</label>
          <textarea
            id="ia-ingredientes"
            rows={4}
            placeholder="Ej: espinaca, ricota, huevos, ajo, cebolla…&#10;Un ingrediente por línea o separados por coma"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            required
          />
          <span className="field-hint">
            Listá los ingredientes que tenés disponibles
          </span>
        </div>

        <div className="field">
          <label htmlFor="ia-dificultad">Dificultad deseada</label>
          <select
            id="ia-dificultad"
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            required
          >
            <option value="" disabled>Seleccioná dificultad</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="ia-categoria">Categoría</label>
          <select
            id="ia-categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            disabled={loadingCategorias}
            required
          >
            <option value="" disabled>
              {loadingCategorias ? "Cargando…" : "Seleccioná una categoría"}
            </option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-primary btn-lg btn-full span-2"
          type="submit"
          disabled={loading || loadingCategorias}
          style={{ background: loading ? "var(--primary-dark)" : undefined }}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Generando receta…
            </>
          ) : (
            <>
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
              Generar receta con IA
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="ia-result animate-in">
          <div className="ia-result-title">✨ {result.titulo}</div>

          <div className="ia-result-section">
            <h4>Descripción</h4>
            <p>{result.descripcion}</p>
          </div>

          <div className="ia-result-section">
            <h4>Ingredientes</h4>
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

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
            <BadgeGemini size="md" />
          </div>

          <div className="alert alert-success" style={{ marginTop: "8px" }}>
            La receta fue guardada automáticamente en tu colección.
          </div>

          <div style={{ marginTop: "12px" }}>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => {
                setResult(null);
                setIngredientes("");
                setDificultad("");
                setCategoriaId("");
              }}
            >
              Generar otra receta
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioGenerarIA;
