import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../../validators/auth.validators";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../features/auth/auth.slice";
import { useState } from "react";
import axios from "axios";

const FormularioRegistro = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(registerSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const procesarRegistro = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://obligatorio-fullstack-six.vercel.app/V1/auth/register",
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
      toast.error(`Error al registrarse: ${mensaje}`);
      console.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="form form-grid-2"
      onSubmit={handleSubmit(procesarRegistro)}
    >
      <div className="field">
        <label htmlFor="reg-nombre">Nombre completo</label>
        <input
          id="reg-nombre"
          type="text"
          placeholder="Juan Pérez"
          autoComplete="name"
          required
          {...register("nombre")}
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
          {...register("correo")}
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
          {...register("contrasenia")}
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
          {...register("confirmarContrasenia")}
        />
        <span className="field-hint">
          Debe coincidir con la contraseña ingresada
        </span>
      </div>

      <div className="alert alert-warning span-2" style={{ fontSize: "13px" }}>
        El botón permanecerá deshabilitado si algún campo no es válido.
      </div>

      {/* 
      <Link className="btn btn-primary btn-lg btn-full span-2" to="/dashboard">
        Crear cuenta
      </Link> */}

      <button
        type="submit"
        className="btn btn-primary btn-lg btn-full span-2"
        style={{ marginTop: "4px" }}
        disabled={!isValid}
      >
        {loading ? <span className="spinner" /> : null}
        Crear cuenta
      </button>
    </form>
  );
};

export default FormularioRegistro;
