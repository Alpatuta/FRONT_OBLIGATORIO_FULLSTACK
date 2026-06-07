import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setCredentials } from "../features/auth/auth.slice";
import { jwtDecode } from "jwt-decode";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Rehidratar desde sessionStorage para mantener la sesión activa al recargar la página. Si cierro la pestaña o el navegador, la sesión se perderá, pero si solo recargo, se mantendrá activa. Esto es útil para mejorar la experiencia del usuario sin comprometer la seguridad a largo plazo.
const token = sessionStorage.getItem("token");
if (token) {
    try {
        const user = jwtDecode(token);
        store.dispatch(setCredentials({ token, user }));
    } catch {
        sessionStorage.removeItem("token");
    }
}

export default store;