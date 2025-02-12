import Signup from "../signup/Signup";

export default function ResetPassword(props) {
    return (<Signup 
        type="RESET"
        container_title="auth.reset.FORGOT_TEXT"
        otp_button_label="auth.reset.FORGOT_BUTTON_SEND_OTP_TEXT"
        reset_button_label="auth.reset.FORGOT_BUTTON_FINISH_RESET_PASSWORD_TEXT" />)
}
