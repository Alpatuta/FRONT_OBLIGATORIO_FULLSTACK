import HeaderCategorias from "./HeaderCategorias";
import FormularioCategoria from "./FormularioCategoria";
import TarjetaCategoria from "./TarjetaCategoria";
import { useState } from "react";

const CATEGORIAS_DEMO = [
  {
    id: 1,
    nombre: "Vegetariana",
    descripcion: "Recetas sin carne ni pescado",
    emoji: "🥗",
    count: 1,
  },
  {
    id: 2,
    nombre: "Pastas",
    descripcion: "Recetas a base de pasta italiana",
    emoji: "🍝",
    count: 1,
  },
  {
    id: 3,
    nombre: "Postres",
    descripcion: "Preparaciones dulces y repostería",
    emoji: "🍰",
    count: 1,
  },
];

const SeccionCategorias = () => {
  const [categorias, setCategorias] = useState(CATEGORIAS_DEMO);
  const [editando, setEditando] = useState(null);

  const handleDelete = (id) => {
    setCategorias((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="crud-grid">
      <aside className="crud-form-card">
        <div className="card">
          <FormularioCategoria
            editando={editando}
            onCancelEdit={() => setEditando(null)}
          />
        </div>
      </aside>

      <div>
        <HeaderCategorias count={categorias.length} />
        {categorias.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏷</div>
            <h3>Sin categorías</h3>
            <p>Crea tu primera categoría para organizar tus recetas.</p>
          </div>
        ) : (
          <div className="entity-list">
            {categorias.map((cat) => (
              <TarjetaCategoria
                key={cat.id}
                categoria={cat}
                onEdit={() => setEditando(cat)}
                onDelete={() => handleDelete(cat.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionCategorias;
