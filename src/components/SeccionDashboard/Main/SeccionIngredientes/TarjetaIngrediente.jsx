import { useState } from "react";

const TarjetaIngrediente = ({ ingrediente, onEdit, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <article className="entity-row ingrediente-row">
      <div className="ingrediente-qty">
        <strong>{ingrediente.cantidad}</strong>
        <span>{ingrediente.unidad}</span>
      </div>

      <div>
        <strong>{ingrediente.nombre}</strong>
        <p>
          {ingrediente.cantidad} {ingrediente.unidad} disponibles
        </p>
      </div>

      <div className="entity-row-actions">
        {confirmDelete ? (
          <>
            <button
              className="btn btn-danger btn-sm"
              type="button"
              onClick={onDelete}
            >
              Confirmar
            </button>
            <button
              className="btn btn-ghost btn-sm"
              type="button"
              onClick={() => setConfirmDelete(false)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-outline btn-sm"
              type="button"
              onClick={onEdit}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Editar
            </button>
            <button
              className="btn btn-danger-soft btn-sm"
              type="button"
              onClick={() => setConfirmDelete(true)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
              Eliminar
            </button>
          </>
        )}
      </div>
    </article>
  );
};

export default TarjetaIngrediente;
