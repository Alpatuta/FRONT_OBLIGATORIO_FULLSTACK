import FiltrosListado from "./FiltrosListado";

const HeaderListado = () => {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">Documentos</p>
        <h2>Listado de recetas</h2>
      </div>
      <FiltrosListado />
    </div>
  );
};

export default HeaderListado;
