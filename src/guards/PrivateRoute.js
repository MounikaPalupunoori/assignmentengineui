import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { AUTH_SECURE_USER_DETAILS_LS_LEY } from "../components/edvenswa.ae.auth/constants/constants";

PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired
}

export default function PrivateRoute({children}) {
    const user = JSON.parse(sessionStorage.getItem(AUTH_SECURE_USER_DETAILS_LS_LEY));
    if (user && user.token) {
        return children;
    }
    return <Navigate to="/" replace></Navigate>
}