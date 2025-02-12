import { TENANT_NAME_FIELD_ID, TENANT_IMAGE_URL_FIELD_ID, GROUP_NAME_FIELD_ID, GROUP_IMAGE_URL_FIELD_ID } from "../constants/Constants";

export const consoleFileds = {
    [TENANT_NAME_FIELD_ID]: {
        id: TENANT_NAME_FIELD_ID,
        name: TENANT_NAME_FIELD_ID,
        type: "text",
        label: "Tenant Name",
        placeholder: "Enter tenant name",
        variant: "outlined",
        autoFocus: true,
        required: true,
        InputLabelProps: { shrink: true }
    },
    [TENANT_IMAGE_URL_FIELD_ID]: {
        id: TENANT_IMAGE_URL_FIELD_ID,
        name: TENANT_IMAGE_URL_FIELD_ID,
        type: "text",
        label: 'Tenant Image',
        placeholder: "Enter image location",
        variant: "outlined",
        InputLabelProps: { shrink: true }
    },
    [GROUP_NAME_FIELD_ID]: {
        id: GROUP_NAME_FIELD_ID,
        name: GROUP_NAME_FIELD_ID,
        type: "text",
        label: "Group Name",
        placeholder: "Enter group name",
        variant: "outlined",
        autoFocus: true,
        required: true,
        InputLabelProps: { shrink: true }
    },
    [GROUP_IMAGE_URL_FIELD_ID]: {
        id: GROUP_IMAGE_URL_FIELD_ID,
        name: GROUP_IMAGE_URL_FIELD_ID,
        type: "text",
        label: 'Group Image',
        placeholder: "Enter image location",
        variant: "outlined",
        InputLabelProps: { shrink: true }
    }
}    