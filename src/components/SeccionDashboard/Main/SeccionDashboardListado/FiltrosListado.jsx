const FiltrosListado = ({
  filtroDificultad,
  setFiltroDificultad,
  filtroCategoria,
  setFiltroCategoria,
  categoriasDisponibles,
}) => {
  return (
    <div className="filter-row">
      <select
        className="filter-select"
        aria-label="Filtrar por categoría"
        value={filtroCategoria}
        onChange={(e) => setFiltroCategoria(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categoriasDisponibles.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        aria-label="Filtrar por dificultad"
        value={filtroDificultad}
        onChange={(e) => setFiltroDificultad(e.target.value)}
      >
        <option value="">Todas las dificultades</option>
        <option value="Fácil">Fácil</option>
        <option value="Media">Media</option>
        <option value="Difícil">Difícil</option>
      </select>
    </div>
  );
};

export default FiltrosListado;
