import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
})

export const setApiKey = (key: string) => {
    api.defaults.headers.common["x-api-key"] = key
}