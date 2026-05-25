import AuthCardRegistro from "./AuthCardRegistro";
import AuthVisualRegistro from "./AuthVisualRegistro";

const Registro = () => {
  return (
    <section
      id="registro"
      className="screen screen-auth"
      aria-labelledby="registro-title"
    >
      <div className="auth-shell auth-shell-reverse">
        <AuthCardRegistro />
        <AuthVisualRegistro />
      </div>
    </section>
  );
};

export default Registro;
