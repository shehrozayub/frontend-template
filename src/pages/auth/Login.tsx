import React from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "../../redux/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { TextUIConstants } from "../../services/constants/constantsService";

export default function Login() {
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate(`/forgot-password`);
  };
  const handleSignUp = (e) => {
    e.preventDefault();

    dispatch(
      signinUser({
        username: e.target.username.value,
        password: e.target.password.value,
      })
    );
  };

  return (
    <div className="box-row login_page">
      <div className="box-column login_form">
        <h2>{TextUIConstants.PageTitles.Login}</h2>
        <form method="POST" onSubmit={handleSignUp} className="box-column">
          <input type="text" name="username" placeholder="username or email" />
          <input type="password" name="password" placeholder="password" />
          <button type="submit">{TextUIConstants.ButtonTexts.Submit}</button>
          <button onClick={handleForgotPassword}>{TextUIConstants.Prompts.ForgotPassword}</button>
        </form>
      </div>
    </div>
  );
}
