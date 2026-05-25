import FormularioRegistro from "./FormularioRegistro";
import HeaderRegistro from "./HeaderRegistro";

const AuthCardRegistro = () => {
  return (
    <section className="auth-card">
      <HeaderRegistro />
      <FormularioRegistro />
      <p className="auth-switch">
        Ya tienes cuenta?
        <a href="#login">Ingresar</a>
      </p>
    </section>
  );
};

export default AuthCardRegistro;
