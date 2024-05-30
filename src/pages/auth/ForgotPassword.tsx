import React from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/auth/authThunks";
import { AppDispatch } from "../../redux/store";
import { TextUIConstants } from "../../services/constants/constantsService";

export default function ForgotPassword() {
  const dispatch:AppDispatch = useDispatch();

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
        <h2>{TextUIConstants.Prompts.EnterEmail}</h2>
        <form
          method="POST"
          onSubmit={handlePasswordReset}
          className="box-column"
        >
          <input type="text" name="email" placeholder="email" />
          <button type="submit">{TextUIConstants.ButtonTexts.ForgotPassword}</button>
        </form>
      </div>
    </div>
  );
}
