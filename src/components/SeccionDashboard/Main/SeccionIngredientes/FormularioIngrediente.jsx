import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { ingredienteSchema } from "../../../../validators/ingredientes.validators";
import api from "../../../../api/api";

const FormularioIngrediente = ({ editando, onCancelEdit, onSaved }) => {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(ingredienteSchema),
  });
// Cuando cambiamos editando, le cargo lso valores en el form, si editando es null lo resetea a vacio, sino le pone los valores del ingrediente que se esta editando, y ademas resetea el estado de guardado para ocultar el mensaje de exito si es que estaba mostrando
  useEffect(() => {
    reset({
      nombre: editando?.nombre ?? "",
      cantidad: editando?.cantidad ?? "",
      unidad: editando?.unidad ?? "g", // default a gramos si no hay editando
    });
    setSaved(false);
  }, [editando, reset]); //FIJATE ESTO! hace uso del reset por que si el usuario usuario hace click en "Editar" en una tarjeta, el formulario no va a mostrar los datos de ese ingrediente. El reset() de react-hook-form es el que sincroniza los valores del form con el objeto editando que me recomendo cloude, a diferencia teniamos con categorias.



  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editando) {
        await api.patch(`/ingredientes/${editando._id}`, data, { //OJO ACA, quise usar put, pero el backend de ingredientes usaba PATCH a diferencias de categoria que usaba PUT
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Ingrediente actualizado correctamente");
      } else {
        await api.post("/ingredientes", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Ingrediente creado correctamente");
        reset({ nombre: "", cantidad: "", unidad: "g" });
      }
      setSaved(true);
      onSaved();
      if (editando) onCancelEdit();
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      toast.error(err.response?.data?.message ?? "Error al guardar el ingrediente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card-header">
        <div>
          <div className="card-title">
            {editando ? "Editar ingrediente" : "Nuevo ingrediente"}
          </div>
          <div className="card-subtitle">
            {editando
              ? `Editando: ${editando.nombre}`
              : "Registrá un ingrediente con su cantidad"}
          </div>
        </div>
        {editando && <span className="badge badge-amber">Editando</span>}
      </div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="ing-nombre">Nombre del ingrediente</label>
          <input
            id="ing-nombre"
            type="text"
            placeholder="Ej: Harina de trigo, Aceite de oliva…"
            {...register("nombre")}
          />
          {errors.nombre && (
            <span className="field-error">{errors.nombre.message}</span>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div className="field">
            <label htmlFor="ing-cantidad">Cantidad</label>
            <input
              id="ing-cantidad"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="500"
              {...register("cantidad", { valueAsNumber: true })}
            />
            {errors.cantidad && (
              <span className="field-error">{errors.cantidad.message}</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="ing-unidad">Unidad</label>
            <select id="ing-unidad" {...register("unidad")}>
              <option value="g">gramos (g)</option>
              <option value="kg">kilogramos (kg)</option>
              <option value="ml">mililitros (ml)</option>
              <option value="l">litros (l)</option>
              <option value="unid">unidades</option>
              <option value="cdta">cucharadita</option>
              <option value="cda">cucharada</option>
              <option value="taza">taza</option>
            </select>
            {errors.unidad && (
              <span className="field-error">{errors.unidad.message}</span>
            )}
          </div>
        </div>

        {saved && (
          <div className="alert alert-success">
            Ingrediente {editando ? "actualizado" : "registrado"} correctamente.
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
            {editando ? "Actualizar" : "Agregar ingrediente"}
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

export default FormularioIngrediente;
