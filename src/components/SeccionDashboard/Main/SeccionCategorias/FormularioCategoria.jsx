import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import { resolve } from "chart.js/helpers";


const FormularioCategoria = ({ editando , onCancelEdit, onSaved }) => {

 


 

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

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="cat-nombre">Nombre</label>
          <input
            id="cat-nombre"
            type="text"
            placeholder="Ej: Postres, Ensaladas…"
            defaultValue={editando?.nombre ?? ""}
            key={editando?.id ?? "new"}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="cat-descripcion">Descripción</label>
          <textarea
            id="cat-descripcion"
            rows={3}
            placeholder="Descripción breve de la categoría…"
            defaultValue={editando?.descripcion ?? ""}
            key={editando?.id ?? "new"}
            required
          />
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
