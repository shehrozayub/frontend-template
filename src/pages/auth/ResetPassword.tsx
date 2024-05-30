import React from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/auth/authThunks";
import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";
import { TextUIConstants } from "../../services/constants/constantsService";

export default function ResetPassword() {
  const dispatch:AppDispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  let token = urlParams.get("token");

  const handleConfirmPassword = (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirm_password.value) {
      toast.error(TextUIConstants.ErrorMessages.PasswordInvalid);
      return;
    }

    if(!token){
      toast.error(TextUIConstants.ErrorMessages.TokenInvalid);
      return;
    }

    dispatch(
      resetPassword({
        newPassword: e.target.password.value,
        token,
      })
    );
  };

  return (
    <div className="box-row login_page">
      <div className="box-column login_form">
        <h2>{TextUIConstants.Prompts.NewPassword}</h2>
        <form
          method="POST"
          onSubmit={handleConfirmPassword}
          className="box-column"
        >
          <input type="password" name="password" placeholder={TextUIConstants.InputPlaceholders.Password} />
          <input type="password" name="confirm_password" placeholder={TextUIConstants.InputPlaceholders.Password} />
          <button type="submit">{TextUIConstants.ButtonTexts.Submit}</button>
        </form>
      </div>
    </div>
  );
}
