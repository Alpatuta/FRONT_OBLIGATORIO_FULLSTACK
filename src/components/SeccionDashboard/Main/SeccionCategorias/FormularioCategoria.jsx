import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";
import { categoriaSchema } from "../../../../validators/categorias.validators";
import api from "../../../../api/api";

const FormularioCategoria = ({ editando, onCancelEdit, onSaved }) => {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(categoriaSchema),
  });

  // Cuando cambia lo que se está editando, reinicia el form con esos valores
  useEffect(() => {
    reset({
      nombre: editando?.nombre ?? "",
      descripcion: editando?.descripcion ?? "",
    });
    setSaved(false);
  }, [editando, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editando) {
        await api.put(`/categorias/${editando._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Categoría actualizada correctamente");
      } else {
        await api.post("/categorias", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Categoría creada correctamente");
        reset({ nombre: "", descripcion: "" });
      }

      setSaved(true);
      onSaved();
      if (editando) onCancelEdit();
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      toast.error(
        err.response?.data?.message ?? "Error al guardar la categoría",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card-header">
        <div>
          <div className="card-title">
            {editando ? "Editar categoría" : "Nueva categoría"}
          </div>
          <div className="card-subtitle">
            {editando
              ? `Editando: ${editando.nombre}`
              : "Completá los datos de la nueva categoría"}
          </div>
        </div>
        {editando && <span className="badge badge-amber">Editando</span>}
      </div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="cat-nombre">Nombre</label>
          <input
            id="cat-nombre"
            type="text"
            placeholder="Ej: Postres, Ensaladas…"
            {...register("nombre")}
          />
          {errors.nombre && (
            <span className="error">{errors.nombre.message}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="cat-descripcion">Descripción</label>
          <textarea
            id="cat-descripcion"
            rows={3}
            placeholder="Descripción breve de la categoría…"
            {...register("descripcion")}
          />
          {errors.descripcion && (
            <span className="error">{errors.descripcion.message}</span>
          )}
        </div>

        {saved && (
          <div className="alert alert-success">
            Categoría {editando ? "actualizada" : "creada"} correctamente.
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? <span className="spinner" /> : null}
            {editando ? "Actualizar" : "Crear categoría"}
          </button>
          {editando && (
            <button
              className="btn btn-ghost"
              type="button"
              onClick={onCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default FormularioCategoria;
