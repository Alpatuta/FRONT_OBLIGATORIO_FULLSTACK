const AuthVisual = () => {
  return (
    <section className="auth-visual" aria-label="Presentación de Recetario IA">
      <div className="auth-visual-brand">
        <a className="brand" href="/">
          <img
            src="https://res.cloudinary.com/dfa3ts2kx/image/upload/v1780618820/recetario-ia-favicon-transparente_e3ssoq.svg"
            alt="Recetario IA"
            className="brand-mark"
            style={{ background: "transparent" }}
          />
          <span style={{ color: "#f1f5f9" }}>Recetario IA</span>
        </a>
      </div>

      {/* Podria ser una imagen */}
      <span className="auth-visual-deco" aria-hidden="true">
        🍽
      </span>

      <div className="auth-visual-copy">
        <p className="eyebrow" style={{ color: "#4ade80" }}>
          Cocina organizada
        </p>
        <h1>Gestiona tus recetas con inteligencia artificial.</h1>
        <p>
          Crea, organiza y adapta preparaciones con IA. Controla tu plan, sube
          imágenes y descubre nuevas ideas culinarias.
        </p>

        <div className="visual-stats-grid">
          <div className="visual-stat">
            <strong>IA</strong>
            <span>Generación y adaptación automática</span>
          </div>
          <div className="visual-stat">
            <strong>4+</strong>
            <span>Recetas disponibles en plan plus</span>
          </div>
          <div className="visual-stat">
            <strong>∞</strong>
            <span>Recetas ilimitadas en premium</span>
          </div>
          <div className="visual-stat">
            <strong>+33</strong>
            <span>Tipos de adaptación disponibles</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthVisual;
