import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function doGetTenants(handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance
        .get("/tenant")
        .then((res) => {
            handleLoading(false);
            handleSuccess(res.data);
        })
        .catch((err) => {
            handleLoading(false);
            handleFailure(err);
        });
};

export function doCreateTenant(data, handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance
        .post("/tenant", data)
        .then((res) => {
            handleLoading(false);
            handleSuccess(res.data);
        })
        .catch((err) => {
            handleLoading(false);
            handleFailure(err);
        });
};

export function doGetGroupsCountByTenantId(tenantId, handleSuccess, handleFailure) {
    axiosInstance
        .get(`/tenant/${tenantId}/groups/count`)
        .then((res) => {
            handleSuccess(res.data);
        })
        .catch((err) => {
            handleFailure(err);
        });
};

export function doGetGroupsByTenantId(tenantId, handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance
        .get(`/tenant/${tenantId}/groups`)
        .then((res) => {
            handleSuccess(res.data);
            handleLoading(false);
        })
        .catch((err) => {
            handleFailure(err);
            handleLoading(false);
        });
};

export function doCreateGroup(data, handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance
        .post("/tenant/group", data)
        .then((res) => {
            handleLoading(false);
            handleSuccess(res.data);
        })
        .catch((err) => {
            handleLoading(false);
            handleFailure(err);
        });
};

export function doGetUsersCountByGroupId(groupId, handleSuccess, handleFailure) {
    axiosInstance
        .get(`/tenant/${groupId}/users/count`)
        .then((res) => {
            handleSuccess(res.data);
        })
        .catch((err) => {
            handleFailure(err);
        });
};

export function doGetUsersByGroupId(groupId, handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance
        .get(`/tenant/${groupId}/users`)
        .then((res) => {
            handleSuccess(res.data);
            handleLoading(false);
        })
        .catch((err) => {
            handleFailure(err);
            handleLoading(false);
        });
};

export function doGetRoles(handleSuccess, handleFailure) {
    axiosInstance
        .get(`/tenant/roles`)
        .then((res) => {
            handleSuccess(res.data, "GET_ROLES");
        })
        .catch((err) => {
            handleFailure(err);
        });
};

export function doPutUserRoles(data, handleSuccess, handleFailure) {
    axiosInstance
        .put(`/tenant/user/roles`, data)
        .then((res) => {            
            handleSuccess(res.data, "UPDATE_ROLES");
        })
        .catch((err) => {
            handleFailure(err);
        });
    }


