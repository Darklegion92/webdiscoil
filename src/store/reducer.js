import { ActionsTypes } from "./";

export default (state, action) => {
  switch (action.type) {
    case ActionsTypes.cambiarState:
      return action.value;
    case ActionsTypes.actualizarUsuario:
      state.actualizarUsuario(action.value);
      break;
    case ActionsTypes.crearUsuario:
      state.crearUsuario(action.value);
      break;
    case ActionsTypes.crearRuta:
      state.consultarCliente(action.value.documento).then((res) => {
        if (res)
          if (res.data) {
            state.guardarRuta(res.data);
          }
      });
      break;
    case ActionsTypes.cargarMapa:
      state.consultarRuta(action.value);
      break;
    default:
      break;
  }
};
