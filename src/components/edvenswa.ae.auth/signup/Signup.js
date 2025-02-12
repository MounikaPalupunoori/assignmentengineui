import { Container, Card, CardContent, TextField, Grid, Button, Snackbar, Alert, Switch, FormGroup, FormControlLabel } from "@mui/material";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { doGenerateOTP, doResetPassword, doSignup } from "../actions/actions";
import React, { useState } from "react";
import { getFormFields } from "../forms/getFields";
import { useTranslation } from "react-i18next";
import {
    AUTH_CONFRIM_PASSWORD_FIELD_ID, AUTH_OTP_FIELD_ID, AUTH_PASSWORD_FIELD_ID, AUTH_PROCEED_SIGNUP,
    AUTH_SEND_OTP, AUTH_USERNAME_FIELD_ID
} from "../constants/constants";
import AuthLogoContainer from "../common/AuthLogoContainer";
import { comparePasswords, isValidEmail, isValidOTP, isValidPassword } from "../../edvenswa.ae.common/validation/Validation";
import PropTypes from "prop-types";
import "../styles/Auth.css";

Signup.propTypes = {
    type: PropTypes.string,
    container_title: PropTypes.string,
    otp_button_label: PropTypes.string,
    reset_button_label: PropTypes.string
};

export default function Signup(props) {

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [buttonType, setButtonType] = useState(AUTH_SEND_OTP);
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [enableOTPField, setEnableOTPField] = useState(false);
    const fields = [AUTH_USERNAME_FIELD_ID, AUTH_OTP_FIELD_ID, AUTH_PASSWORD_FIELD_ID, AUTH_CONFRIM_PASSWORD_FIELD_ID];
    const formFields = getFormFields(fields);

    const handleOnChange = (event, field_name) => {
        const value = event.target.value;
        switch (field_name) {
            case AUTH_USERNAME_FIELD_ID: {
                if (!isValidEmail(value)) {
                    setErrors({ [field_name]: { message: 'auth.INVALID_EMAIL_TEXT' } });
                } else {
                    setErrors(delete [field_name]);
                    setEmail(value);
                }
                break;
            }
            case AUTH_PASSWORD_FIELD_ID: {
                if (!isValidPassword(value)) {
                    setErrors({ [field_name]: { message: 'auth.INVALID_PASSWORD_TEXT' } });
                } else {
                    setErrors(delete [field_name]);
                    setPassword(value);
                }
                break;
            }
            case AUTH_OTP_FIELD_ID: {
                if (!isValidOTP(value)) {
                    setErrors({ [field_name]: { message: 'auth.INVALID_OTP_TEXT' } });
                } else {
                    setErrors(delete [field_name]);
                }
                break;
            }
            case AUTH_CONFRIM_PASSWORD_FIELD_ID: {
                if (comparePasswords(password, value)) {
                    setErrors({ [field_name]: { message: 'auth.INVALID_CONFIRM_PASSWORD_TEXT' } });
                } else {
                    setErrors(delete [field_name]);
                }
                break;
            }
            default: {
                throw new Error("Invalid field name " + field_name);
            }
        }
    };


    const handleSendOTP = (event) => {
        event.preventDefault();
        if (email && isValidEmail(email)) {
            setErrors(delete [AUTH_USERNAME_FIELD_ID]);
            const data = {
                username: email,
                validate: (props.type === 'RESET') ? false : true
            };
            doGenerateOTP(data).then(res => {
                setEnableOTPField(!enableOTPField);
                setButtonType(AUTH_PROCEED_SIGNUP);
            }).catch(err => {
                if (err.response && err.response.data) {
                    // application specific error                    
                    handleFailure(err.response?.data);
                } else {
                    // generic axios error
                    handleFailure(err.message);
                }

            });

        } else {
            setErrors({ [AUTH_USERNAME_FIELD_ID]: { message: 'auth.INVALID_EMAIL_TEXT' } });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (Object.keys(errors).length === 0) {
            const formData = new FormData(event.currentTarget);
            (props.type === 'RESET') ? doResetPassword(formData, handleSuccess, handleFailure) : doSignup(formData, handleSuccess, handleFailure);
        }
    };

    const handleSuccess = () => {
        navigate("/signin");
    };

    const handleFailure = (error) => {
        setErrorMessage(error);
        setSnackbarOpen(!snackbarOpen);
    };

    return (
        <Container style={styles.ae_signup_container} component={"main"} maxWidth="xs">
            <Card style={styles.ae_signup_card}>
                <CardContent>
                    <Box component={"form"} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <AuthLogoContainer title={props && props.container_title ? t(props.container_title) : t('auth.signup.SIGNUP_TEXT')} />
                            {
                                formFields.map((field, key) => {
                                    return (
                                        !enableOTPField
                                            && (field.name === AUTH_OTP_FIELD_ID
                                                || field.name === AUTH_PASSWORD_FIELD_ID
                                                || field.name === AUTH_CONFRIM_PASSWORD_FIELD_ID)
                                            ? <React.Fragment key={key} />
                                            : <Grid item key={key} xs={12}>
                                                <TextField key={key}
                                                    type={field.type}
                                                    id={field.id}
                                                    fullWidth
                                                    label={t(field.label)}
                                                    name={field.name}
                                                    placeholder={t(field.placeholder)}
                                                    variant={field.variant}
                                                    autoFocus={field.autoFocus}
                                                    InputLabelProps={{ shrink: true }}
                                                    InputProps={field.inputProps}
                                                    required={field.required}
                                                    onChange={(event) => handleOnChange(event, field.name)}
                                                    error={errors[field.name] ? true : false}
                                                    helperText={t(errors?.[field.name]?.message)}
                                                />
                                            </Grid>
                                    )
                                })
                            }
                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    type={buttonType === AUTH_SEND_OTP ? 'button' : 'submit'}
                                    size="small"
                                    onClick={buttonType === AUTH_SEND_OTP ? handleSendOTP : () => { }}
                                >
                                    {
                                        (buttonType === AUTH_SEND_OTP)
                                            ? props && props.otp_button_label ? t(props.otp_button_label) : t('auth.signup.SIGNUP_BUTTON_SEND_OTP_TEXT')
                                            : props && props.reset_button_label ? t(props.reset_button_label) : t('auth.signup.SIGNUP_BUTTON_FINISH_SIGNUP_TEXT')
                                    }
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/signin" style={styles.ae_signup_link_styles}>
                                    {t('auth.signup.ACCOUNT_SIGNIN_TEXT')}
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel label="German" control={
                                        <Switch onChange={(event) => {
                                            if (event.target.checked) {
                                                i18n.changeLanguage('de');
                                            } else {
                                                i18n.changeLanguage('en');
                                            }
                                        }}
                                        />}
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(!snackbarOpen)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={3000}
            >
                <Alert severity="warning">{errorMessage}</Alert>
            </Snackbar>
        </Container >
    )

};

const styles = {
    ae_signup_link_styles: {
        color: "#1976d2",
        fontWeight: 400,
        fontSize: "0.875rem"
    },
    ae_signup_container: {
        marginTop: '5rem',
        textAlign: "center",
        justifyContent: 'center',
        display: 'flex'
    },
    ae_signup_card: {
        borderRadius: '0.85rem'
    }
};