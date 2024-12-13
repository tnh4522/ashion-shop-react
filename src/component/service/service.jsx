import axios from "axios";

const API_URL = "https://sterling-notably-monster.ngrok-free.app/api/";

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'ngrok-skip-browser-warning': 'true',
    },
});

export default API;