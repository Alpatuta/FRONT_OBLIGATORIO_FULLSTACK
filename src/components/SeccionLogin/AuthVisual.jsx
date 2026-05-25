const AuthVisual = () => {
  return (
    <section className="auth-visual" aria-label="Presentacion de Recetario IA">
      <a className="brand brand-on-visual" href="#login">
        <span className="brand-mark">R</span>
        <span>Recetario IA</span>
      </a>
      <img
        src="../../../src/assets/recipe-board.svg"
        alt="Mesa con recetas, platos y hierbas"
      />
      <div className="visual-copy">
        <p className="eyebrow">Cocina organizada</p>
        <h1>Gestiona tus recetas, imagenes y variantes con IA.</h1>
        <p>
          Un espacio simple para guardar preparaciones, revisar uso del plan y
          encontrar ideas nuevas.
        </p>
      </div>
    </section>
  );
};

export default AuthVisual;
