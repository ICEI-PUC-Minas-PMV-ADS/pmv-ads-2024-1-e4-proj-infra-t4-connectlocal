import axios from "axios";

export const api = axios.create({
    baseURL: "https://connectlocalapi20240407102935.azurewebsites.net/api"
})