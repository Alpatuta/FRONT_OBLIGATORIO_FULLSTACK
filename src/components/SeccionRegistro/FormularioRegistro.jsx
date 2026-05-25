const FormularioRegistro = () => {
  return (
    <>
      <form className="form form-grid">
        <div className="field">
          <label htmlFor="registro-nombre">Nombre</label>
          <input
            id="registro-nombre"
            type="text"
            placeholder="Rodrigo Pintos"
          />
        </div>
        <div className="field">
          <label htmlFor="registro-correo">Correo</label>
          <input
            id="registro-correo"
            type="email"
            placeholder="usuario@mail.com"
          />
        </div>
        <div className="field">
          <label htmlFor="registro-contrasenia">Contrasena</label>
          <input
            id="registro-contrasenia"
            type="password"
            placeholder="Password1"
          />
        </div>
        <div className="field">
          <label htmlFor="registro-confirmar">Repetir contrasena</label>
          <input
            id="registro-confirmar"
            type="password"
            placeholder="Password1"
          />
        </div>
        <p className="form-message form-message-wide">
          El boton de registro permanecera deshabilitado si algun dato no es
          valido.
        </p>
        <a
          className="button button-primary form-message-wide"
          href="#dashboard"
        >
          Registrarme
        </a>
      </form>
    </>
  );
};

export default FormularioRegistro;
