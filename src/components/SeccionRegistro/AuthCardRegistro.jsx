import { Link } from "react-router";
import FormularioRegistro from "./FormularioRegistro";
import HeaderRegistro from "./HeaderRegistro";

const AuthCardRegistro = () => {
  return (
    <section className="auth-card">
      <HeaderRegistro />
      <FormularioRegistro />
      <p className="auth-switch">
        Ya tienes cuenta?
        <Link to="/">Ingresar</Link>
      </p>
    </section>
  );
};

export default AuthCardRegistro;
