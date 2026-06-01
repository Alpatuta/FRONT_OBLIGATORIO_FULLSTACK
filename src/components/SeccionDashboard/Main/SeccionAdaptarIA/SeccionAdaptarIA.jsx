import HeaderAdaptarIA from "./HeaderAdaptarIA";
import FormularioAdaptarIA from "./FormularioAdaptarIA";

const SeccionAdaptarIA = () => {
  return (
    <div className="ia-grid">
      <div>
        <div className="card">
          <HeaderAdaptarIA />
          <FormularioAdaptarIA />
        </div>
      </div>

      <aside className="ia-tip-card">
        <h3>Tipos de adaptación</h3>
        <p>
          Transformá cualquier receta para que se ajuste a tus necesidades o
          estilo de vida.
        </p>
        <ul className="ia-tip-list">
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>Dietas especiales: vegana,
            vegetariana, sin gluten, keto
          </li>
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>Salud: bajo en sodio, sin
            azúcar, alto en proteína
          </li>
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>Estilo: gourmet, fusión,
            económico, para niños
          </li>
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>Equipamiento: olla de
            presión, air fryer, plancha
          </li>
          <li className="ia-tip-item">
            <span className="ia-tip-arrow">→</span>+33 tipos de adaptación
            disponibles
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SeccionAdaptarIA;
