import { Link, useNavigate } from "react-router";
import axios from "axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { loginSchema } from "../../validators/auth.validators";
import { toast } from "react-toastify";

const FormularioLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });

  const procesarLogin = async (data) => {
    try {
      const response = await axios.post(
        "https://obligatorio-fullstack-six.vercel.app/V1/auth/login",
        data,
      );

      localStorage.setItem("token", response.data.token);
      //Almacenar el email del usuario en el localStorage para su uso posterior
      localStorage.setItem("user", JSON.stringify(response.data.correo));
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
    <>
      <form className="form" onSubmit={handleSubmit(procesarLogin)}>
        <div className="field">
          <label htmlFor="login-correo">Correo</label>
          <input
            id="login-correo"
            type="email"
            placeholder="usuario@mail.com"
            {...register("correo")}
          />
        </div>
        <div className="field">
          <label htmlFor="login-contrasenia">Contrasena</label>
          <input
            id="login-contrasenia"
            type="password"
            placeholder="Password1"
            {...register("contrasenia")}
          />
        </div>
        <p className="form-message">
          El boton se habilitara cuando ambos campos sean validos.
        </p>
        <button className="button button-primary" type="submit">
          Ingresar
        </button>
      </form>
    </>
  );
};

export default FormularioLogin;
