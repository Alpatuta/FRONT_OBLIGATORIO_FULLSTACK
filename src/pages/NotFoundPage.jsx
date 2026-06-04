import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface-2)",
        gap: "16px",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          fontSize: "96px",
          fontWeight: 900,
          color: "var(--primary)",
          lineHeight: 1,
        }}
      >
        404
      </div>

      <div
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "var(--text)",
        }}
      >
        Página no encontrada
      </div>

      <div
        style={{
          fontSize: "15px",
          color: "var(--text-muted)",
          maxWidth: "380px",
        }}
      >
        La URL que ingresaste no existe o fue movida. Revisá la dirección o
        volvé al inicio.
      </div>

      <button
        className="btn btn-primary"
        style={{ marginTop: "8px" }}
        onClick={() => navigate("/")}
        type="button"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default NotFoundPage;
