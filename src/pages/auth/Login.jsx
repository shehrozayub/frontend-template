import React from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "../../redux/app/appThunks";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
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
        <h2>Login</h2>
        <form method="POST" onSubmit={handleSignUp} className="box-column">
          <input type="text" name="username" placeholder="username or email" />
          <input type="password" name="password" placeholder="password" />
          <button type="submit">Sign In </button>
          <button onClick={handleForgotPassword}>Forgot Password?</button>
        </form>
      </div>
    </div>
  );
}
