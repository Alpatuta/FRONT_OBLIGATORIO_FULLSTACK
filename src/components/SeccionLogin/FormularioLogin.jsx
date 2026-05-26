import { Link } from "react-router";

const FormularioLogin = () => {
  return (
    <>
      <form className="form">
        <div className="field">
          <label htmlFor="login-correo">Correo</label>
          <input
            id="login-correo"
            type="email"
            placeholder="usuario@mail.com"
          />
        </div>
        <div className="field">
          <label htmlFor="login-contrasenia">Contrasena</label>
          <input
            id="login-contrasenia"
            type="password"
            placeholder="Password1"
          />
        </div>
        <p className="form-message">
          El boton se habilitara cuando ambos campos sean validos.
        </p>
        <Link className="button button-primary" to="/dashboard">
          Ingresar
        </Link>
      </form>
    </>
  );
};

export default FormularioLogin;
