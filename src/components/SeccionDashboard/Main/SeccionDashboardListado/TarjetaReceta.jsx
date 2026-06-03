import { useState } from "react";

const DIFF_BADGE = {
  Fácil: "badge-green",
  Media: "badge-amber",
  Difícil: "badge-red",
};

const TarjetaReceta = ({ receta, onDelete, onEdit }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const thumb = receta.imagen ? (
    <img
      src={receta.imagen}
      alt={receta.titulo}
      style={{
        width: "44px",
        height: "44px",
        objectFit: "cover",
        borderRadius: "var(--r)",
      }}
    />
  ) : (
    receta.titulo?.charAt(0).toUpperCase()
  );

  return (
    <article className="recipe-row">
      <div className="recipe-thumb" aria-hidden="true">
        {thumb}
      </div>

      <div className="recipe-info">
        <strong>{receta.titulo}</strong>
        <div className="recipe-meta">
          <span className="badge badge-gray">
            {receta.categoria?.nombre ?? "Sin categoría"}
          </span>
          <span
            className={`badge ${DIFF_BADGE[receta.dificultad] ?? "badge-gray"}`}
          >
            {receta.dificultad}
          </span>
          <span style={{ fontSize: "12px", color: "var(--text-subtle)" }}>
            {receta.ingredientes?.length ?? 0} ingredientes
          </span>
        </div>
      </div>

      <div className="row-actions">
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
        )}
      </div>
    </article>
  );
};

export default TarjetaReceta;
