import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import api from "../../../../api/api";
import { crearRecetaFormSchema } from "../../../../validators/recetas.form.validators";
import CampoImagenFile from "../../../ui/CampoImagenFile";

const FormularioEditarReceta = ({ receta, onCancelEdit, onSaved }) => {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(crearRecetaFormSchema),
  });

  useEffect(() => {
    reset({
      titulo: receta?.titulo ?? "",
      descripcion: receta?.descripcion ?? "",
      dificultad: receta?.dificultad ?? "",
      imagen: receta?.imagen ?? "",
      ingredientes: receta?.ingredientes?.join("\n") ?? "",
      pasos: receta?.pasos?.join("\n") ?? "",
      categoria: receta?.categoria?._id ?? receta?.categoria ?? "",
    });
  }, [receta, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", data.titulo);
      formData.append("descripcion", data.descripcion);
      formData.append("dificultad", data.dificultad);
      formData.append("categoria", data.categoria);

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

      if (data.imagen instanceof FileList && data.imagen[0]) {
        formData.append("imagen", data.imagen[0]);
      }

      await api.patch(`/recetas/${receta._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Receta actualizada correctamente");
      onSaved();
    } catch (err) {
      const rawError = err.response?.data?.error;
      const mensaje =
        err.response?.data?.message ||
        (Array.isArray(rawError)
          ? rawError.map((e) => e.message).join(", ")
          : rawError) ||
        "Error desconocido";
      toast.error(`Error al actualizar la receta: ${mensaje}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: "16px" }} ref={formRef}>
      <div className="card-header">
        <div>
          <div className="card-title">Editar receta</div>
          <div className="card-subtitle">Editando: {receta.titulo}</div>
        </div>
        <span className="badge badge-amber">Editando</span>
      </div>

      <form className="recipe-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Los mismos campos de FormularioAltaReceta */}
        <div className="field">
          <label htmlFor="edit-titulo">Título</label>
          <input id="edit-titulo" type="text" {...register("titulo")} />
          {errors.titulo && (
            <span className="field-error">{errors.titulo.message}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="edit-dificultad">Dificultad</label>
          <select id="edit-dificultad" {...register("dificultad")}>
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
          imagenActual={receta?.imagen}
        />

        <div className="field span-2">
          <label htmlFor="edit-descripcion">Descripción</label>
          <textarea
            id="edit-descripcion"
            rows={3}
            {...register("descripcion")}
          />
          {errors.descripcion && (
            <span className="field-error">{errors.descripcion.message}</span>
          )}
        </div>

        <div className="field span-2">
          <label htmlFor="edit-ingredientes">Ingredientes</label>
          <textarea
            id="edit-ingredientes"
            rows={3}
            {...register("ingredientes")}
          />
          <span className="field-hint">Un ingrediente por línea</span>
          {errors.ingredientes && (
            <span className="field-error">{errors.ingredientes.message}</span>
          )}
        </div>

        <div className="field span-2">
          <label htmlFor="edit-pasos">Pasos</label>
          <textarea id="edit-pasos" rows={4} {...register("pasos")} />
          <span className="field-hint">Un paso por línea</span>
          {errors.pasos && (
            <span className="field-error">{errors.pasos.message}</span>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }} className="span-2">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? <span className="spinner" /> : null}
            Actualizar receta
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={onCancelEdit}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioEditarReceta;
