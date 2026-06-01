const HeaderMain = ({ eyebrow, title }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="dashboard-title">{title}</h1>
      </div>
      <div className="profile-pill">
        <div className="p-avatar">RP</div>
        <div>
          <strong>Rodrigo</strong>
          <span>Plan plus</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
