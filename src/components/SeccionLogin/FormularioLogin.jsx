import { useNavigate } from "react-router";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validators/auth.validators";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/auth.slice";
import { toast } from "react-toastify";

const FormularioLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(loginSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const procesarLogin = async (data) => {
    try {
      const response = await axios.post(
        "https://obligatorio-fullstack-six.vercel.app/V1/auth/login",
        data,
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.correo));
      dispatch(
        setCredentials({
          token: response.data.token,
          user: response.data.user,
        }),
      );

      navigate("/dashboard");
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error desconocido";

      toast.error(`Error al iniciar sesión: ${mensaje}`);
      console.error(mensaje);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(procesarLogin)}>
      <div className="field">
        <label htmlFor="login-correo">Correo electrónico</label>
        <input
          id="login-correo"
          type="email"
          placeholder="usuario@mail.com"
          autoComplete="email"
          required
          {...register("correo")}
        />
      </div>

      <div className="field">
        <label htmlFor="login-contrasenia">Contraseña</label>
        <input
          id="login-contrasenia"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          {...register("contrasenia")}
        />
      </div>

      <div className="alert alert-info" style={{ fontSize: "13px" }}>
        El botón se habilitará cuando ambos campos sean válidos.
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-full"
        style={{ marginTop: "4px" }}
        disabled={!isValid}
      >
        Ingresar
      </button>
    </form>
  );
};

export default FormularioLogin;
