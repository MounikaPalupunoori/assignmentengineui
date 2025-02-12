import { ROLES, ROLE_BASED_RESOURCES } from "../constants/constants";
import { FACADES } from "../tiles/Facades";

export const getResources = (USER_ROLES) => {
    let RESULT = [];
    if (Array.isArray(USER_ROLES)) {
        USER_ROLES.forEach((ROLE_NAME) => {
            // Check if it is a valid role
            const IS_VALID_ROLE = ROLES.find(ROLE => (ROLE === ROLE_NAME));
            if (IS_VALID_ROLE) {
                // get the resources by role name
                const RESOURCES = ROLE_BASED_RESOURCES[ROLE_NAME];
                FACADES.forEach((FACADE) => {
                    if (RESOURCES.find((RESOURCE) => (RESOURCE === (FACADE.id)))) {
                        // avoid duplicates in the result set
                        const IS_FACADE_EXISTS = RESULT.find(RES => (RES.id === FACADE.id));
                        if (!IS_FACADE_EXISTS) {
                            RESULT.push(FACADE);
                        }
                    }
                });
            } else {
                throw new Error(ROLE_NAME + " DOES NOT EXISTS.");
            }
        });
    } else {
        throw new Error(USER_ROLES + " IS NOT AN ARRAY");
    }
    return RESULT;
};