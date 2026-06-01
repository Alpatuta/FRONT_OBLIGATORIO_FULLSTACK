const FiltrosListado = () => {
  return (
    <div className="filter-row">
      <select aria-label="Filtrar por categoria">
        <option>Todas las categorias</option>
        <option>Vegetariana</option>
        <option>Pastas</option>
      </select>
      <select aria-label="Filtrar por dificultad">
        <option>Todas las dificultades</option>
        <option>Facil</option>
        <option>Media</option>
      </select>
    </div>
  );
};

export default FiltrosListado;
