import HeaderGenerarIA from "./HeaderGenerarIA";
import FormularioGenerarIA from "./FormularioGenerarIA";

const SeccionGenerarIA = () => {
  return (
    <div className="ia-grid">
      <div>
        <div className="card">
          <HeaderGenerarIA />
          <FormularioGenerarIA />
        </div>
      </div>

      <aside className="ia-tip-card">
        <h3>¿Cómo funciona?</h3>
        <p>
          La IA analiza los ingredientes disponibles y genera una receta
          completa adaptada a tu solicitud.
        </p>
        <ul className="ia-tip-list">
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>
            Ingresá los ingredientes que tenés disponibles en casa
          </li>
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>
            Elegí la dificultad que querés para la preparación
          </li>
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>
            Seleccioná la categoría para clasificar la receta
          </li>
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>
            La IA genera título, ingredientes, pasos y descripción completa
          </li>
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>
            La receta se guarda automáticamente en tu colección
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SeccionGenerarIA;
