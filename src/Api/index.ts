import axios from "axios";
import { loginUserApi } from "../Interface";

export const api = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})

export const login = (data: loginUserApi) => api.post("/api/login", data)