import { useState } from "react";
import { Link } from "react-router";

const FormularioRegistro = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <form className="form form-grid-2" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="reg-nombre">Nombre completo</label>
        <input
          id="reg-nombre"
          type="text"
          placeholder="Juan Pérez"
          autoComplete="name"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="reg-correo">Correo electrónico</label>
        <input
          id="reg-correo"
          type="email"
          placeholder="usuario@mail.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="reg-contrasenia">Contraseña</label>
        <input
          id="reg-contrasenia"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
        <span className="field-hint">
          Mínimo 6 caracteres, incluir mayúscula y número
        </span>
      </div>

      <div className="field">
        <label htmlFor="reg-confirmar">Repetir contraseña</label>
        <input
          id="reg-confirmar"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
        <span className="field-hint">
          Debe coincidir con la contraseña ingresada
        </span>
      </div>

      <div className="alert alert-warning span-2" style={{ fontSize: "13px" }}>
        El botón permanecerá deshabilitado si algún campo no es válido.
      </div>

      <Link className="btn btn-primary btn-lg btn-full span-2" to="/dashboard">
        {loading ? <span className="spinner" /> : null}
        Crear cuenta
      </Link>
    </form>
  );
};

export default FormularioRegistro;
