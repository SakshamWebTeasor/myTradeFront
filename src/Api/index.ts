import axios from "axios";
import { AuthSimpleGetFecth, loginUserApi, registerUserApi } from "../Interface";

export const api = (token: string|undefined) => axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    }
})

export const login = (data: loginUserApi) => api(undefined).post("/api/login", data)
export const register = (data: registerUserApi) => api(undefined).post("/api/register", data)
export const getAdminUsers = (data: AuthSimpleGetFecth) => api(data.token).get("/api/admin/getUsers")