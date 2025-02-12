import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function doSearch(data, handleSuccess, handleFailure) {
    axiosInstance.post("/tenant/search", data)
        .then(res => {
            handleSuccess(res.data);
        })
        .catch(err => {
            handleFailure(err);
        })
}