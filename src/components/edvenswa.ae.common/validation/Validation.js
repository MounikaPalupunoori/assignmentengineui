import { AUTH_EMAIL_REGUALR_EXPRESSION, AUTH_PASSWORD_REGULAR_EXPRESSION } from "../../edvenswa.ae.auth/constants/constants";

export function isValidEmail(email) {
    if (new RegExp(AUTH_EMAIL_REGUALR_EXPRESSION).test(email)) {
        return true;
    }
    return false;
};

export function isValidPassword(password) {
    if (new RegExp(AUTH_PASSWORD_REGULAR_EXPRESSION).test(password)) {
        return true;
    }
    return false;
};

export function isValidOTP(otp) {
    // add validation - OTP should be 6 digits
    if (otp.length !== 6) {
        return false;
    }
    return true;
};

export function comparePasswords(password, confirmPassword) {
    // add validation - Entered password and confirm password should be same.
    if (password !== confirmPassword) {
        return true;
    }
    return false;
}
export function isValidTitle(title) {
    if (title.length < 4) { 
        return false; 
    }
    return true;
}
export function isValidDuration(duration) {
    if (duration <= 10) { return false; }
    return true;
}
export function isValidDate(value) {
    let date = new Date(value);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
}