const TarjetaReceta = () => {
  return (
    <article className="recipe-row">
      <img
        src="../../../../../src/assets/recipe-board.svg"
        alt="Miniatura de receta vegetariana"
      />
      <div>
        <strong>Tarta rustica de verduras</strong>
        <span>Vegetariana · Media · 4 ingredientes</span>
      </div>
      <div className="row-actions">
        <button type="button">Editar</button>
        <button className="danger" type="button">
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default TarjetaReceta;
