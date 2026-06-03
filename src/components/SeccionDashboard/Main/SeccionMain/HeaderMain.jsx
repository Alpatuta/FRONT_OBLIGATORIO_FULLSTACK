import { useSelector } from "react-redux";

const HeaderMain = ({ eyebrow, title }) => {
  const user = useSelector((state) => state.auth.user);
  const primerLetraNombre = user?.nombre
    ? user.nombre.charAt(0).toUpperCase()
    : "U";
  const primerLetraApellido = user?.nombre
    ? user.nombre.split(" ").slice(-1)[0].charAt(0).toUpperCase()
    : "N";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="dashboard-title">{title}</h1>
      </div>
      <div className="profile-pill">
        <div className="p-avatar">
          {primerLetraNombre}
          {primerLetraApellido}
        </div>
        <div>
          <strong>{user?.nombre}</strong>
          <span>Plan {user?.plan}</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
