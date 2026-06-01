const HeaderIngredientes = ({ count }) => {
  return (
    <div className="section-header" style={{ marginBottom: "16px" }}>
      <div>
        <div className="card-title">Ingredientes registrados</div>
        <div className="card-subtitle">{count} ingredientes en total</div>
      </div>
    </div>
  );
};

export default HeaderIngredientes;
