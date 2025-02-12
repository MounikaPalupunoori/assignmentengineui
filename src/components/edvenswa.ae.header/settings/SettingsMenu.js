import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../edvenswa.ae.auth/actions/actions";

const LOGOUT_ACTION = "LOGOUT";
const SETTTINGS_MENU_ITEMS = [
    {
        label: "Logout",
        action: LOGOUT_ACTION
    },
    {
        label: "Profile",
        navigateTo: "/profile"
    }
];

export default function SettingsMenu(props) {

    const { user } = props;

    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutClick = () => {
        doLogout();
        navigate("/");
    }

    const handleNavigation = (action, navigateTo) => {
        if (action === LOGOUT_ACTION) {
            handleLogoutClick();
            return;
        }
        navigate(navigateTo);
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <Avatar alt={user ? (user?.username) : ""} src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {SETTTINGS_MENU_ITEMS.map((SETTING_MENU_ITEM, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center"
                            onClick={() => handleNavigation(SETTING_MENU_ITEM.action, SETTING_MENU_ITEM.navigateTo)}
                        >
                            {SETTING_MENU_ITEM.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}