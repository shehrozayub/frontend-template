import React from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/app/appThunks";

export default function ForgotPassword() {
    const dispatch = useDispatch();


    const handlePasswordReset = (e) => {
        e.preventDefault();

        dispatch(
            forgotPassword({
                email: e.target.email.value,
            })

        );
    };

    return (
        <div className="box-row login_page">
            <div className="box-column login_form">
                <h2>Enter your email to reset password</h2>
                <form method="POST" onSubmit={handlePasswordReset} className="box-column">
                    <input type="text" name="email" placeholder="email" />
                    <button type="submit">Submit </button>
                </form>
            </div>
        </div>
    );
}
