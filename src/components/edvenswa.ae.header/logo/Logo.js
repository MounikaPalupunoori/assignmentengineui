import { Assessment } from "@mui/icons-material"
import { Typography } from "@mui/material"
import PropTypes from "prop-types"
import React from "react"
import { useNavigate } from "react-router-dom"

Logo.propTypes = {
    xs: PropTypes.string.isRequired,
    md: PropTypes.string.isRequired
}

const styles = {
    ae_logo_typography: {
        marginRight: 2,
        fontFamily: 'monospace',
        fontWeight: 600,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none'
    }
}

export default function Logo(props) {

    const navigate = useNavigate();

    const { xs, md } = props;
    const flexGrow = (xs === 'flex' ? 1 : 0);

    const handleLogoClick = (event) => {
        navigate("/home");
    }

    return (
        <React.Fragment>
            <Assessment sx={{ display: { xs: xs, md: md }, mr: 1, cursor: "pointer" }}
                onClick={handleLogoClick} />
            <Typography
                variant="h6"
                noWrap
                style={styles.ae_logo_typography}
                sx={{ display: { xs: xs, md: md }, flexGrow: flexGrow, cursor: "pointer" }}
                onClick={handleLogoClick}
            >
                AE
            </Typography>
        </React.Fragment>
    )
};