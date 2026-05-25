const HeaderMain = () => {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Dashboard</p>
        <h1 id="dashboard-title">Gestion general de recetas</h1>
      </div>
      <div className="profile-pill">
        <span className="avatar">RP</span>
        <div>
          <strong>Rodrigo</strong>
          <span>Plan plus</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
