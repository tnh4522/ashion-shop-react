import axios from "axios";

// const API_URL = "https://included-sheepdog-slowly.ngrok-free.app/api/";
const API_URL = "http://localhost:8000/api/";

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'ngrok-skip-browser-warning': 'true',
    },
});

export default API;