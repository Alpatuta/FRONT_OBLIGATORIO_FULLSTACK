import AuthCardLogin from "./AuthCardLogin";
import AuthVisual from "./AuthVisual";

const Login = () => {
  return (
    <section className="screen screen-auth" aria-labelledby="login-title">
      <div className="auth-shell">
        <AuthVisual />
        <AuthCardLogin />
      </div>
    </section>
  );
};

export default Login;
