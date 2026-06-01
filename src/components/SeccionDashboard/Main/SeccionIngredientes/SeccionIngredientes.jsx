import { useState } from "react";
import HeaderIngredientes from "./HeaderIngredientes";
import FormularioIngrediente from "./FormularioIngrediente";
import TarjetaIngrediente from "./TarjetaIngrediente";

const INGREDIENTES_DEMO = [
  { id: 1, nombre: "Harina de trigo", cantidad: 500, unidad: "g" },
  { id: 2, nombre: "Huevos", cantidad: 6, unidad: "unid" },
  { id: 3, nombre: "Aceite de oliva", cantidad: 250, unidad: "ml" },
  { id: 4, nombre: "Sal fina", cantidad: 200, unidad: "g" },
];

const SeccionIngredientes = () => {
  const [ingredientes, setIngredientes] = useState(INGREDIENTES_DEMO);
  const [editando, setEditando] = useState(null);

  const handleDelete = (id) => {
    setIngredientes((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="crud-grid">
      <aside className="crud-form-card">
        <div className="card">
          <FormularioIngrediente
            editando={editando}
            onCancelEdit={() => setEditando(null)}
          />
        </div>
      </aside>

      <div>
        <HeaderIngredientes count={ingredientes.length} />
        {ingredientes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌿</div>
            <h3>Sin ingredientes</h3>
            <p>
              Agregá ingredientes para gestionar tu stock y usarlos en recetas.
            </p>
          </div>
        ) : (
          <div className="entity-list">
            {ingredientes.map((ing) => (
              <TarjetaIngrediente
                key={ing.id}
                ingrediente={ing}
                onEdit={() => setEditando(ing)}
                onDelete={() => handleDelete(ing.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionIngredientes;
