import axios from "axios";
import { AUTH_SECURE_USER_DETAILS_LS_LEY } from "../components/edvenswa.ae.auth/constants/constants";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_TRU_SERVICE_BASE_URL
});

axiosInstance.interceptors.request.use(
    config => {
        const user = JSON.parse(sessionStorage.getItem(AUTH_SECURE_USER_DETAILS_LS_LEY));
        const token = user && user?.token;
        // place where the custom headers can be added before request reaches to server
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        config.headers["Accept"] = 'application/json';
        config.headers["Content-Type"] = 'application/json';
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error && error.response && error.response.config &&
            error.response.config.url.indexOf("/auth") !== -1) {
            return Promise.reject(error);
        }
        if ((error && error.response && error.response.status === 401) ||
            (error && error.response && error.response.data === 'Unauthorized')) {
            sessionStorage.removeItem(AUTH_SECURE_USER_DETAILS_LS_LEY);
            window.location.reload();
        }
        return Promise.reject(error);
    }
);