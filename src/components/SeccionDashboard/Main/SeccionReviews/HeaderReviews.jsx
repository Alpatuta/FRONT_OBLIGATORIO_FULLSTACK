const HeaderReviews = ({ count, loading }) => (
  <div className="section-header" style={{ marginBottom: "16px" }}>
    <div>
      <div className="card-title">Reviews publicadas</div>
      <div className="card-subtitle">
        {loading
          ? "Cargando…"
          : `${count} review${count !== 1 ? "s" : ""} en total`}
      </div>
    </div>
  </div>
);

export default HeaderReviews;
