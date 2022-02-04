import React from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/app/appThunks";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const dispatch = useDispatch();
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');

    const handleConfirmPassword = (e) => {
        e.preventDefault();

        if (e.target.password.value !== e.target.confirm_password.value) {
            toast.error("Passwords do no match");
            return;
        }

        dispatch(
            resetPassword({
                password: e.target.password.value,
                token
            })

        );
    };

    return (
        <div className="box-row login_page">

            <div className="box-column login_form">
                <h2>Enter your new password</h2>
                <form method="POST" onSubmit={handleConfirmPassword} className="box-column">
                    <input type="password" name="password" placeholder="pass" />
                    <input type="password" name="confirm_password" placeholder="pass" />
                    <button type="submit">Submit </button>
                </form>
            </div>
        </div>
    );
}
