import { Container, Card, CardContent, TextField, Grid, Button, Snackbar, Alert, Switch, FormGroup, FormControlLabel } from "@mui/material";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { doLogin } from "../actions/actions";
import { useState } from "react";
import { getFormFields } from "../forms/getFields";
import { useTranslation } from "react-i18next";
import { AUTH_PASSWORD_FIELD_ID, AUTH_USERNAME_FIELD_ID } from "../constants/constants";
import { isValidEmail } from "../../edvenswa.ae.common/validation/Validation";
import "../styles/Auth.css";
import AuthLogoContainer from "../common/AuthLogoContainer";

export default function Signin() {

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errors, setErrors] = useState({});

    const fields = [AUTH_USERNAME_FIELD_ID, AUTH_PASSWORD_FIELD_ID];
    const formFields = getFormFields(fields);

    const handleOnChange = (event, field_name) => {
        const value = event.target.value;
        switch (field_name) {
            case AUTH_USERNAME_FIELD_ID: {
                if (!isValidEmail(value)) {
                    setErrors({ [field_name]: { message: 'auth.INVALID_EMAIL_TEXT' } })
                } else {
                    setErrors(delete [field_name]);
                }
                break;
            }
            case AUTH_PASSWORD_FIELD_ID: {
                break;
            }
            default: {
                throw new Error("Invalid field name " + field_name);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (Object.keys(errors).length === 0) {
            const formData = new FormData(event.currentTarget);
            doLogin(formData, handleSuccess, handleFailure);
        }
    };

    const handleSuccess = () => {
        navigate("/home");
    };

    const handleFailure = (error) => {
        setErrorMessage(error);
        setSnackbarOpen(!snackbarOpen);
    };

    return (
        <Container style={styles.ae_login_container} component={"main"} maxWidth="xs">
            <Card style={styles.ae_login_card}>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <AuthLogoContainer title={t('auth.signin.SIGNIN_TEXT')} />
                            {
                                formFields.map((field, key) => {
                                    return (
                                        <Grid item key={key} xs={12}>
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
                            <Grid item xs={12} sx={{ textAlign: "end" }}>
                                <Link to="/reset" href="#" style={styles.ae_login_link_styles}>
                                    {t('auth.signin.FORGOT_PASSWORD_TEXT')}
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={Object.keys(errors).length !== 0}
                                >
                                    {t('auth.signin.LOGIN_BUTTON_TEXT')}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/signup" style={styles.ae_login_link_styles}>
                                    {t('auth.signin.ACCOUNT_SIGNUP_TEXT')}
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
        </Container>
    )
}

const styles = {
    ae_login_link_styles: {
        color: "#1976d2",
        fontWeight: 400,
        fontSize: "0.875rem"
    },
    ae_login_container: {
        marginTop: '5rem',
        textAlign: "center",
        justifyContent: 'center',
        display: 'flex'
    },
    ae_login_card: {
        borderRadius: '0.85rem'
    }
};