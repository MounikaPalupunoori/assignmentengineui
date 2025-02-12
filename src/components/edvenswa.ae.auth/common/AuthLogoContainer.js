import { Grid, Typography } from '@mui/material';
import AuthLogo from "../../../assets/ae_logo.png";
import PropTypes from 'prop-types';
import React from 'react';

AuthLogoContainer.propTypes = {
    title: PropTypes.string.isRequired
}

export default function AuthLogoContainer(props) {
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <img src={AuthLogo} alt={"Logo"} width={50} height={50}></img>
            </Grid>
            <Grid item xs={12}>
                <Typography component="h5" variant="h5" style={styles.ae_auth_logo_container_title}>
                    {props.title}
                </Typography>
            </Grid>
        </React.Fragment>
    )
};

const styles = {
    ae_auth_logo_container_title: {
        fontWeight: 400
    }
}