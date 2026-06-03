import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../../../api/api";
import { crearRecetaFormSchema } from "../../../../validators/recetas.form.validators";
import CampoImagenFile from "../../../ui/CampoImagenFile";

const FormularioAltaReceta = ({
  categorias,
  loadingCategorias,
  onRecetaCreada,
}) => {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(crearRecetaFormSchema),
  });

  const crearReceta = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", data.titulo);
      formData.append("descripcion", data.descripcion);
      formData.append("dificultad", data.dificultad);
      formData.append("categoria", data.categoria);

      // Transformamos los campos de ingredientes y pasos de texto a arrays, asumiendo que el usuario ingresa un ingrediente/paso por línea
      data.ingredientes
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((ing) => formData.append("ingredientes", ing));
      data.pasos
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((paso) => formData.append("pasos", paso));

      if (data.imagen?.[0]) {
        formData.append("imagen", data.imagen[0]);
      }

      await api.post("/recetas", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Receta creada correctamente");
      // Notificamos al componente padre para que actualice la cantidad de recetas
      onRecetaCreada();
      reset();
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error desconocido";
      toast.error(`Error al crear la receta: ${mensaje}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit(crearReceta)}>
      <div className="field">
        <label htmlFor="receta-titulo">Título</label>
        <input
          id="receta-titulo"
          type="text"
          placeholder="Tarta rústica de verduras"
          {...register("titulo")}
        />
        {errors.titulo && (
          <span className="field-error">{errors.titulo.message}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="receta-categoria">Categoría</label>
        <select
          id="receta-categoria"
          {...register("categoria")}
          disabled={loadingCategorias}
        >
          <option value="">
            {/*Si las categorías aún están cargando, mostramos un mensaje de carga en el dropdown*/}
            {loadingCategorias ? "Cargando…" : "Seleccioná una categoría"}
          </option>
          {categorias.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        {errors.categoria && (
          <span className="field-error">{errors.categoria.message}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="receta-dificultad">Dificultad</label>
        <select id="receta-dificultad" {...register("dificultad")}>
          <option value="">Seleccioná dificultad</option>
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Difícil">Difícil</option>
        </select>
        {errors.dificultad && (
          <span className="field-error">{errors.dificultad.message}</span>
        )}
      </div>

      <CampoImagenFile
        name="imagen"
        id="receta-imagen"
        label="Imagen"
        register={register}
        watch={watch}
        error={errors.imagen}
      />

      <div className="field span-2">
        <label htmlFor="receta-descripcion">Descripción</label>
        <textarea
          id="receta-descripcion"
          rows={3}
          placeholder="Descripción breve de la receta…"
          {...register("descripcion")}
        />
        {errors.descripcion && (
          <span className="field-error">{errors.descripcion.message}</span>
        )}
      </div>

      <div className="field span-2">
        <label htmlFor="receta-ingredientes">Ingredientes</label>
        <textarea
          id="receta-ingredientes"
          rows={3}
          placeholder="Un ingrediente por línea: Harina, Huevos, Queso…"
          {...register("ingredientes")}
        />
        {errors.ingredientes && (
          <span className="field-error">{errors.ingredientes.message}</span>
        )}
        <span className="field-hint">Escribí un ingrediente por línea</span>
      </div>

      <div className="field span-2">
        <label htmlFor="receta-pasos">Pasos de preparación</label>
        <textarea
          id="receta-pasos"
          rows={4}
          placeholder="Un paso por línea: Mezclar la harina, Agregar los huevos…"
          {...register("pasos")}
        />
        {errors.pasos && (
          <span className="field-error">{errors.pasos.message}</span>
        )}
        <span className="field-hint">Escribí un paso por línea</span>
      </div>

      <button
        className="btn btn-primary btn-lg btn-full span-2"
        type="submit"
        disabled={loading}
      >
        {loading ? <span className="spinner" /> : null}
        {loading ? "Guardando…" : "Guardar receta"}
      </button>
    </form>
  );
};

export default FormularioAltaReceta;
