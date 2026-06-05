const HeaderSidebar = () => {
  return (
    <div className="sidebar-header">
      <a className="brand" href="/dashboard">
        <img
          src="https://res.cloudinary.com/dfa3ts2kx/image/upload/v1780618820/recetario-ia-favicon-transparente_e3ssoq.svg"
          alt=""
          className="brand-mark"
          style={{ background: "transparent" }}
        />
        <span className="brand-name" style={{ color: "#e2e8f0" }}>
          Recetario IA
        </span>
      </a>
    </div>
  );
};

export default HeaderSidebar;
