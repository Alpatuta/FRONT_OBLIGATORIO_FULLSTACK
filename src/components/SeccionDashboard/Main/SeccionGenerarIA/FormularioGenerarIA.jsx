import { useState } from "react";

const RECETA_DEMO = {
  titulo: "Tarta de Espinaca y Ricota con Masa Integral",
  descripcion:
    "Una tarta nutritiva y sabrosa que combina la frescura de la espinaca con la cremosidad de la ricota, todo sobre una base integral crujiente.",
  ingredientes: [
    "300g de espinaca fresca",
    "250g de ricota",
    "2 huevos",
    "1 cebolla mediana",
    "2 dientes de ajo",
    "Masa integral lista",
    "Sal, pimienta y nuez moscada al gusto",
  ],
  pasos: [
    "Precalentar el horno a 180°C.",
    "Saltear la cebolla y el ajo picados hasta dorar.",
    "Agregar la espinaca y cocinar hasta que reduzca. Condimentar.",
    "Mezclar la espinaca con la ricota y los huevos. Integrar bien.",
    "Forrar un molde con la masa y verter el relleno.",
    "Hornear 35 minutos hasta que esté firme y dorada.",
  ],
};

const FormularioGenerarIA = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult(RECETA_DEMO);
    }, 2200);
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
            required
          />
          <span className="field-hint">
            Listá los ingredientes que tenés disponibles
          </span>
        </div>

        <div className="field">
          <label htmlFor="ia-dificultad">Dificultad deseada</label>
          <select id="ia-dificultad" defaultValue="">
            <option value="" disabled>
              Seleccioná dificultad
            </option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="ia-categoria">Categoría</label>
          <select id="ia-categoria" defaultValue="">
            <option value="" disabled>
              Seleccioná una categoría
            </option>
            <option>Vegetariana</option>
            <option>Pastas</option>
            <option>Postres</option>
            <option>Ensaladas</option>
            <option>Carnes</option>
          </select>
        </div>

        <button
          className="btn btn-primary btn-lg btn-full span-2"
          type="submit"
          disabled={loading}
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
            <ul
              style={{
                display: "grid",
                gap: "5px",
                paddingLeft: "16px",
                listStyle: "disc",
              }}
            >
              {result.ingredientes.map((ing, i) => (
                <li
                  key={i}
                  style={{ fontSize: "14px", color: "var(--text-2)" }}
                >
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

          <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
            <button className="btn btn-primary" type="button">
              Guardar receta
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

export default FormularioGenerarIA;
