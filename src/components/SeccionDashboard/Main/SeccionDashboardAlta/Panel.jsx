import FormularioAltaReceta from "./FormularioAltaReceta";
import HeaderPanel from "./HeaderPanel";

const Panel = ({ categorias, loadingCategorias, onRecetaCreada }) => {
  return (
    <article className="card">
      <HeaderPanel />
      {/* Pasamos la función onRecetaCreada al formulario para que pueda notificar al componente padre cuando se cree una nueva receta */}
      <FormularioAltaReceta
        categorias={categorias}
        loadingCategorias={loadingCategorias}
        onRecetaCreada={onRecetaCreada}
      />
    </article>
  );
};

export default Panel;
