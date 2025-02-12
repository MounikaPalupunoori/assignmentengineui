import { Alert, Grid, LinearProgress, Snackbar } from "@mui/material";
import Header from "../edvenswa.ae.header/Header";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { AUTH_SECURE_USER_DETAILS_LS_LEY } from "../edvenswa.ae.auth/constants/constants";

Layout.propTypes = {
    Component: PropTypes.elementType.isRequired
}

export default function Layout(props) {

    const user = JSON.parse(sessionStorage.getItem(AUTH_SECURE_USER_DETAILS_LS_LEY));
    const { Component } = props;

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState("error");
    const [loading, setLoading] = useState(false);
    const [disableLoader, setDisableLoader] = useState(false);

    const handleError = (error, severity = "error") => {
        setSnackbarOpen(!snackbarOpen);
        setSeverity(severity);
        if (error?.response && error.response?.data) {
            // application specific error                    
            setMessage(error?.response?.data);
        } else {
            // generic axios error
            setMessage(error.message);
        }
    };

    const handleSuccess = (message, severity = "success") => {
        setSnackbarOpen(!snackbarOpen);
        setSeverity(severity);
        setMessage(message);
    };

    const handleLoading = (state, disableLoader) => {
        setLoading(state);
        setDisableLoader(disableLoader);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header user={user} onError={handleError} onSuccess={handleSuccess}></Header>
                {
                    loading
                        ? !disableLoader && <LinearProgress sx={{ backgroundColor: "rgb(135 191 213)" }}></LinearProgress>
                        : <></>
                }
            </Grid>
            <Grid item xs>
                <Component user={user} onError={handleError} onSuccess={handleSuccess}
                    onLoading={handleLoading} loading={loading} />
            </Grid>
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(!snackbarOpen)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={4000}
            >
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
        </Grid>
    )
};