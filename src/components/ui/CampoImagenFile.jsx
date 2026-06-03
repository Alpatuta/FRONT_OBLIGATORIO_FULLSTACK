const CampoImagenFile = ({
  name = "imagen", // nombre del campo en React Hook Form
  id, // id HTML (si no se pasa, usa el name)
  label = "Imagen",
  register, // viene del useForm del formulario padre
  watch, // viene del useForm del formulario padre
  error, // viene de errors.imagen
  imagenActual = null, // solo para editar: muestra la URL actual
}) => {
  const htmlId = id ?? name;
  const archivoSeleccionado = watch(name)?.[0]?.name;

  return (
    <div className="field">
      <label>{label}</label>

      {/* Si estamos editando y hay imagen actual, la mostramos */}
      {imagenActual && !archivoSeleccionado && (
        <span className="field-hint">Imagen actual guardada</span>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Este label dispara el file picker al clickearse */}
        <label
          htmlFor={htmlId}
          className="btn btn-secondary btn-sm"
          style={{ cursor: "pointer", flexShrink: 0 }}
        >
          {imagenActual ? "Cambiar imagen" : "Seleccionar archivo"}
        </label>

        {/* Nombre del archivo elegido o texto de estado */}
        <span
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {archivoSeleccionado ??
            (imagenActual ? "Sin cambios" : "Ningún archivo seleccionado")}
        </span>
      </div>

      {/* Input real oculto */}
      <input
        id={htmlId}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        {...register(name)}
      />

      {error && <span className="field-error">{error.message}</span>}
    </div>
  );
};

export default CampoImagenFile;
