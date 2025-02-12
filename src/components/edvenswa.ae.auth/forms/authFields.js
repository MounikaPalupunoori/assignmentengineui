import { Email, Key, Output } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { AUTH_CONFRIM_PASSWORD_FIELD_ID, AUTH_OTP_FIELD_ID, AUTH_PASSWORD_FIELD_ID, AUTH_USERNAME_FIELD_ID } from "../constants/constants";

export const authFields = {
    [AUTH_USERNAME_FIELD_ID]: {
        id: AUTH_USERNAME_FIELD_ID,
        name: AUTH_USERNAME_FIELD_ID,
        type: "text",
        label: "auth.EMAIL_FIELD_TEXT",
        placeholder: "auth.EMAIL_FIELD_PLACEHOLDER_TEXT",
        variant: "outlined",
        autoFocus: true,
        required: true,
        inputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Email fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [AUTH_OTP_FIELD_ID]: {
        id: AUTH_OTP_FIELD_ID,
        name: AUTH_OTP_FIELD_ID,
        type: "number",
        label: 'auth.OTP_FIELD_TEXT',
        placeholder: "auth.OTP_FIELD_PLACEHOLDER_TEXT",
        variant: "outlined",
        required: true,
        inputProps:
        {   
            startAdornment: (
                <InputAdornment position="start">
                    <Output fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [AUTH_PASSWORD_FIELD_ID]: {
        id: AUTH_PASSWORD_FIELD_ID,
        name: AUTH_PASSWORD_FIELD_ID,
        type: "password",
        label: 'auth.PASSWORD_FIELD_TEXT',
        placeholder: 'auth.PASSWORD_FIELD_PLACEHOLDER_TEXT',
        variant: "outlined",
        required: true,
        inputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Key fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [AUTH_CONFRIM_PASSWORD_FIELD_ID]: {
        id: AUTH_CONFRIM_PASSWORD_FIELD_ID,
        name: AUTH_CONFRIM_PASSWORD_FIELD_ID,
        type: "password",
        label: 'auth.CONFIRM_PASSWORD_FIELD_TEXT',
        placeholder: "auth.CONFIRM_PASSWORD_FIELD_PLACEHOLDER_TEXT",
        variant: "outlined",
        required: true,
        inputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Key fontSize="small" />
                </InputAdornment>
            )
        }
    }
}    