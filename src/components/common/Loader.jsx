import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <ThreeDots color="black" height={80} width={80} />
    </div>
  );
};
export default Loader;
