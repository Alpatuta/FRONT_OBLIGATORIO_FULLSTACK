const HeaderReviews = ({ count }) => (
  <div className="section-header" style={{ marginBottom: "16px" }}>
    <div>
      <div className="card-title">Reviews publicadas</div>
      <div className="card-subtitle">
        {count} review{count !== 1 ? "s" : ""} en total
      </div>
    </div>
  </div>
);

export default HeaderReviews;
