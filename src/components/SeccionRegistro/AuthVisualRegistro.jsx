const AuthVisualRegistro = () => {
  return (
    <section
      className="auth-visual compact-visual"
      aria-label="Resumen visual del producto"
    >
      <img
        src="../../../src/assets/recipe-board.svg"
        alt="Mesa con recetas, platos y hierbas"
      />
      <div className="visual-stats">
        <div>
          <strong>4</strong>
          <span>recetas plan plus</span>
        </div>
        <div>
          <strong>IA</strong>
          <span>variantes y adaptaciones</span>
        </div>
      </div>
    </section>
  );
};

export default AuthVisualRegistro;
