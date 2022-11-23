import axios from "axios";
import { API_URL } from "./data";

export const loginUser = async (data) => {
    let res;
    axios.post(`${API_URL}/login`, data)
        .then((response) => {
            res = response.data
        })
        .catch((error) => {
            res = error.response.data;
        })
    return res;
}

export const getToken = () => {
    return window.localStorage.getItem('token');
}

export const setToken = (token) => {
    window.localStorage.setItem('token', token);
}

export const clearToken = () => {
    window.localStorage.removeItem('token');
}