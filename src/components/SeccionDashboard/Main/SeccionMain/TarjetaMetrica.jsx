const TarjetaMetrica = ({ label, value, sub, colorClass, icon }) => {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${colorClass}`}>{icon}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-sub">{sub}</div>
    </article>
  );
};

export default TarjetaMetrica;
