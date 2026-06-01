import { Link } from "react-router";
import FormularioLogin from "./FormularioLogin";
import HeaderLogin from "./HeaderLogin";

const AuthCardLogin = () => {
  return (
    <section className="auth-card">
      <HeaderLogin />
      <FormularioLogin />
      <p className="auth-footer">
        ¿No tenés cuenta? <Link to="/registro">Crear cuenta gratis</Link>
      </p>
    </section>
  );
};

export default AuthCardLogin;
