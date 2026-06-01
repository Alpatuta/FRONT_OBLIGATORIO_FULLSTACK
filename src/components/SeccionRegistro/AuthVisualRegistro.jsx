const AuthVisualRegistro = () => {
  return (
    <section className="auth-visual" aria-label="Resumen visual del producto">
      <div className="auth-visual-brand">
        <a className="brand" href="/">
          <span className="brand-mark">R</span>
          <span style={{ color: "#f1f5f9" }}>Recetario IA</span>
        </a>
      </div>

      <span className="auth-visual-deco" aria-hidden="true">
        🥗
      </span>

      <div className="auth-visual-copy">
        <p className="eyebrow" style={{ color: "#4ade80" }}>
          Empezá hoy
        </p>
        <h1>Tu recetario inteligente te espera.</h1>
        <p>
          Registrate gratis y empezá a organizar tus recetas, generar variantes
          con IA y gestionar tu colección culinaria.
        </p>

        <div className="visual-stats-grid">
          <div className="visual-stat">
            <strong>Gratis</strong>
            <span>Plan plus sin costo</span>
          </div>
          <div className="visual-stat">
            <strong>IA</strong>
            <span>Chef personal con IA</span>
          </div>
          <div className="visual-stat">
            <strong>4</strong>
            <span>Recetas en plan plus</span>
          </div>
          <div className="visual-stat">
            <strong>Premium</strong>
            <span>Acceso ilimitado disponible</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthVisualRegistro;
