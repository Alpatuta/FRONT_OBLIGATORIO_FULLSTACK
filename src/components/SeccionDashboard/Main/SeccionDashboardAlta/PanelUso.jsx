const PanelUso = () => {
  return (
    <aside className="panel usage-panel">
      <p className="eyebrow">Informe de uso</p>
      <h2>Plan plus</h2>
      <div className="usage-ring" aria-hidden="true">
        <span>75%</span>
      </div>
      <p className="muted">3 de 4 recetas disponibles utilizadas.</p>
      <button className="button button-secondary" type="button">
        Cambiar a premium
      </button>
    </aside>
  );
};

export default PanelUso;
