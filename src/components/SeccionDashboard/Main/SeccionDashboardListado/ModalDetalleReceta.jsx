import { createPortal } from "react-dom";

const DIFF_BADGE = {
  Fácil: "badge-green",
  Media: "badge-amber",
  Difícil: "badge-red",
};

const ModalDetalleReceta = ({ receta, onClose }) => {
  const nombreAutor = receta.autorNombre || receta.autor;

  // Cierra el modal al hacer clic en el overlay (fuera de la card)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const fecha = receta.fechaDeCreacion
    ? new Date(receta.fechaDeCreacion).toLocaleDateString("es-UY", {
        day: "2-digit", month: "long", year: "numeric",
      })
    : null;

  return createPortal(
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "var(--r-lg)",
          width: "100%",
          maxWidth: "560px",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "32px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          margin: "auto",
        }}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--surface-2, #f1f5f9)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            color: "var(--text-muted)",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--surface-3, #e2e8f0)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--surface-2, #f1f5f9)"}
          aria-label="Cerrar"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Imagen */}
        {receta.imagen && (
          <img
            src={receta.imagen}
            alt={receta.titulo}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "var(--r)",
              marginBottom: "20px",
            }}
          />
        )}

        {/* Título y badges */}
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px" }}>
            {receta.titulo}
          </h2>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span className="badge badge-gray">
              {receta.categoria?.nombre ?? "Sin categoría"}
            </span>
            <span className={`badge ${DIFF_BADGE[receta.dificultad] ?? "badge-gray"}`}>
              {receta.dificultad}
            </span>
          </div>
        </div>

        {/* Meta info */}
        <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "20px", display: "grid", gap: "4px" }}>
          <span>👤 Creado por: <strong>{nombreAutor}</strong></span>
          {fecha && <span>📅 Fecha: <strong>{fecha}</strong></span>}
        </div>

        <div className="divider" style={{ marginBottom: "20px" }} />

        {/* Descripción */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
            DESCRIPCIÓN
          </p>
          <p style={{ fontSize: "14px", color: "var(--text)", lineHeight: 1.6 }}>
            {receta.descripcion}
          </p>
        </div>

        {/* Ingredientes */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
            INGREDIENTES ({receta.ingredientes?.length ?? 0})
          </p>
          <ul style={{ paddingLeft: "18px", display: "grid", gap: "4px" }}>
            {receta.ingredientes?.map((ing, i) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--text)" }}>{ing}</li>
            ))}
          </ul>
        </div>

        {/* Pasos */}
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px" }}>
            PASOS
          </p>
          <ol style={{ paddingLeft: "18px", display: "grid", gap: "8px" }}>
            {receta.pasos?.map((paso, i) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--text)", lineHeight: 1.6 }}>{paso}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalDetalleReceta;