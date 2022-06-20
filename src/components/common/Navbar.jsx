import React from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/app/appSlice";
import { AiOutlineLogout } from "react-icons/ai";

export default function Navbar() {
  const dispatch = useDispatch();

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
