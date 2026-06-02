import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setCredentials } from "../features/auth/auth.slice";
import { jwtDecode } from "jwt-decode";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Rehidratar desde localStorage para mantener la sesión activa al recargar la página
const token = localStorage.getItem("token");
if (token) {
    try {
        const user = jwtDecode(token);
        store.dispatch(setCredentials({ token, user }));
    } catch {
        localStorage.removeItem("token");
    }
}

export default store;