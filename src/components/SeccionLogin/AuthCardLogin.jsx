import FormularioLogin from "./FormularioLogin";
import HeaderLogin from "./HeaderLogin";

const AuthCardLogin = () => {
  return (
    <section className="auth-card">
      <HeaderLogin />
      <FormularioLogin />

      <p className="auth-switch">
        No tienes cuenta?
        <a href="#registro">Crear cuenta</a>
      </p>
    </section>
  );
};

export default AuthCardLogin;
