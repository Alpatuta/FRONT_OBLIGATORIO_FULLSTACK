import FiltrosListado from "./FiltrosListado";

const HeaderListado = () => {
  return (
    <div className="section-header">
      <div>
        <div className="card-title">Listado de recetas</div>
        <div className="card-subtitle">3 recetas en tu colección</div>
      </div>
      <FiltrosListado />
    </div>
  );
};

export default HeaderListado;
