const HeaderCategorias = ({ count }) => {
  return (
    <div className="section-header" style={{ marginBottom: "16px" }}>
      <div>
        <div className="card-title">Categorías registradas</div>
        <div className="card-subtitle">{count} categoría{count !== 1 ? "s" : ""} en total</div>
      </div>
    </div>
  );
};

export default HeaderCategorias;
