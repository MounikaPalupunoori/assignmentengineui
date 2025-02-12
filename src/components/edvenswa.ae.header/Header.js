import { AppBar, Container, Toolbar } from "@mui/material";
import Logo from "./logo/Logo";
import SettingsMenu from "./settings/SettingsMenu";
import PropTypes from 'prop-types';

Header.propTypes = {
    user: PropTypes.object.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
};

export default function Header(props) {

    return (
        <AppBar position="static" sx={{backgroundColor: "#1f2125"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo xs={'flex'} md={'flex'} />                                                                                                  
                    <SettingsMenu {...props} />
                </Toolbar>
            </Container>
        </AppBar>
    )
};