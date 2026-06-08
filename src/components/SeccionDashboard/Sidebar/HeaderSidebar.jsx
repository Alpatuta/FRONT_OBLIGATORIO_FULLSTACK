const HeaderSidebar = () => {
  return (
    <div className="sidebar-header">
      <a className="brand" href="/dashboard">
        <img
          src="https://res.cloudinary.com/dfa3ts2kx/image/upload/v1780920016/recetario_ia_body_icon_clean_m84obu.svg"
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
