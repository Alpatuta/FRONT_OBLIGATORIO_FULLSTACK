import axios from "axios";

const api = axios.create({
    baseURL: "https://obligatorio-fullstack-six.vercel.app/V1"
})

export default api