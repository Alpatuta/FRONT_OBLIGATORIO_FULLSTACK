const FiltrosListado = () => {
  return (
    <div className="filter-row">
      <select className="filter-select" aria-label="Filtrar por categoría">
        <option value="">Todas las categorías</option>
        <option>Vegetariana</option>
        <option>Pastas</option>
        <option>Postres</option>
        <option>Ensaladas</option>
      </select>
      <select className="filter-select" aria-label="Filtrar por dificultad">
        <option value="">Todas las dificultades</option>
        <option>Fácil</option>
        <option>Media</option>
        <option>Difícil</option>
      </select>
    </div>
  );
};

export default FiltrosListado;
