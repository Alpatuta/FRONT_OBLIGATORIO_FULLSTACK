import React from "react";

const FormularioAltaReceta = () => {
  return (
    <form className="recipe-form">
      <div className="field">
        <label htmlFor="receta-titulo">Titulo</label>
        <input
          id="receta-titulo"
          type="text"
          placeholder="Tarta rustica de verduras"
        />
      </div>
      <div className="field">
        <label htmlFor="receta-categoria">Categoria</label>
        <select id="receta-categoria">
          <option>Vegetariana</option>
          <option>Pastas</option>
          <option>Postres</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="receta-dificultad">Dificultad</label>
        <select id="receta-dificultad">
          <option>Facil</option>
          <option>Media</option>
          <option>Dificil</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="receta-imagen">Imagen</label>
        <input id="receta-imagen" type="file" />
      </div>
      <div className="field span-2">
        <label htmlFor="receta-descripcion">Descripcion</label>
        <textarea
          id="receta-descripcion"
          rows={4}
          placeholder="Descripcion breve de la receta"
          defaultValue={""}
        />
      </div>
      <div className="field span-2">
        <label htmlFor="receta-ingredientes">Ingredientes</label>
        <textarea
          id="receta-ingredientes"
          rows={3}
          placeholder="Harina, huevos, queso, vegetales"
          defaultValue={""}
        />
      </div>
      <div className="field span-2">
        <label htmlFor="receta-pasos">Pasos</label>
        <textarea
          id="receta-pasos"
          rows={4}
          placeholder="Preparar, mezclar, hornear y servir"
          defaultValue={""}
        />
      </div>
      <button className="button button-primary span-2" type="button">
        Guardar receta
      </button>
    </form>
  );
};

export default FormularioAltaReceta;
