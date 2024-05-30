import React from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/auth/authSlice";
import { AiOutlineLogout } from "react-icons/ai";
import { AppDispatch } from "../../redux/store";

export default function NavbarComponent() {
  const dispatch:AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <div className="nav_main">
      <div className="nav_content">
        <button onClick={handleLogout}>
          {" "}
          <AiOutlineLogout />{" "}
        </button>
      </div>
    </div>
  );
}
